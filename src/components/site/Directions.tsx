import { ArrowUpRight } from "lucide-react";
import beginners from "@/assets/card_beginners.jpg";
import advanced from "@/assets/card_advanced.jpg";
import privateImg from "@/assets/card_private.jpg";
import iconBeginner from "@/assets/icons/icon_beginner.png";
import iconAdvanced from "@/assets/icons/icon_advanced.png";
import iconPersonal from "@/assets/icons/icon_personal.png";

const cards = [
  {
    img: beginners, icon: iconBeginner, kicker: "01 · Старт",
    title: "Для начинающих",
    desc: "Мягкое погружение в пилатес: знакомство с реформером, базовые принципы дыхания и контроля тела.",
  },
  {
    img: advanced, icon: iconAdvanced, kicker: "02 · Уровень",
    title: "Продвинутый",
    desc: "Интенсивные тренировки для тех, кто ищет глубокую проработку, силу и сложные элементы.",
  },
  {
    img: privateImg, icon: iconPersonal, kicker: "03 · Персонально",
    title: "Индивидуальные",
    desc: "Программа под вас: работа со спиной, восстановление, подготовка к спорту или беременности.",
  },
];

export function Directions() {
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
            Три формата — от первого знакомства до индивидуальной программы.
            Подберём занятие под ваш ритм, цели и уровень.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group flex flex-col bg-sand rounded-3xl overflow-hidden border border-border/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_oklch(0.45_0.08_122/0.4)]"
            >
              <div className="relative px-3 pt-3">
                <div className="relative arch-top overflow-hidden aspect-[4/5]">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="p-7 lg:p-8 flex-1 flex flex-col">
                <h3 className="font-serif text-3xl">{c.title}</h3>
                <p className="mt-4 text-sm text-foreground/70 leading-relaxed flex-1">{c.desc}</p>
                <a
                  href="#contacts"
                  className="mt-7 inline-flex items-center justify-between text-sm font-medium text-olive border-t border-border/70 pt-5 group-hover:text-olive-deep transition-colors"
                >
                  <span>Записаться</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
