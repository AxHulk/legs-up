import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LEGAL_DOCS } from "@/lib/legal-docs";

const STORAGE_KEY = "nv-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* noop */
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  if (!visible || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-[1100px] rounded-2xl border border-border/60 bg-card/95 backdrop-blur p-5 sm:p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm leading-relaxed text-foreground/80">
            Мы используем файлы cookies для корректной работы сайта и улучшения его
            качества. Продолжая использовать сайт, вы соглашаетесь с{" "}
            <a
              href={LEGAL_DOCS.cookiesConsent}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-link"
            >
              Согласием на использование файлов cookies
            </a>{" "}
            и{" "}
            <a
              href={LEGAL_DOCS.privacyPolicy}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-link"
            >
              Политикой обработки персональных данных
            </a>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => decide("declined")}
              className="rounded-xl border border-border px-5 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-muted"
            >
              Отклонить
            </button>
            <button type="button" onClick={() => decide("accepted")} className="btn-primary px-5 py-2.5 text-sm">
              Принять полностью
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
