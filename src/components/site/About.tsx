import { Check, Quote } from "lucide-react";

const points = [
  "Квалифицированные инструкторы",
  "Группы для начинающих",
  "Уютная атмосфера",
  "Скидки для детей и пенсионеров",
];

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <span className="eyebrow">О нас</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground">
            Студия, созданная
            <br />с <span className="italic-serif">заботой</span> о вас
          </h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground max-w-lg">
            Мы приглашаем вас в пространство, где каждая тренировка — это путешествие к лучшей версии себя.
            Пилатес на реформерах мягко работает с телом, укрепляет глубокие мышцы и восстанавливает осанку.
          </p>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="size-7 shrink-0 rounded-full bg-secondary flex items-center justify-center">
                  <Check className="size-4 text-olive" />
                </span>
                <span className="text-sm text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="relative rounded-3xl bg-secondary p-8 lg:p-10 overflow-hidden">
            <Quote className="absolute top-6 left-8 size-6 text-olive/60" />
            <p className="font-serif italic text-2xl lg:text-[28px] leading-snug text-foreground pl-10">
              Расслабиться, почувствовать гармонию со своим телом и подарить себе красивое и здоровое тело
            </p>
            <div className="mt-6 text-xs uppercase tracking-[0.2em] text-walnut pl-10">
              Философия студии ВВЕРХ
            </div>
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-olive/10" />
          </div>

          <div className="rounded-3xl bg-olive text-sand p-8 lg:p-10">
            <div className="font-serif text-4xl">2 этаж</div>
            <p className="mt-4 text-sm leading-relaxed text-sand/80">
              ЖК «Счастье», ул. Автозаводская, д. 5
              <br />Балашиха, мкр. Железнодорожный
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
