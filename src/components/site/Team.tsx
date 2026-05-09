import { Star, User } from "lucide-react";

const team = [
  { tag: "Пилатес на реформерах", name: "Жанна Калугина", role: "Директор и инструктор", desc: "Создатель студии. Бережный и профессиональный подход, умение работать с любым уровнем подготовки.", bg: "bg-olive", figure: "text-olive/40" },
  { tag: "Йога и гамаки", name: "Наталья Рыкова", role: "Стаж 7 лет", desc: "Прекрасно подходит для тех, кто в периоде восстановления или нуждается в правильной постановке техники.", bg: "bg-walnut", figure: "text-walnut/40" },
  { tag: "Функциональный тренинг · TRX", name: "Инструктор TRX", role: "Сертифицированный специалист", desc: "Специализируется на функциональных тренировках и работе с TRX-петлями для всех уровней.", bg: "bg-secondary", figure: "text-walnut/30" },
];

export function Team() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <span className="eyebrow">Команда</span>
        <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
          Наши <span className="italic-serif">инструкторы</span>
        </h2>
        <p className="mt-6 max-w-md text-muted-foreground">
          Опытные специалисты с бережным подходом к каждому клиенту — от новичков до продвинутых.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {team.map((m) => (
            <article key={m.name} className="rounded-3xl overflow-hidden bg-background border border-border">
              <div className={`${m.bg} aspect-[4/5] flex items-center justify-center`}>
                <User className={`size-32 ${m.figure}`} strokeWidth={1.2} />
              </div>
              <div className="p-7">
                <div className="text-[11px] uppercase tracking-[0.2em] text-walnut">{m.tag}</div>
                <h3 className="mt-3 font-serif text-2xl">{m.name}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-olive">
                  <Star className="size-4 fill-olive" /> {m.role}
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
