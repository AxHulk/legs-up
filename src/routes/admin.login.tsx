import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usernameToEmail } from "@/lib/admin-auth-client";

const ensureDefaultAdmin = () =>
  supabase.functions.invoke("admin-auth", { body: { op: "ensure_default" } });

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Вход — Админ-панель" }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ensureDefaultAdmin().catch(() => {});
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await ensureDefaultAdmin().catch(() => {});
      const { error: signErr } = await supabase.auth.signInWithPassword({
        email: usernameToEmail(username),
        password,
      });
      if (signErr) throw signErr;
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-cream border border-border/60 rounded-3xl p-10 shadow-[0_30px_80px_-30px_oklch(0.45_0.08_122/0.4)]">
        <div className="text-center mb-8">
          <div className="font-serif text-3xl">
            НОГИ <span className="italic-accent">ВВЕРХ</span>
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-walnut mt-2">Админ-панель</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-walnut">Логин</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="mt-2 w-full rounded-xl border border-border bg-sand px-4 py-3 outline-none focus:border-olive"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-walnut">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-xl border border-border bg-sand px-4 py-3 outline-none focus:border-olive"
            />
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Входим…" : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
