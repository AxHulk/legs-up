// Admin management edge function.
// Operations:
//   POST  { action: "ensure_default" }                                  — public (no auth)
//   POST  { action: "list" }                                            — requires admin JWT
//   POST  { action: "create", username, password }                      — requires admin JWT
//   POST  { action: "update_me", username?, password? }                 — requires admin JWT
//   POST  { action: "delete", id }                                      — requires admin JWT
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const ADMIN_DOMAIN = "admin.local";
const usernameToEmail = (u: string) => `${u.trim().toLowerCase()}@${ADMIN_DOMAIN}`;
const emailToUsername = (e: string) => (e ?? "").replace(`@${ADMIN_DOMAIN}`, "");

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

function isValidUsername(u: unknown): u is string {
  return typeof u === "string" && /^[a-zA-Z0-9_.-]{2,40}$/.test(u);
}
function isValidPassword(p: unknown): p is string {
  return typeof p === "string" && p.length >= 4 && p.length <= 128;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: { action?: string; [k: string]: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const action = body.action;

  try {
    // --- public bootstrap ---
    if (action === "ensure_default") {
      const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1 });
      if (error) throw new Error(error.message);
      if (data.users.length > 0) return json({ created: false });
      const { error: createErr } = await admin.auth.admin.createUser({
        email: usernameToEmail("Admin"),
        password: "Password",
        email_confirm: true,
        user_metadata: { username: "Admin" },
      });
      if (createErr) throw new Error(createErr.message);
      return json({ created: true });
    }

    // --- all other actions require valid admin JWT ---
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Unauthorized" }, 401);

    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser(token);
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);

    const callerId = userData.user.id;
    const callerEmail = userData.user.email ?? "";
    if (!callerEmail.endsWith(`@${ADMIN_DOMAIN}`)) {
      return json({ error: "Forbidden" }, 403);
    }

    if (action === "list") {
      const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 100 });
      if (error) throw new Error(error.message);
      return json(
        data.users
          .filter((u) => u.email?.endsWith(`@${ADMIN_DOMAIN}`))
          .map((u) => ({
            id: u.id,
            username: emailToUsername(u.email ?? ""),
            created_at: u.created_at,
          })),
      );
    }

    if (action === "create") {
      const { username, password } = body as { username: unknown; password: unknown };
      if (!isValidUsername(username)) return json({ error: "Bad username" }, 400);
      if (!isValidPassword(password)) return json({ error: "Bad password" }, 400);
      const { error } = await admin.auth.admin.createUser({
        email: usernameToEmail(username),
        password,
        email_confirm: true,
        user_metadata: { username },
      });
      if (error) throw new Error(error.message);
      return json({ ok: true });
    }

    if (action === "update_me") {
      const { username, password } = body as { username?: unknown; password?: unknown };
      const updates: { email?: string; password?: string; user_metadata?: Record<string, unknown> } = {};
      if (username !== undefined) {
        if (!isValidUsername(username)) return json({ error: "Bad username" }, 400);
        updates.email = usernameToEmail(username);
        updates.user_metadata = { username };
      }
      if (password !== undefined) {
        if (!isValidPassword(password)) return json({ error: "Bad password" }, 400);
        updates.password = password;
      }
      if (Object.keys(updates).length === 0) return json({ ok: true });
      const { error } = await admin.auth.admin.updateUserById(callerId, updates);
      if (error) throw new Error(error.message);
      return json({ ok: true });
    }

    if (action === "delete") {
      const { id } = body as { id: unknown };
      if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) {
        return json({ error: "Bad id" }, 400);
      }
      if (id === callerId) return json({ error: "Нельзя удалить самого себя" }, 400);
      const { error } = await admin.auth.admin.deleteUser(id);
      if (error) throw new Error(error.message);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Internal error";
    console.error("[admin-auth]", msg);
    return json({ error: msg }, 500);
  }
});
