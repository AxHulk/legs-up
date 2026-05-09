import { Check, Info } from "lucide-react";

const plans = [
  {
    label: "Пробный",
    price: "0₽",
    sub: "первое занятие",
    features: ["1 занятие на выбор", "Знакомство с инструктором", "Оценка уровня подготовки"],
    cta: "Записаться",
    featured: false,
  },
  {
    label: "Популярный",
    badge: "выгодно",
    price: "8 занятий",
    sub: "групповой абонемент",
    features: ["8 занятий на выбор", "Все направления студии", "Гибкое расписание", "Персональный подход"],
    cta: "Записаться",
    featured: true,
  },
  {
    label: "Безлимит",
    price: "Месяц",
    sub: "неограниченные занятия",
    features: ["Все направления", "Без ограничений", "Приоритетная запись"],
    cta: "Узнать цену",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Абонементы</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Выберите свой <span className="italic-serif">абонемент</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.label}
              className={`rounded-3xl p-8 lg:p-10 flex flex-col ${
                p.featured
                  ? "bg-olive text-sand md:scale-[1.03] shadow-2xl shadow-olive/30"
                  : "bg-card border border-border"
              }`}
            >
              <div className={`text-center text-[11px] uppercase tracking-[0.25em] ${p.featured ? "text-sand/80" : "text-walnut"}`}>
                {p.label}
              </div>
              {p.badge && (
                <div className="mx-auto mt-3 inline-flex bg-sand text-olive text-xs px-3 py-1 rounded-full font-medium">
                  {p.badge}
                </div>
              )}
              <div className="mt-6 text-center">
                <div className={`font-serif text-5xl ${p.featured ? "text-sand" : "text-foreground"}`}>{p.price}</div>
                <div className={`mt-2 text-sm ${p.featured ? "text-sand/75" : "text-muted-foreground"}`}>{p.sub}</div>
              </div>
              <div className={`my-7 h-px ${p.featured ? "bg-sand/20" : "bg-border"}`} />
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
                className={`mt-8 inline-flex items-center justify-center py-3.5 rounded-full font-medium transition-colors ${
                  p.featured
                    ? "bg-sand text-olive hover:bg-sand/90"
                    : "border border-olive text-olive hover:bg-olive hover:text-sand"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Info className="size-4" />
          Скидки для детей и пенсионеров. Уточняйте актуальные цены у администратора.
        </div>
      </div>
    </section>
  );
}
