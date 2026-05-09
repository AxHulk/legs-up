import { Star } from "lucide-react";
import iconCertificate from "@/assets/icons/icon_certificate.png";

const team = [
  { name: "Жанна Калугина", role: "Директор · Пилатес на реформерах", years: "10+ лет", desc: "Основатель студии. Бережный профессиональный подход для любого уровня.", tone: "olive" },
  { name: "Наталья Рыкова", role: "Йога · Воздушные гамаки", years: "7 лет", desc: "Восстановление, постановка техники, работа с дыханием и расслаблением.", tone: "walnut" },
  { name: "Анна Соколова", role: "Здоровая спина · Стретчинг", years: "6 лет", desc: "Реабилитация позвоночника, коррекция осанки, мягкая растяжка.", tone: "sand" },
  { name: "Мария Лебедева", role: "Функциональный тренинг · TRX", years: "5 лет", desc: "Сила, выносливость, координация — всё тело за одну тренировку.", tone: "olive" },
  { name: "Ольга Ким", role: "Хатха йога · Pre/Post-natal", years: "8 лет", desc: "Йога классическая и для будущих мам — мягко, осознанно, безопасно.", tone: "walnut" },
];

const toneMap: Record<string, string> = {
  olive: "bg-olive text-sand",
  walnut: "bg-walnut text-sand",
  sand: "bg-sand-deep text-foreground",
};

export function Team() {
  return (
    <section id="team" className="py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow">Команда</span>
            <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
              Наши <span className="italic-accent">инструкторы</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-foreground/70 leading-relaxed">
            Сертифицированные специалисты с бережным подходом — от первой
            тренировки до сложных индивидуальных программ.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {team.map((m) => (
            <article
              key={m.name}
              className="group rounded-2xl overflow-hidden bg-cream border border-border/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_oklch(0.45_0.08_122/0.5)]"
            >
              <div className={`relative aspect-[3/4] flex items-center justify-center ${toneMap[m.tone]}`}>
                <span className="font-serif italic text-7xl opacity-25 select-none">
                  {m.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <div className="absolute top-4 right-4 size-9 rounded-full bg-sand/95 flex items-center justify-center" title="Сертифицирован">
                  <img src={iconCertificate} alt="" className="size-5 object-contain" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Star className="size-3 fill-current" /> {m.years}
                </div>
              </div>
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-walnut">{m.role}</div>
                <h3 className="mt-2 font-serif text-xl leading-tight">{m.name}</h3>
                <p className="mt-3 text-xs text-foreground/65 leading-relaxed">{m.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
