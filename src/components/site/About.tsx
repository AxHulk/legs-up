import iconSpine from "@/assets/icons/icon_spine.png";
import iconMuscle from "@/assets/icons/icon_muscle.png";
import iconFlexibility from "@/assets/icons/icon_flexibility.png";
import iconBalance from "@/assets/icons/icon_balance.png";

const advantages = [
  { icon: iconSpine, title: "Красивая осанка", desc: "Бережно укрепляем глубокие мышцы и восстанавливаем осанку." },
  { icon: iconMuscle, title: "Сила и тонус", desc: "Прорабатываем всё тело — мягко, но глубоко и эффективно." },
  { icon: iconFlexibility, title: "Гибкость", desc: "Удлиняем мышцы, увеличиваем подвижность суставов." },
  { icon: iconBalance, title: "Баланс", desc: "Возвращаем телу координацию, лёгкость и внутренний центр." },
];

export function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 pattern-floral opacity-[0.5]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sand to-transparent" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <span className="eyebrow">О студии</span>
          <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl text-foreground">
            Пространство
            <br />
            <span className="italic-accent">для заботы</span>
            <br />
            о себе
          </h2>
          <p className="mt-8 text-base leading-relaxed text-foreground/75 max-w-md">
            «НОГИ ВВЕРХ» — это студия фитнеса и пилатеса на профессиональных реформерах
            в Железнодорожном. Мы создаём эстетичное и продуманное пространство, где можно расслабиться,
            почувствовать гармонию со своим телом и подарить себе красивое и
            здоровое тело.
          </p>
          <p className="mt-5 text-base leading-relaxed text-foreground/75 max-w-md">
            Индивидуальный подход, малые группы, сертифицированные инструкторы —
            каждая деталь подчинена одной цели: вашему движению вверх.
          </p>

          <a href="#directions" className="ghost-link mt-10">
            Узнать о направлениях →
          </a>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
          {advantages.map((a) => (
            <article
              key={a.title}
              className="group bg-cream border border-border/70 rounded-2xl p-7 transition-all duration-500 hover:border-olive/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_oklch(0.45_0.08_122/0.5)]"
            >
              <div className="size-32 rounded-2xl bg-sand-deep/60 flex items-center justify-center group-hover:bg-olive/10 transition-colors">
                <img src={a.icon} alt="" className="size-20 object-contain" />
              </div>
              <h3 className="mt-6 font-serif text-2xl">{a.title}</h3>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{a.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
