import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Klass = {
  id: string;
  starts_at: string;
  class_type: string;
  title: string;
  description: string;
  seats_total: number;
  booking_url: string;
  instructor_id: string | null;
};

export function Schedule() {
  const [active, setActive] = useState("Все");
  const [booking, setBooking] = useState<Klass | null>(null);

  const { data: classes = [] } = useQuery({
    queryKey: ["public-schedule"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schedule_classes")
        .select("id,starts_at,class_type,title,description,seats_total,booking_url,instructor_id, instructors(name)")
        .eq("is_published", true)
        .gte("starts_at", new Date(Date.now() - 86400000).toISOString())
        .order("starts_at", { ascending: true })
        .limit(60);
      if (error) throw error;
      return data ?? [];
    },
  });

  const filters = useMemo(() => {
    const types = new Set<string>();
    classes.forEach((c) => c.class_type && types.add(c.class_type));
    return ["Все", ...Array.from(types)];
  }, [classes]);

  const list = useMemo(
    () => (active === "Все" ? classes : classes.filter((c) => c.class_type === active)),
    [classes, active],
  );

  if (classes.length === 0) return null;

  return (
    <section id="schedule" className="py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">Расписание</span>
            <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
              Занятия <span className="italic-accent">каждый день</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] border transition-colors ${
                  active === f
                    ? "bg-olive text-sand border-olive"
                    : "bg-transparent border-border text-foreground/70 hover:border-olive/50 hover:text-olive"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-cream border border-border/60 overflow-hidden">
          {list.map((s, i) => {
            const d = new Date(s.starts_at);
            const day = d.toLocaleDateString("ru-RU", { weekday: "short" }).toUpperCase().slice(0, 2);
            const date = String(d.getDate());
            const time = d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
            const coach = (s as unknown as { instructors: { name: string } | null }).instructors?.name ?? "";
            return (
              <div
                key={s.id}
                className={`grid grid-cols-12 gap-4 items-center px-5 lg:px-8 py-5 ${
                  i !== list.length - 1 ? "border-b border-border/60" : ""
                } hover:bg-sand/60 transition-colors`}
              >
                <div className="col-span-3 lg:col-span-2 flex items-baseline gap-3">
                  <span className="font-serif text-3xl text-olive">{date}</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-walnut">{day}</span>
                </div>
                <div className="col-span-3 lg:col-span-2 font-serif text-xl">{time}</div>
                <div className="col-span-12 lg:col-span-4 order-last lg:order-none mt-2 lg:mt-0">
                  <div className="font-medium">{s.title}</div>
                  <div className="text-xs text-foreground/60 mt-0.5">{coach}</div>
                </div>
                <div className="col-span-4 lg:col-span-2 hidden lg:block">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-walnut">{s.class_type}</span>
                </div>
                <div className="col-span-6 lg:col-span-2 flex justify-end">
                  {s.booking_url ? (
                    <a href={s.booking_url} target="_blank" rel="noreferrer" className="text-xs px-4 py-2 rounded-full bg-olive/10 text-olive hover:bg-olive hover:text-sand transition-colors">
                      Записаться
                    </a>
                  ) : (
                    <button
                      onClick={() => setBooking(s as Klass)}
                      className="text-xs px-4 py-2 rounded-full bg-olive/10 text-olive hover:bg-olive hover:text-sand transition-colors"
                    >
                      Записаться
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {booking && <BookingDialog klass={booking} onClose={() => setBooking(null)} />}
    </section>
  );
}

function BookingDialog({ klass, onClose }: { klass: Klass; onClose: () => void }) {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  const submit = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("bookings").insert({
        class_id: klass.id,
        customer_name: name.trim().slice(0, 100),
        customer_phone: phone.trim().slice(0, 32),
        note: note.trim().slice(0, 500),
        source: "site",
        status: "pending",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setDone(true);
      qc.invalidateQueries({ queryKey: ["all-bookings"] });
    },
  });

  const dt = new Date(klass.starts_at).toLocaleString("ru-RU", { dateStyle: "long", timeStyle: "short" });

  return (
    <div className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-cream rounded-3xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="eyebrow">Запись на занятие</span>
            <h3 className="font-serif text-2xl mt-3">{klass.title}</h3>
            <div className="text-sm text-foreground/60 mt-1">{dt}</div>
          </div>
          <button onClick={onClose} className="size-9 rounded-full bg-sand hover:bg-walnut hover:text-sand flex items-center justify-center">
            <X className="size-4" />
          </button>
        </div>
        {done ? (
          <div className="text-center py-6">
            <div className="font-serif text-2xl text-olive">Спасибо!</div>
            <p className="text-sm text-foreground/65 mt-2">Заявка отправлена. Мы свяжемся с вами для подтверждения.</p>
            <button onClick={onClose} className="btn-primary mt-6">Закрыть</button>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              className="w-full rounded-xl border border-border bg-sand px-4 py-3 outline-none focus:border-olive text-sm"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
            />
            <input
              className="w-full rounded-xl border border-border bg-sand px-4 py-3 outline-none focus:border-olive text-sm"
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={32}
            />
            <textarea
              className="w-full rounded-xl border border-border bg-sand px-4 py-3 outline-none focus:border-olive text-sm"
              rows={2}
              placeholder="Комментарий (необязательно)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={500}
            />
            {submit.isError && (
              <div className="text-sm text-destructive">
                {submit.error instanceof Error ? submit.error.message : "Ошибка"}
              </div>
            )}
            <button
              onClick={() => submit.mutate()}
              disabled={!name || !phone || submit.isPending}
              className="btn-primary w-full disabled:opacity-50"
            >
              {submit.isPending ? "Отправка…" : "Отправить заявку"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
