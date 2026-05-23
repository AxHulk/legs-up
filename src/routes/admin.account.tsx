import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Save, UserPlus } from "lucide-react";
import { Field, inputClass } from "@/components/admin/form-bits";
import { useAdminSession } from "@/hooks/use-admin-session";
import { listAdmins, createAdmin, updateMyCredentials, deleteAdmin } from "@/lib/admin-api";

export const Route = createFileRoute("/admin/account")({ component: AccountAdmin });

function AccountAdmin() {
  const qc = useQueryClient();
  const { session, loading, username, userId } = useAdminSession();

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [credUsername, setCredUsername] = useState(username ?? "");
  const [credPassword, setCredPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (username) setCredUsername(username);
  }, [username]);

  const { data: admins = [], isLoading: adminsLoading, error: adminsError } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => listAdmins(),
    enabled: !loading && Boolean(session?.access_token),
    retry: false,
  });

  const updateMine = useMutation({
    mutationFn: async () => {
      const payload: { username?: string; password?: string } = {};
      if (credUsername && credUsername !== username) payload.username = credUsername;
      if (credPassword) payload.password = credPassword;
      if (Object.keys(payload).length === 0) throw new Error("Нечего обновлять");
      await updateMyCredentials(payload);
    },
    onSuccess: () => {
      setMsg("Сохранено. Если меняли логин — войдите заново.");
      setErr(null);
      setCredPassword("");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (e) => {
      setErr(e instanceof Error ? e.message : "Ошибка");
      setMsg(null);
    },
  });

  const create = useMutation({
    mutationFn: () => createAdmin(newUsername, newPassword),
    onSuccess: () => {
      setNewUsername("");
      setNewPassword("");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteAdmin(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  return (
    <div>
      <h1 className="font-serif text-4xl mb-2">Аккаунт</h1>
      <p className="text-foreground/60 text-sm mb-10">
        Текущий админ: <b className="text-foreground">{username}</b>
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="bg-sand rounded-2xl p-6 border border-border/60">
          <h2 className="font-serif text-2xl mb-4">Мои данные</h2>
          <div className="space-y-3">
            <Field label="Логин">
              <input className={inputClass} value={credUsername} onChange={(e) => setCredUsername(e.target.value)} />
            </Field>
            <Field label="Новый пароль (оставьте пустым, чтобы не менять)">
              <input
                type="password"
                className={inputClass}
                value={credPassword}
                onChange={(e) => setCredPassword(e.target.value)}
              />
            </Field>
            {msg && <div className="text-sm text-olive">{msg}</div>}
            {err && <div className="text-sm text-destructive">{err}</div>}
            <button
              onClick={() => updateMine.mutate()}
              disabled={updateMine.isPending}
              className="btn-primary !py-2.5 !px-5 text-[13px] disabled:opacity-50"
            >
              <Save className="size-4" /> Сохранить
            </button>
          </div>
        </section>

        <section className="bg-sand rounded-2xl p-6 border border-border/60">
          <h2 className="font-serif text-2xl mb-4">Новый администратор</h2>
          <div className="space-y-3">
            <Field label="Логин">
              <input
                className={inputClass}
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Только латиница, цифры, _.-"
              />
            </Field>
            <Field label="Пароль">
              <input
                type="password"
                className={inputClass}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Field>
            {create.isError && (
              <div className="text-sm text-destructive">
                {create.error instanceof Error ? create.error.message : "Ошибка"}
              </div>
            )}
            <button
              onClick={() => create.mutate()}
              disabled={!newUsername || !newPassword || create.isPending}
              className="btn-primary !py-2.5 !px-5 text-[13px] disabled:opacity-50"
            >
              <UserPlus className="size-4" /> Создать
            </button>
          </div>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl mb-4">Все администраторы</h2>
        <div className="bg-sand rounded-2xl border border-border/60 overflow-hidden">
          {adminsLoading && <div className="px-5 py-4 text-sm text-foreground/60">Загрузка…</div>}
          {adminsError && (
            <div className="px-5 py-4 text-sm text-destructive">
              {adminsError instanceof Error ? adminsError.message : "Не удалось загрузить администраторов"}
            </div>
          )}
          {admins.map((a, i) => (
            <div
              key={a.id}
              className={`flex items-center justify-between px-5 py-4 ${
                i !== admins.length - 1 ? "border-b border-border/60" : ""
              }`}
            >
              <div>
                <div className="font-medium">
                  {a.username}
                  {a.id === userId && <span className="ml-2 text-xs text-walnut">(вы)</span>}
                </div>
                <div className="text-xs text-foreground/60">создан {new Date(a.created_at).toLocaleDateString("ru-RU")}</div>
              </div>
              <button
                disabled={a.id === userId}
                onClick={() => {
                  if (confirm(`Удалить админа «${a.username}»?`)) remove.mutate(a.id);
                }}
                className="text-xs px-3 py-2 rounded-lg border border-destructive/40 text-destructive disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Trash2 className="size-3.5 inline" /> Удалить
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
