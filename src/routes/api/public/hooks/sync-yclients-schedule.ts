import { createFileRoute } from "@tanstack/react-router";
import { runYclientsScheduleSync } from "@/lib/yclients-sync.server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Cron endpoint: pg_cron calls this every N minutes via pg_net to keep
// our `schedule_classes` mirror of YClients group activities up to date.
// Authenticated by Supabase anon `apikey` header (the conventional pattern
// for /api/public/* cron hooks).

export const Route = createFileRoute("/api/public/hooks/sync-yclients-schedule")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey =
          request.headers.get("apikey") ||
          request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
        const expected = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!expected || apiKey !== expected) {
          return new Response("Unauthorized", { status: 401 });
        }

        try {
          const result = await runYclientsScheduleSync();
          return Response.json(result);
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Sync failed";
          console.error("[yclients-sync] hook failed:", msg);
          await supabaseAdmin
            .from("app_settings")
            .upsert({
              id: true,
              schedule_sync_error: msg,
              updated_at: new Date().toISOString(),
            });
          return Response.json({ ok: false, error: msg }, { status: 500 });
        }
      },
    },
  },
});
