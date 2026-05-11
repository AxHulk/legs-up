import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BookingSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(10).max(20),
  direction: z.string().trim().max(200).optional().default(""),
  time: z.string().trim().max(200).optional().default(""),
});

/**
 * Saves a booking lead from the site contact form into our DB.
 *
 * YClients has no public partner-token-only endpoint for creating leads,
 * so we store the request locally (admins see it in /admin/bookings) and
 * the UI then opens the YClients widget for the client to pick a service
 * and a time slot — that produces a real "запись" on the YClients side.
 */
export const createBookingLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => BookingSchema.parse(input))
  .handler(async ({ data }) => {
    const note = [
      data.direction && `Направление: ${data.direction}`,
      data.time && `Удобное время: ${data.time}`,
    ]
      .filter(Boolean)
      .join("\n");

    const { error: dbError } = await supabaseAdmin.from("bookings").insert({
      customer_name: data.name,
      customer_phone: data.phone,
      note,
      source: "site",
      status: "pending",
    });

    if (dbError) {
      console.error("[booking] DB insert failed:", dbError);
      throw new Error("Failed to save booking");
    }

    return { ok: true };
  });
