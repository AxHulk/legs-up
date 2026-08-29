import { ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookingButton } from "@/components/site/BookingButton";

type Direction = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image_url: string;
  yclients_url: string;
};

export function Directions() {
  const { data: cards = [], isLoading, isError } = useQuery({
    queryKey: ["public-directions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("directions")
        .select("id,kicker,title,description,image_url,yclients_url")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Direction[];
    },
    retry: 2,
    staleTime: 5 * 60_000,
  });

  const hasData = cards.length > 0;
  if (!isLoading && !isError && !hasData) return null;

  return (
    <section id="directions" className="py-28 lg:py-36 bg-cream">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-20">
          <div>
            <span className="eyebrow">Направления</span>
            <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
              Выберите своё
              <br />
              <span className="italic-accent">направление</span>
            </h2>
          </div>
          <p className="max-w-md text-foreground/70 leading-relaxed">
            Подберём занятие под ваш ритм, цели и уровень.
          </p>
        </div>

        {hasData ? (
          <div className="grid md:grid-cols-3 gap-7">
            {cards.map((c) => (
              <article
                key={c.id}
                className="group flex flex-col bg-sand rounded-3xl overflow-hidden border border-border/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_oklch(0.45_0.08_122/0.4)]"
              >
                <div className="relative px-3 pt-3">
                  <div className="relative arch-top overflow-hidden aspect-[4/5]">
                    <img
                      src={c.image_url}
                      alt={c.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="p-7 lg:p-8 flex-1 flex flex-col">
                  {c.kicker && <div className="text-[10px] uppercase tracking-[0.22em] text-walnut mb-3">{c.kicker}</div>}
                  <h3 className="font-serif text-3xl">{c.title}</h3>
                  <p className="mt-4 text-sm text-foreground/70 leading-relaxed flex-1">{c.description}</p>
                  <BookingButton
                    className="mt-7 inline-flex w-full items-center justify-between text-sm font-medium text-olive border-t border-border/70 pt-5 group-hover:text-olive-deep transition-colors"
                    ariaLabel={`Смотреть расписание — ${c.title}`}
                  >
                    <span>Смотреть расписание</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </BookingButton>
                </div>
              </article>
            ))}
          </div>
        ) : isError ? (
          <p className="text-foreground/60 text-sm">
            Список направлений временно недоступен. Пожалуйста, обновите страницу.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-7">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-sand/60 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
