
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X as XIcon, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

function BookingsAdmin() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  const { data: bookings = [] } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, schedule_classes(title, starts_at, instructor_id, class_type)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = useMemo(
    () => (filter === "all" ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter],
  );

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "confirmed" | "cancelled" | "pending" }) => {
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["all-bookings"] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["all-bookings"] }),
  });

  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: "Все" },
    { id: "pending", label: "Ожидают" },
    { id: "confirmed", label: "Подтверждены" },
    { id: "cancelled", label: "Отменены" },
  ];

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl">Брони</h1>
          <p className="text-foreground/60 text-sm mt-1">Все брони со всех источников.</p>
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-2 rounded-full text-xs uppercase tracking-[0.18em] border ${
                filter === f.id
                  ? "bg-olive text-sand border-olive"
                  : "bg-transparent border-border text-foreground/70 hover:border-olive/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-sand rounded-2xl border border-border/60 overflow-hidden">
        {filtered.map((b, i) => {
          const klass = (b as unknown as { schedule_classes: { title: string; starts_at: string; class_type: string } | null })
            .schedule_classes;
          const dt = klass ? new Date(klass.starts_at).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" }) : "—";
          return (
            <div
              key={b.id}
              className={`grid grid-cols-12 gap-4 items-center px-5 py-4 ${
                i !== filtered.length - 1 ? "border-b border-border/60" : ""
              }`}
            >
              <div className="col-span-3">
                <div className="font-medium">{b.customer_name}</div>
                <div className="text-xs text-foreground/60">{b.customer_phone || "—"}</div>
              </div>
              <div className="col-span-3 text-sm">
                {klass?.title ?? "(удалено)"}
                <div className="text-xs text-foreground/60">{dt}</div>
              </div>
              <div className="col-span-2 text-xs uppercase tracking-[0.18em] text-walnut">{b.source}</div>
              <div className="col-span-1">
                <span
                  className={`text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full ${
                    b.status === "confirmed"
                      ? "bg-olive text-sand"
                      : b.status === "cancelled"
                        ? "bg-destructive/15 text-destructive"
                        : "bg-walnut/15 text-walnut"
                  }`}
                >
                  {b.status === "confirmed" ? "подтв." : b.status === "cancelled" ? "отменён" : "ждёт"}
                </span>
              </div>
              <div className="col-span-3 flex gap-1.5 justify-end">
                {b.status !== "confirmed" && (
                  <button
                    onClick={() => setStatus.mutate({ id: b.id, status: "confirmed" })}
                    className="size-8 rounded-full bg-olive text-sand flex items-center justify-center"
                    title="Подтвердить"
                  >
                    <Check className="size-4" />
                  </button>
                )}
                {b.status !== "cancelled" && (
                  <button
                    onClick={() => setStatus.mutate({ id: b.id, status: "cancelled" })}
                    className="size-8 rounded-full bg-walnut/15 text-walnut flex items-center justify-center"
                    title="Отменить"
                  >
                    <XIcon className="size-4" />
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm("Удалить бронь?")) remove.mutate(b.id);
                  }}
                  className="size-8 rounded-full border border-destructive/40 text-destructive flex items-center justify-center"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="px-5 py-10 text-center text-foreground/50 text-sm">Пусто</div>}
      </div>
    </div>
  );
}

export default BookingsAdmin;
