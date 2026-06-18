import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookingDialog, useBookingUrl } from "@/components/site/BookingButton";

type Klass = {
  id: string;
  starts_at: string;
  class_type: string;
  title: string;
  description: string;
  seats_total: number;
  seats_free: number | null;
  booking_url: string;
  instructor_id: string | null;
  yclients_activity_id: number | null;
  yclients_service_id: number | null;
};

export function Schedule() {
  const [active, setActive] = useState("Все");
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);
  const baseUrl = useBookingUrl();

  const { data: classes = [], isLoading, isError } = useQuery({
    queryKey: ["public-schedule"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schedule_classes")
        .select(
          "id,starts_at,class_type,title,description,seats_total,seats_free,booking_url,instructor_id,yclients_activity_id,yclients_service_id, instructors(name)",
        )
        .eq("is_published", true)
        .gte("starts_at", new Date(Date.now() - 86400000).toISOString())
        .order("starts_at", { ascending: true })
        .limit(60);
      if (error) throw error;
      return data ?? [];
    },
    refetchInterval: 5 * 60_000,
    retry: 2,
    staleTime: 60_000,
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

  const hasData = classes.length > 0;
  // Раньше тут возвращали null при пустом расписании — из-за этого секция
  // мигала и иногда «пропадала» на главной. Теперь всегда показываем
  // заголовок и якорь #schedule, а внутри либо данные, либо скелетон/сообщение.

  const openFor = (k: Klass) => {
    if (k.booking_url) {
      setBookingUrl(k.booking_url);
      return;
    }
    // Best-effort deep link into YClients with the activity preselected.
    // Unknown params are ignored by the widget, so this degrades gracefully.
    let url = baseUrl;
    if (k.yclients_activity_id) {
      const sep = url.includes("?") ? "&" : "?";
      url = `${url}${sep}o=a${k.yclients_activity_id}`;
    } else if (k.yclients_service_id) {
      const sep = url.includes("?") ? "&" : "?";
      url = `${url}${sep}o=s${k.yclients_service_id}`;
    }
    setBookingUrl(url);
  };

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

        {hasData ? (
          <div className="rounded-3xl bg-cream border border-border/60 overflow-hidden">
            {list.map((s, i) => {
              const d = new Date(s.starts_at);
              const day = d.toLocaleDateString("ru-RU", { weekday: "short" }).toUpperCase().slice(0, 2);
              const date = String(d.getDate());
              const time = d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
              const coach = (s as unknown as { instructors: { name: string } | null }).instructors?.name ?? "";
              const free = s.seats_free;
              const soldOut = typeof free === "number" && free <= 0;
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
                    <div className="text-xs text-foreground/60 mt-0.5">
                      {coach}
                      {typeof free === "number" && !soldOut && (
                        <span className="ml-2 text-walnut">· свободно {free}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-2 hidden lg:block">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-walnut">{s.class_type}</span>
                  </div>
                  <div className="col-span-6 lg:col-span-2 flex justify-end">
                    <button
                      onClick={() => openFor(s as Klass)}
                      disabled={soldOut}
                      className="text-xs px-4 py-2 rounded-full bg-olive/10 text-olive hover:bg-olive hover:text-sand transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-olive/10 disabled:hover:text-olive"
                    >
                      {soldOut ? "Мест нет" : "Записаться"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : isLoading ? (
          <div className="rounded-3xl bg-cream border border-border/60 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-20 ${i !== 4 ? "border-b border-border/60" : ""} bg-sand/40 animate-pulse`}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-cream border border-border/60 px-6 py-12 text-center text-foreground/60 text-sm">
            {isError
              ? "Расписание временно недоступно. Пожалуйста, обновите страницу."
              : "Ближайшие занятия скоро появятся — следите за обновлениями или запишитесь напрямую через кнопку «Записаться»."}
          </div>
        )}
      </div>

      {bookingUrl && <BookingDialog url={bookingUrl} onClose={() => setBookingUrl(null)} />}
    </section>
  );
}
