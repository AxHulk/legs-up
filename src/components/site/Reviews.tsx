import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import r1 from "@/assets/review_1.jpg";
import r2 from "@/assets/review_2.jpg";
import r3 from "@/assets/review_3.jpg";

const reviews = [
  { img: r1, name: "Анастасия", tag: "Клиент · 8 месяцев", text: "Пришла после травмы спины — и осталась навсегда. Жанна подобрала программу под мои ограничения, через два месяца забыла, что значит «болит поясница». Атмосфера в студии — отдельная любовь." },
  { img: r2, name: "Екатерина", tag: "Клиент · 1.5 года", text: "Пилатес на реформерах изменил мою осанку и общее самочувствие. Малые группы, внимательные инструкторы, красивое пространство, в которое хочется возвращаться. Очень рекомендую." },
  { img: r3, name: "Марина", tag: "Клиент · 6 месяцев", text: "Долго искала студию, где не «бегают по залу». Здесь работают тонко: с дыханием, с положением каждой косточки. Чувствую тело по-новому, и это ощущение бесценно." },
];

export function Reviews() {
  const [i, setI] = useState(0);
  const r = reviews[i];
  const prev = () => setI((p) => (p - 1 + reviews.length) % reviews.length);
  const next = () => setI((p) => (p + 1) % reviews.length);

  return (
    <section className="relative py-28 lg:py-36 bg-cream overflow-hidden">
      <div className="absolute inset-0 pattern-floral opacity-[0.4]" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="eyebrow">Отзывы</span>
          <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
            Слова <span className="italic-accent">наших</span> клиентов
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                key={r.img}
                src={r.img}
                alt={r.name}
                className="absolute inset-0 w-full h-full object-cover animate-fade-up"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Quote className="size-10 text-olive/50" />
            <p
              key={r.text}
              className="mt-6 font-serif text-3xl lg:text-[34px] leading-snug text-foreground animate-fade-up"
            >
              {r.text}
            </p>
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <div>
                <div className="font-serif text-2xl">{r.name}</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-walnut mt-1">{r.tag}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={prev} className="size-12 rounded-full border border-border flex items-center justify-center hover:bg-olive hover:text-sand hover:border-olive transition-colors" aria-label="Предыдущий">
                  <ChevronLeft className="size-5" />
                </button>
                <span className="text-sm tabular-nums text-foreground/60 w-10 text-center">
                  {String(i + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
                </span>
                <button onClick={next} className="size-12 rounded-full border border-border flex items-center justify-center hover:bg-olive hover:text-sand hover:border-olive transition-colors" aria-label="Следующий">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
