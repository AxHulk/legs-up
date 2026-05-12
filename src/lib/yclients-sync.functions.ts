import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { runYclientsScheduleSync } from "./yclients-sync.server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const syncYclientsSchedule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    try {
      return await runYclientsScheduleSync();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sync failed";
      await supabaseAdmin
        .from("app_settings")
        .upsert({ id: true, schedule_sync_error: msg, updated_at: new Date().toISOString() });
      throw new Error(msg);
    }
  });
