import { createFileRoute, Outlet, useRouterState, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogOut, Calendar, Users, Layers, Inbox, UserCog, LayoutDashboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/use-admin-session";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Админ-панель — НОГИ ВВЕРХ" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

const navItems = [
  { to: "/admin", label: "Сводка", icon: LayoutDashboard, exact: true },
  { to: "/admin/schedule", label: "Расписание", icon: Calendar },
  { to: "/admin/bookings", label: "Брони", icon: Inbox },
  { to: "/admin/instructors", label: "Инструкторы", icon: Users },
  { to: "/admin/directions", label: "Направления", icon: Layers },
  { to: "/admin/account", label: "Аккаунт", icon: UserCog },
];

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLogin = pathname === "/admin/login";
  const { session, loading, username } = useAdminSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || isLogin) return;
    if (!session) navigate({ to: "/admin/login" });
  }, [loading, session, isLogin, navigate]);

  if (isLogin) return <Outlet />;
  if (loading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream text-foreground/60 text-sm">
        Загрузка…
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <aside className="fixed inset-y-0 left-0 w-64 bg-sand border-r border-border/60 flex flex-col">
        <div className="px-6 py-6 border-b border-border/60">
          <Link to="/admin" className="font-serif text-2xl">
            НОГИ <span className="italic-accent">ВВЕРХ</span>
          </Link>
          <div className="text-[11px] uppercase tracking-[0.2em] text-walnut mt-1">Админ-панель</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((it) => {
            const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active ? "bg-olive text-sand" : "text-foreground/80 hover:bg-cream"
                }`}
              >
                <it.icon className="size-4" /> {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/60">
          <div className="text-xs text-foreground/60 mb-2">
            Вошли как <b className="text-foreground">{username}</b>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-walnut hover:text-olive"
          >
            <LogOut className="size-3.5" /> Выйти
          </button>
        </div>
      </aside>
      <main className="ml-64 p-8 lg:p-12 max-w-[1400px]">
        <Outlet />
      </main>
    </div>
  );
}
