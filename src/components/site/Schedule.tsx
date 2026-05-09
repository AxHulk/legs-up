import { useState } from "react";
import { Check } from "lucide-react";

const filters = ["Все", "Реформер", "Растяжка", "Йога", "Спина"];

const schedule = [
  { day: "ПН", date: "12", time: "09:00", title: "Пилатес на реформерах", coach: "Жанна К.", cat: "Реформер", spots: "Есть места" },
  { day: "ПН", date: "12", time: "19:30", title: "Здоровая спина", coach: "Анна С.", cat: "Спина", spots: "Мало мест" },
  { day: "ВТ", date: "13", time: "10:30", title: "Растяжка в гамаках", coach: "Наталья Р.", cat: "Растяжка", spots: "Есть места" },
  { day: "ВТ", date: "13", time: "18:00", title: "Хатха йога", coach: "Ольга К.", cat: "Йога", spots: "Есть места" },
  { day: "СР", date: "14", time: "09:00", title: "Пилатес · продвинутый", coach: "Жанна К.", cat: "Реформер", spots: "1 место" },
  { day: "ЧТ", date: "15", time: "20:00", title: "Воздушные гамаки", coach: "Наталья Р.", cat: "Растяжка", spots: "Есть места" },
];

const plans = [
  { tag: "Пробный", price: "Бесплатно", sub: "первое занятие", features: ["1 занятие на выбор", "Знакомство с инструктором", "Оценка уровня"], cta: "Записаться", featured: false },
  { tag: "Популярный", badge: "выгодно", price: "8 занятий", sub: "групповой абонемент", features: ["8 занятий на выбор", "Все направления", "Гибкое расписание", "Действует 2 месяца"], cta: "Записаться", featured: true },
  { tag: "Безлимит", price: "Месяц", sub: "без ограничений", features: ["Все направления", "Без ограничений", "Приоритетная запись"], cta: "Узнать цену", featured: false },
];

export function Schedule() {
  const [active, setActive] = useState("Все");
  const list = active === "Все" ? schedule : schedule.filter((s) => s.cat === active);

  return (
    <section id="schedule" className="py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Schedule */}
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
          {list.map((s, i) => (
            <div
              key={`${s.day}-${s.time}-${s.title}`}
              className={`grid grid-cols-12 gap-4 items-center px-5 lg:px-8 py-5 ${
                i !== list.length - 1 ? "border-b border-border/60" : ""
              } hover:bg-sand/60 transition-colors`}
            >
              <div className="col-span-3 lg:col-span-2 flex items-baseline gap-3">
                <span className="font-serif text-3xl text-olive">{s.date}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-walnut">{s.day}</span>
              </div>
              <div className="col-span-3 lg:col-span-2 font-serif text-xl">{s.time}</div>
              <div className="col-span-12 lg:col-span-4 order-last lg:order-none mt-2 lg:mt-0">
                <div className="font-medium">{s.title}</div>
                <div className="text-xs text-foreground/60 mt-0.5">{s.coach}</div>
              </div>
              <div className="col-span-4 lg:col-span-2 hidden lg:block">
                <span className="text-[11px] uppercase tracking-[0.2em] text-walnut">{s.cat}</span>
              </div>
              <div className="col-span-6 lg:col-span-2 flex justify-end">
                <a
                  href="#contacts"
                  className={`text-xs px-4 py-2 rounded-full transition-colors ${
                    s.spots.includes("Мало") || s.spots.includes("место")
                      ? "bg-walnut/15 text-walnut hover:bg-walnut hover:text-sand"
                      : "bg-olive/10 text-olive hover:bg-olive hover:text-sand"
                  }`}
                >
                  {s.spots}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div id="pricing" className="mt-32">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Абонементы</span>
            <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
              Выберите свой <span className="italic-accent">абонемент</span>
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.tag}
                className={`relative rounded-3xl p-9 flex flex-col ${
                  p.featured
                    ? "bg-olive text-sand md:scale-[1.04] shadow-[0_30px_70px_-30px_oklch(0.4_0.09_122/0.6)]"
                    : "bg-cream border border-border/60"
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sand text-olive text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 rounded-full font-medium border border-olive/20">
                    {p.badge}
                  </div>
                )}
                <div className={`text-center text-[11px] uppercase tracking-[0.28em] ${p.featured ? "text-sand/80" : "text-walnut"}`}>
                  {p.tag}
                </div>
                <div className="mt-7 text-center">
                  <div className={`font-serif text-5xl lg:text-6xl ${p.featured ? "text-sand" : ""}`}>{p.price}</div>
                  <div className={`mt-3 text-sm ${p.featured ? "text-sand/75" : "text-foreground/60"}`}>{p.sub}</div>
                </div>
                <div className={`my-8 h-px ${p.featured ? "bg-sand/20" : "bg-border"}`} />
                <ul className="space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className={`size-4 mt-0.5 shrink-0 ${p.featured ? "text-sand" : "text-olive"}`} />
                      <span className={p.featured ? "text-sand/90" : "text-foreground/80"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacts"
                  className={`mt-8 inline-flex items-center justify-center py-3.5 rounded-full font-medium text-sm transition-colors ${
                    p.featured
                      ? "bg-sand text-olive hover:bg-cream"
                      : "border border-olive text-olive hover:bg-olive hover:text-sand"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-foreground/60">
            Скидки для детей и пенсионеров. Уточняйте актуальные цены у администратора.
          </p>
        </div>
      </div>
    </section>
  );
}
