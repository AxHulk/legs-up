import { supabase } from "@/integrations/supabase/client";

async function invokeAdmin<T>(op: string, payload: Record<string, unknown> = {}): Promise<T> {
  const { data, error } = await supabase.functions.invoke("admin-auth", {
    body: { op, ...payload },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data as T;
}

export type AdminUser = { id: string; username: string; created_at: string };

export const listAdmins = () => invokeAdmin<AdminUser[]>("list");
export const createAdmin = (username: string, password: string) =>
  invokeAdmin<{ ok: true }>("create", { username, password });
export const updateMyCredentials = (payload: { username?: string; password?: string }) =>
  invokeAdmin<{ ok: true }>("update_me", payload);
export const deleteAdmin = (id: string) => invokeAdmin<{ ok: true }>("delete", { id });

export const syncYclientsSchedule = async () => {
  const { data, error } = await supabase.functions.invoke("sync-yclients-schedule", { body: {} });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data as { fetched: number; upserted: number };
};
