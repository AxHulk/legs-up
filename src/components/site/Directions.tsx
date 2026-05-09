import { Activity, Sparkles, Dumbbell, Heart, Flame, Leaf } from "lucide-react";

const items = [
  { icon: Activity, title: "Пилатес на реформерах", desc: "Наше главное направление. Работа на профессиональном оборудовании под руководством сертифицированных инструкторов." },
  { icon: Sparkles, title: "Растяжка и гамаки", desc: "Растяжка и стретчинг в воздушных гамаках — мягко и эффективно для гибкости тела." },
  { icon: Dumbbell, title: "Функциональный тренинг", desc: "Комплексные тренировки для развития силы, выносливости и координации движений." },
  { icon: Heart, title: "Здоровая спина", desc: "Специализированные занятия для профилактики и коррекции проблем с позвоночником." },
  { icon: Flame, title: "Full Body", desc: "Полноценная тренировка всего тела — сочетание силовых и кардио упражнений." },
  { icon: Leaf, title: "Хатха йога и гамаки", desc: "Классическая хатха йога и воздушная йога в гамаках — для баланса тела и духа." },
];

export function Directions() {
  return (
    <section id="directions" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="eyebrow">Направления</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Выберите своё
              <br /><span className="italic-serif">направление</span>
            </h2>
          </div>
          <a href="#contacts" className="btn-primary self-start lg:self-auto">Записаться</a>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            const featured = i === 0;
            return (
              <article
                key={it.title}
                className={`group rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  featured
                    ? "bg-olive text-sand"
                    : "bg-card border border-border hover:border-olive/40"
                }`}
              >
                <div className={`text-xs ${featured ? "text-sand/70" : "text-muted-foreground"}`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className={`mt-6 size-12 rounded-xl flex items-center justify-center ${
                  featured ? "bg-sand/15" : "bg-secondary"
                }`}>
                  <Icon className={`size-6 ${featured ? "text-sand" : "text-olive"}`} />
                </div>
                <h3 className={`mt-6 font-serif text-2xl ${featured ? "text-sand" : "text-foreground"}`}>
                  {it.title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${
                  featured ? "text-sand/80" : "text-muted-foreground"
                }`}>
                  {it.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
