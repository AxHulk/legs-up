import { supabaseAdmin } from "@/integrations/supabase/client.server";

/**
 * Sync group activities from YClients into our `schedule_classes` table.
 * Uses the partner token + company id stored as server-side secrets.
 *
 * Docs: https://developers.yclients.com/en/#tag/Group-events-Activities/operation/Search-activities
 *  GET /api/v1/activity/search/{company_id}
 */

type YclientsActivity = {
  id: number;
  service_id?: number;
  staff_id?: number;
  date: string; // "YYYY-MM-DD HH:mm:ss" in salon timezone
  length?: number; // seconds
  capacity?: number;
  records_count?: number;
  color?: string;
  instructions?: string;
  service?: { id: number; title?: string; category?: { title?: string } | null };
  staff?: { id: number; name?: string };
};

function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}

// "2025-05-12 09:30:00" (salon local time) → ISO with explicit Moscow offset.
// YClients dates come without a timezone; the studio is in Балашиха (MSK, UTC+3).
function toIso(salonLocal: string) {
  const s = salonLocal.replace(" ", "T");
  return `${s}+03:00`;
}

export async function runYclientsScheduleSync(daysAhead = 21) {
  const partnerToken = process.env.YCLIENTS_PARTNER_TOKEN;
  const companyId = process.env.YCLIENTS_COMPANY_ID;
  if (!partnerToken || !companyId) {
    throw new Error("YCLIENTS_PARTNER_TOKEN / YCLIENTS_COMPANY_ID are not configured");
  }

  const from = ymd(new Date(Date.now() - 24 * 3600 * 1000));
  const till = ymd(new Date(Date.now() + daysAhead * 24 * 3600 * 1000));

  // Load instructors once to map staff_id → instructor by name (best-effort).
  const { data: instructorsRows } = await supabaseAdmin
    .from("instructors")
    .select("id,name");
  const instructorByName = new Map(
    (instructorsRows ?? []).map((i) => [i.name.trim().toLowerCase(), i.id]),
  );

  let page = 1;
  const pageSize = 300;
  const all: YclientsActivity[] = [];

  // Paginate just in case the studio has a lot of classes scheduled.
  // YClients caps single-page count; loop until an empty page returns.
  // We bound by 10 pages defensively (≈3000 records, way beyond a real studio).
  for (; page <= 10; page++) {
    const url = new URL(`https://api.yclients.com/api/v1/activity/search/${companyId}`);
    url.searchParams.set("from", from);
    url.searchParams.set("till", till);
    url.searchParams.set("count", String(pageSize));
    url.searchParams.set("page", String(page));

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${partnerToken}`,
        Accept: "application/vnd.yclients.v2+json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`YClients API ${res.status}: ${text.slice(0, 300)}`);
    }

    const json = (await res.json()) as { success?: boolean; data?: YclientsActivity[] };
    const batch = Array.isArray(json.data) ? json.data : [];
    all.push(...batch);
    if (batch.length < pageSize) break;
  }

  let upserted = 0;
  for (const a of all) {
    const serviceTitle = a.service?.title?.trim() || "Занятие";
    const classType = a.service?.category?.title?.trim() || "";
    const staffName = a.staff?.name?.trim() || "";
    const matchedInstructor = staffName
      ? instructorByName.get(staffName.toLowerCase()) ?? null
      : null;

    const row = {
      yclients_activity_id: a.id,
      yclients_service_id: a.service_id ?? a.service?.id ?? null,
      yclients_staff_id: a.staff_id ?? a.staff?.id ?? null,
      title: serviceTitle,
      description: a.instructions?.trim() || "",
      class_type: classType,
      starts_at: toIso(a.date),
      duration_min: a.length ? Math.round(a.length / 60) : 60,
      seats_total: a.capacity ?? 8,
      seats_free:
        typeof a.capacity === "number" && typeof a.records_count === "number"
          ? Math.max(a.capacity - a.records_count, 0)
          : null,
      instructor_id: matchedInstructor,
      is_published: true,
      synced_at: new Date().toISOString(),
    };

    const { error } = await supabaseAdmin
      .from("schedule_classes")
      .upsert(row, { onConflict: "yclients_activity_id" });
    if (error) {
      console.error("[yclients-sync] upsert failed", a.id, error);
      continue;
    }
    upserted++;
  }

  // Remove future YClients-sourced classes that vanished from the API
  // (cancelled or rescheduled outside our window).
  const seenIds = all.map((a) => a.id);
  if (seenIds.length > 0) {
    await supabaseAdmin
      .from("schedule_classes")
      .delete()
      .not("yclients_activity_id", "is", null)
      .gte("starts_at", new Date().toISOString())
      .not("yclients_activity_id", "in", `(${seenIds.join(",")})`);
  }

  const now = new Date().toISOString();
  await supabaseAdmin
    .from("app_settings")
    .upsert({ id: true, schedule_synced_at: now, schedule_sync_error: null, updated_at: now });

  return { ok: true as const, fetched: all.length, upserted, synced_at: now };
}
