import { Helmet } from "react-helmet-async";

const faqs = [
  {
    q: "Что такое пилатес на реформерах?",
    a: "Реформер — это профессиональный тренажёр, разработанный Джозефом Пилатесом. Каретка на пружинах создаёт переменное сопротивление, благодаря которому занятия мягко прорабатывают глубокие мышцы, укрепляют осанку и развивают гибкость без ударной нагрузки на суставы.",
  },
  {
    q: "Где находится студия «НОГИ ВВЕРХ»?",
    a: "Мы находимся в Балашихе, микрорайон Железнодорожный, на ул. Автозаводская, дом 5. До нас удобно дойти от ж/д станции Железнодорожная и доехать из любой части Балашихи и востока Москвы.",
  },
  {
    q: "Подходят ли занятия для начинающих?",
    a: "Да. Все направления — пилатес на реформерах, аэройога в гамаках, тренировки для спины — мы ведём в мини-группах до 6 человек. Инструктор корректирует технику каждого, поэтому новичкам комфортно с первого занятия.",
  },
  {
    q: "Сколько стоит пилатес на реформере в Балашихе?",
    a: "Стоимость занятия в мини-группе — от доступного уровня для постоянной практики; есть абонементы, разовые посещения и индивидуальные тренировки. Актуальные цены и абонементы доступны в разделе «Записаться» и через виджет онлайн-записи.",
  },
  {
    q: "Помогает ли пилатес при болях в спине?",
    a: "Регулярные занятия пилатесом укрепляют мышцы-стабилизаторы позвоночника, улучшают осанку и снимают мышечное напряжение. У нас есть отдельные программы для здоровой спины — мы подберём нагрузку под ваше состояние и при необходимости порекомендуем индивидуальный формат.",
  },
  {
    q: "Что такое йога в гамаках (аэройога)?",
    a: "Аэройога — это занятия в подвесных гамаках из мягкой ткани. Гамак снимает нагрузку с позвоночника, помогает мягко вытягивать тело, развивает гибкость и баланс. Подходит и для начинающих, и для тех, кто хочет разнообразить практику.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-sand">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}</script>
      </Helmet>

      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <span className="eyebrow">Частые вопросы</span>
        <h2 className="mt-6 text-5xl md:text-6xl lg:text-7xl">
          О занятиях <span className="italic-accent">и студии</span>
        </h2>

        <div className="mt-14 divide-y divide-border/60 border-y border-border/60">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                <h3 className="font-serif text-xl md:text-2xl text-foreground pr-4">{f.q}</h3>
                <span className="mt-1 size-7 shrink-0 rounded-full border border-border/70 flex items-center justify-center text-foreground/60 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-foreground/75 max-w-3xl">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
