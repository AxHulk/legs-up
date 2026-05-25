import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_YCLIENTS_URL = "https://n2043963.yclients.com";

export function useBookingUrl(override?: string | null) {
  const { data } = useQuery({
    queryKey: ["app-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_public_yclients_url");
      if (error) throw error;
      return (data as string | null) || DEFAULT_YCLIENTS_URL;
    },
    staleTime: 5 * 60_000,
  });
  return (override && override.trim()) || data || DEFAULT_YCLIENTS_URL;
}

export function BookingDialog({ url, onClose }: { url: string; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] bg-foreground/75 backdrop-blur-sm flex items-stretch sm:items-center justify-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-4xl h-full sm:h-[90vh] bg-cream sm:rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-sand">
          <div className="text-[11px] uppercase tracking-[0.22em] text-walnut">Онлайн-запись</div>
          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-olive hover:text-olive transition-colors flex items-center gap-1.5"
              aria-label="Открыть в новой вкладке"
            >
              <ExternalLink className="size-3.5" /> В новой вкладке
            </a>
            <button
              onClick={onClose}
              className="size-9 rounded-full bg-cream hover:bg-walnut hover:text-sand flex items-center justify-center border border-border/60"
              aria-label="Закрыть"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
        <iframe
          src={url}
          title="Онлайн-запись YClients"
          className="flex-1 w-full border-0"
          allow="payment; clipboard-write"
        />
      </div>
    </div>
  );
}

export function BookingButton({
  children,
  className,
  url,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  url?: string | null;
  ariaLabel?: string;
}) {
  const target = useBookingUrl(url);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </button>
      {open && <BookingDialog url={target} onClose={() => setOpen(false)} />}
    </>
  );
}
