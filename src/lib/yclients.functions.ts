import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BookingSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(10).max(20),
  direction: z.string().trim().max(200).optional().default(""),
  time: z.string().trim().max(200).optional().default(""),
});

export const createBookingLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => BookingSchema.parse(input))
  .handler(async ({ data }) => {
    const partnerToken = process.env.YCLIENTS_PARTNER_TOKEN;
    const companyId = process.env.YCLIENTS_COMPANY_ID;

    const note = [
      data.direction && `Направление: ${data.direction}`,
      data.time && `Удобное время: ${data.time}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Save locally first — never lose the lead.
    const { error: dbError } = await supabaseAdmin.from("bookings").insert({
      customer_name: data.name,
      customer_phone: data.phone,
      note,
      source: "site",
      status: "pending",
    });

    if (dbError) {
      console.error("[booking] DB insert failed:", dbError);
    }

    // Push to YClients as an online-record-form submission (creates a "лид").
    // Endpoint: POST /api/v1/book_code/{company_id} — sends SMS code (used by online forms),
    // but for lead capture without service/staff we use the form_integration endpoint.
    let yclientsOk = false;
    let yclientsError: string | null = null;

    if (partnerToken && companyId) {
      try {
        const res = await fetch(
          `https://api.yclients.com/api/v1/company/${companyId}/leads/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${partnerToken}`,
              Accept: "application/vnd.api.v2+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              phone: data.phone,
              comment: note || "Заявка с сайта",
            }),
          }
        );

        if (res.ok) {
          yclientsOk = true;
        } else {
          yclientsError = `YClients ${res.status}: ${await res.text()}`;
          console.error("[booking] YClients lead failed:", yclientsError);
        }
      } catch (err) {
        yclientsError = err instanceof Error ? err.message : String(err);
        console.error("[booking] YClients request error:", yclientsError);
      }
    }

    return { ok: true, yclientsOk, yclientsError };
  });
