import { Check } from "lucide-react";
import { BookingButton } from "@/components/site/BookingButton";


import glutes from "@/assets/programs/glutes-3d.webp";
import trx from "@/assets/programs/trx-tonus.webp";
import flexible from "@/assets/programs/flexible-body.webp";
import yogaPower from "@/assets/programs/yoga-power.webp";
import yogaHammock from "@/assets/programs/yoga-stretch-hammock.webp";
import posture from "@/assets/programs/posture.webp";
import mobility from "@/assets/programs/mobility.webp";
import pilates from "@/assets/programs/pilates.webp";
import stretchHammock from "@/assets/programs/stretch-hammock.webp";
import reformerPro from "@/assets/programs/reformer-pro.webp";
import reformerBase from "@/assets/programs/reformer-base.png";
import strengthStretch from "@/assets/programs/strength-stretch.png";
import powerDrive from "@/assets/programs/power-drive.png";

type Program = {
  title: string;
  forWhom: string;
  what: string;
  points: string[];
  image: string;
};

const programs: Program[] = [
  {
    title: "Реформер БАЗА",
    forWhom: "Пилатес на реформерах для тех, кто любит классику",
    what:
      "Знакомство с реформером, базовые упражнения, постановка техники. Классический пилатес на профессиональном оборудовании. Глубокая проработка мышц кора, улучшение стабильности и контроля над телом.",
    points: [
      "Знакомство с реформером с нуля",
      "Постановка правильной техники",
      "Классический пилатес без модификаций",
      "Идеально для новичков",
    ],
    image: reformerBase,
  },
  {
    title: "Реформер PRO",
    forWhom: "Для тех, кто хочет совершенствоваться и открыт новому",
    what:
      "Продвинутый уровень. Сложные комбинации упражнений, интенсивная проработка всех мышечных групп, работа с балансом и координацией. Новые вызовы для вашего тела.",
    points: [
      "Сложные комбинации и новые вызовы",
      "Интенсивная проработка мышц",
      "Развитие баланса и контроля",
      "Для тех, кто прошёл уровень БАЗА",
    ],
    image: reformerPro,
  },
  {
    title: "Пилатес",
    forWhom: "Для тех, кто ценит осознанность и контроль над телом",
    what:
      "Классическая методика укрепления мышц кора и развития стабильности. Контроль, концентрация, дыхание и плавность движений. Безопасная проработка глубоких мышц без перегрузки суставов.",
    points: [
      "Укрепление мышц кора и стабилизаторов",
      "Улучшение баланса и координации",
      "Безопасно для позвоночника и суставов",
      "Подходит для любого возраста и уровня",
    ],
    image: pilates,
  },
  {
    title: "Красивая осанка",
    forWhom: "Для тех, кто хочет расправить плечи и перестать сутулиться",
    what:
      "Специальная программа для коррекции осанки и здоровья позвоночника. Укрепление мышц спины и кора, снятие напряжения в шее и плечах, работа с балансом и стабильностью.",
    points: [
      "Избавление от сутулости",
      "Снятие напряжения в шее и плечах",
      "Уменьшение болей в спине",
      "Улучшение общего самочувствия",
    ],
    image: posture,
  },
  {
    title: "3D Ягодицы",
    forWhom: "Для тех, кто хочет улучшить форму бёдер и функциональность тела",
    what:
      "Комплексная проработка ягодиц в трёх плоскостях движения — тянущие, толкающие и ротационные упражнения. Именно поэтому тренировка называется 3D: включаются все три ягодичные мышцы для гармоничного развития.",
    points: [
      "Проработка всех трёх ягодичных мышц",
      "Подтяжка и создание объёма",
      "Красивая округлая форма",
      "Улучшение функциональности тела",
    ],
    image: glutes,
    imageClass: "object-[50%_15%]",

  },
  {
    title: "TRX Тонус",
    forWhom: "Для тех, кто хочет подтянутое тело без тренажёрного зала",
    what:
      "Функциональная тренировка с петлями TRX — работа с весом собственного тела. Развиваем силу, баланс и выносливость одновременно. Каждое движение задействует глубокие мышцы-стабилизаторы.",
    points: [
      "Подтянутое тело без железа и тренажёров",
      "Развитие баланса и координации",
      "Укрепление глубоких мышц кора",
      "Подходит для любого уровня подготовки",
    ],
    image: trx,
  },
  {
    title: "Силовой драйв",
    forWhom: "Для тех, кто хочет улучшить физическую форму и почувствовать силу",
    what:
      "Интенсивная тренировка на максимум — работа с весами, функциональные упражнения и кардио-интервалы. Никакой скуки, высокий темп и постоянная смена активностей. 55 минут, после которых вы почувствуете себя сильнее.",
    points: [
      "Развитие силы и выносливости",
      "Приведение всего тела в тонус",
      "Сжигание калорий и рельеф мышц",
      "Заряд энергии и уверенности",
    ],
    image: powerDrive,
  },
  {
    title: "Сила & Стретч",
    forWhom: "Комбо-формат для тех, у кого мало времени, но хочется быть в тонусе",
    what:
      "Универсальная тренировка, сочетающая силовую нагрузку и глубокую растяжку в одном занятии. Идеальное сочетание для тех, кто хочет быть сильным и гибким одновременно.",
    points: [
      "Укрепление всех групп мышц",
      "Глубокая растяжка всего тела",
      "Развитие силы и гибкости одновременно",
      "Экономия времени — всё в одной тренировке",
    ],
    image: strengthStretch,
  },
  {
    title: "Йога-сила",
    forWhom: "Для тех, кто хочет объединить мощь силовой и спокойствие йоги",
    what:
      "Динамичная практика, где йога встречается с силовым тренингом. Вы будете удерживать сложные позы, плавно переходить из одного элемента в другой и чувствовать, как тело становится сильнее с каждым занятием — под контролем дыхания и с полной концентрацией.",
    points: [
      "Укрепление и тонус всего тела без тренажёров",
      "Развитие выносливости и силы воли",
      "Баланс, координация и гибкость одновременно",
      "Спокойствие ума при физической нагрузке",
    ],
    image: yogaPower,
  },
  {
    title: "Мобилити",
    forWhom: "Для тех, кто хочет двигаться свободно и без ограничений",
    what:
      "Функциональная тренировка на развитие подвижности суставов и амплитуды движений. Разблокировка зажатых зон, улучшение качества движения в повседневной жизни. Профилактика травм и скованности.",
    points: [
      "Увеличение амплитуды движений",
      "Избавление от скованности и зажимов",
      "Профилактика травм и болей",
      "Подходит для любого уровня и возраста",
    ],
    image: mobility,
  },
  {
    title: "Гибкое тело",
    forWhom: "Для всех, кто мечтает о гибкости и лёгкости в движениях",
    what:
      "Комплексная растяжка всех групп мышц. Улучшение подвижности суставов, гибкости и эластичности связок. Расслабление, снятие напряжения и зажимов после рабочего дня.",
    points: [
      "Развитие гибкости всего тела",
      "Улучшение подвижности суставов",
      "Снятие мышечных зажимов и напряжения",
      "Подходит с любым уровнем гибкости",
    ],
    image: flexible,
  },
  {
    title: "Йога-стретч в гамаках",
    forWhom: "Для тех, кто хочет поймать дзен и ощутить полёт",
    what:
      "Медитативная практика, сочетающая растяжку с элементами йоги в невесомости. Асаны йоги, глубокая растяжка, декомпрессия позвоночника и полное расслабление. Перевёрнутые позы дарят новый взгляд на мир.",
    points: [
      "Йога и растяжка в одной тренировке",
      "Декомпрессия позвоночника в невесомости",
      "Медитация и глубокое расслабление",
      "Эффект полёта и обновления",
    ],
    image: yogaHammock,
  },
  {
    title: "Растяжка в гамаках",
    forWhom: "Для тех, кто устал от однообразных форматов и хочет лёгкости",
    what:
      "Медитативная практика расслабления и растяжки в невесомости. Эффект полёта, декомпрессия позвоночника и глубокая работа с телом без нагрузки на суставы.",
    points: [
      "Глубокая растяжка в невесомости",
      "Декомпрессия позвоночника и расслабление",
      "Снятие стресса и напряжения",
      "Ощущение полёта и лёгкости",
    ],
    image: stretchHammock,
  },
];

export function Programs() {
  return (
    <section id="programs" className="py-28 lg:py-36 bg-sand">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-20">
          <div>
            <span className="eyebrow">Тренировки</span>
            <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
              Все наши
              <br />
              <span className="italic-accent">направления</span>
            </h2>
          </div>
          <p className="max-w-md text-foreground/70 leading-relaxed">
            13 форматов тренировок — от классического пилатеса на реформерах до практик в
            гамаках. Ознакомьтесь с описанием и выберите своё.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {programs.map((p) => (
            <article
              key={p.title}
              className="flex flex-col bg-cream rounded-3xl overflow-hidden border border-border/50 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_oklch(0.45_0.08_122/0.35)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-olive/10">
                <img
                  src={p.image}
                  alt={`Тренировка «${p.title}» в студии НОГИ ВВЕРХ`}
                  loading="lazy"
                  className={`w-full h-full object-cover ${(p as { imageClass?: string }).imageClass ?? ""}`}
                />
              </div>

              <div className="p-7 lg:p-8 flex-1 flex flex-col">
                <h3 className="font-serif text-3xl">{p.title}</h3>
                <p className="mt-3 text-[13px] uppercase tracking-[0.14em] text-walnut leading-relaxed">
                  {p.forWhom}
                </p>
                <p className="mt-5 text-sm text-foreground/70 leading-relaxed">{p.what}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm text-foreground/80">
                      <Check className="size-4 shrink-0 mt-0.5 text-olive" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <BookingButton
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-olive/40 px-6 py-3 text-[13px] uppercase tracking-[0.16em] text-olive hover:bg-olive hover:text-sand transition-colors"
                  ariaLabel={`Смотреть расписание по направлению ${p.title}`}
                >
                  Смотреть расписание
                </BookingButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
