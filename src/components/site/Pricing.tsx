import { Info } from "lucide-react";
import planTrial from "@/assets/plan-trial.png";
import planPopular from "@/assets/plan-popular.png";
import planUnlimited from "@/assets/plan-unlimited.png";

const plans = [
  { src: planTrial, alt: "Пробный — первое занятие бесплатно" },
  { src: planPopular, alt: "Популярный — групповой абонемент на 8 занятий" },
  { src: planUnlimited, alt: "Безлимит — месяц без ограничений" },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Абонементы</span>
          <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
            Выберите свой <span className="italic-accent">абонемент</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((p) => (
            <a
              key={p.alt}
              href="#contacts"
              aria-label={p.alt}
              className="group block rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-olive/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </a>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Info className="size-4" />
          Скидки для детей и пенсионеров. Уточняйте актуальные цены у администратора.
        </div>
      </div>
    </section>
  );
}
