import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ADMIN_DOMAIN = "admin.local";
const usernameToEmail = (u: string) => `${u.trim().toLowerCase()}@${ADMIN_DOMAIN}`;
const emailToUsername = (e: string) => e.replace(`@${ADMIN_DOMAIN}`, "");

const usernameSchema = z
  .string()
  .min(2)
  .max(40)
  .regex(/^[a-zA-Z0-9_.-]+$/, "Только латиница, цифры, _.-");
const passwordSchema = z.string().min(4).max(128);

// Ensure default Admin/Password exists if no admin users yet (bootstrapping)
export const ensureDefaultAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
  if (error) throw new Error(error.message);
  if (data.users.length > 0) return { created: false };

  const { error: createErr } = await supabaseAdmin.auth.admin.createUser({
    email: usernameToEmail("Admin"),
    password: "Password",
    email_confirm: true,
    user_metadata: { username: "Admin" },
  });
  if (createErr) throw new Error(createErr.message);
  return { created: true };
});

export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 100 });
    if (error) throw new Error(error.message);
    return data.users
      .filter((u) => u.email?.endsWith(`@${ADMIN_DOMAIN}`))
      .map((u) => ({
        id: u.id,
        username: emailToUsername(u.email ?? ""),
        created_at: u.created_at,
      }));
  });

export const createAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { username: string; password: string }) =>
    z.object({ username: usernameSchema, password: passwordSchema }).parse(data),
  )
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: usernameToEmail(data.username),
      password: data.password,
      email_confirm: true,
      user_metadata: { username: data.username },
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateMyCredentials = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { username?: string; password?: string }) =>
    z
      .object({
        username: usernameSchema.optional(),
        password: passwordSchema.optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const updates: { email?: string; password?: string; user_metadata?: Record<string, unknown> } =
      {};
    if (data.username) {
      updates.email = usernameToEmail(data.username);
      updates.user_metadata = { username: data.username };
    }
    if (data.password) updates.password = data.password;
    if (Object.keys(updates).length === 0) return { ok: true };
    const { error } = await supabaseAdmin.auth.admin.updateUserById(context.userId, updates);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    if (data.id === context.userId) throw new Error("Нельзя удалить самого себя");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminAuthHelpers = { usernameToEmail };
