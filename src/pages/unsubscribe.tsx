import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State =
  | { kind: "loading" }
  | { kind: "valid" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "submitting" }
  | { kind: "done" }
  | { kind: "error"; message: string };

export default function UnsubscribePage() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid" });
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json();
        if (res.ok && data.valid) setState({ kind: "valid" });
        else if (data.reason === "already_unsubscribed") setState({ kind: "already" });
        else setState({ kind: "invalid" });
      } catch {
        setState({ kind: "invalid" });
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState({ kind: "submitting" });
    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
          body: JSON.stringify({ token }),
        },
      );
      const data = await res.json();
      if (res.ok && (data.success || data.reason === "already_unsubscribed")) {
        setState({ kind: "done" });
      } else {
        setState({ kind: "error", message: data.error || "Не удалось обработать запрос" });
      }
    } catch {
      setState({ kind: "error", message: "Сетевая ошибка" });
    }
  };

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl bg-sand p-10 border border-border/60 text-center">
        <h1 className="font-serif text-3xl text-foreground">Отписка от рассылки</h1>

        {state.kind === "loading" && (
          <div className="mt-8 flex flex-col items-center gap-3 text-foreground/70 text-sm">
            <Loader2 className="size-6 animate-spin text-olive" />
            Проверяем ссылку…
          </div>
        )}

        {state.kind === "valid" && (
          <>
            <p className="mt-4 text-foreground/70 text-sm leading-relaxed">
              Подтвердите отписку — мы больше не будем присылать вам письма.
            </p>
            <button onClick={confirm} className="btn-primary w-full mt-8">
              Подтвердить отписку
            </button>
          </>
        )}

        {state.kind === "submitting" && (
          <div className="mt-8 flex flex-col items-center gap-3 text-foreground/70 text-sm">
            <Loader2 className="size-6 animate-spin text-olive" />
            Отписываем…
          </div>
        )}

        {state.kind === "done" && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <CheckCircle2 className="size-10 text-olive" />
            <p className="text-foreground/80">Готово. Вы отписаны от рассылки.</p>
          </div>
        )}

        {state.kind === "already" && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <CheckCircle2 className="size-10 text-olive" />
            <p className="text-foreground/80">Вы уже были отписаны ранее.</p>
          </div>
        )}

        {state.kind === "invalid" && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <XCircle className="size-10 text-walnut" />
            <p className="text-foreground/80">Ссылка недействительна или истекла.</p>
          </div>
        )}

        {state.kind === "error" && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <XCircle className="size-10 text-walnut" />
            <p className="text-foreground/80">{state.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
