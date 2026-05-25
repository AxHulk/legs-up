// Syncs group activities from YClients into `schedule_classes`.
// Called both by:
//   - pg_cron via net.http_post (apikey header = SUPABASE_ANON_KEY)
//   - admin panel via supabase.functions.invoke (Authorization: Bearer <admin JWT>)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

type YclientsActivity = {
  id: number;
  service_id?: number;
  staff_id?: number;
  date: string;
  length?: number;
  capacity?: number;
  records_count?: number;
  instructions?: string;
  service?: { id: number; title?: string; category?: { title?: string } | null };
  staff?: { id: number; name?: string };
};

const ymd = (d: Date) => d.toISOString().slice(0, 10);
const toIso = (salonLocal: string) => `${salonLocal.replace(" ", "T")}+03:00`;

async function runSync(admin: ReturnType<typeof createClient>, daysAhead = 21) {
  const partnerToken = Deno.env.get("YCLIENTS_PARTNER_TOKEN");
  const companyId = Deno.env.get("YCLIENTS_COMPANY_ID");
  if (!partnerToken || !companyId) {
    throw new Error("YCLIENTS_PARTNER_TOKEN / YCLIENTS_COMPANY_ID are not configured");
  }

  const from = ymd(new Date(Date.now() - 24 * 3600 * 1000));
  const till = ymd(new Date(Date.now() + daysAhead * 24 * 3600 * 1000));

  const { data: instructorsRows } = await admin.from("instructors").select("id,name");
  const instructorByName = new Map(
    (instructorsRows ?? []).map((i: { id: string; name: string }) => [i.name.trim().toLowerCase(), i.id]),
  );

  const all: YclientsActivity[] = [];
  const pageSize = 300;
  for (let page = 1; page <= 10; page++) {
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
    const j = (await res.json()) as { data?: YclientsActivity[] };
    const batch = Array.isArray(j.data) ? j.data : [];
    all.push(...batch);
    if (batch.length < pageSize) break;
  }

  let upserted = 0;
  for (const a of all) {
    const serviceTitle = a.service?.title?.trim() || "Занятие";
    const classType = a.service?.category?.title?.trim() || "";
    const staffName = a.staff?.name?.trim() || "";
    const matchedInstructor = staffName ? instructorByName.get(staffName.toLowerCase()) ?? null : null;

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
    const { error } = await admin
      .from("schedule_classes")
      .upsert(row, { onConflict: "yclients_activity_id" });
    if (error) {
      console.error("[yclients-sync] upsert failed", a.id, error);
      continue;
    }
    upserted++;
  }

  const seenIds = all.map((a) => a.id);
  if (seenIds.length > 0) {
    await admin
      .from("schedule_classes")
      .delete()
      .not("yclients_activity_id", "is", null)
      .gte("starts_at", new Date().toISOString())
      .not("yclients_activity_id", "in", `(${seenIds.join(",")})`);
  }

  const now = new Date().toISOString();
  await admin
    .from("app_settings")
    .upsert({ id: true, schedule_synced_at: now, schedule_sync_error: null, updated_at: now });

  return { ok: true, fetched: all.length, upserted, synced_at: now };
}

const ADMIN_DOMAIN = "admin.local";
// Shared sentinel passed by pg_cron via x-cron-secret. Not a high-value secret —
// only used to distinguish the internal cron caller from arbitrary public requests.
const CRON_SECRET = "lovable-internal-cron-yclients-sync-v1";

async function isAuthorized(req: Request, supabaseUrl: string): Promise<boolean> {
  // 1. Internal cron path
  if (req.headers.get("x-cron-secret") === CRON_SECRET) return true;

  // 2. Admin JWT path
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return false;

  const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
  const userClient = createClient(supabaseUrl, ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await userClient.auth.getUser(token);
  if (error || !data.user) return false;
  return (data.user.email ?? "").endsWith(`@${ADMIN_DOMAIN}`);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  if (!(await isAuthorized(req, SUPABASE_URL))) {
    return json({ error: "Unauthorized" }, 401);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const result = await runSync(admin);
    return json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Sync failed";
    console.error("[sync-yclients-schedule]", msg);
    await admin
      .from("app_settings")
      .upsert({ id: true, schedule_sync_error: msg, updated_at: new Date().toISOString() });
    return json({ ok: false, error: msg }, 500);
  }
});

