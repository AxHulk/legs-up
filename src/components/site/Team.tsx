import { useState } from "react";
import { Star, X } from "lucide-react";
import iconCertificate from "@/assets/icons/icon_certificate.png";
import zhanna1 from "@/assets/team/zhanna_1.png";
import zhanna2 from "@/assets/team/zhanna_2.png";
import zhanna3 from "@/assets/team/zhanna_3.png";
import natalya1 from "@/assets/team/natalya_1.png";
import natalya2 from "@/assets/team/natalya_2.png";
import natalya3 from "@/assets/team/natalya_3.png";
import trx1 from "@/assets/team/trx_1.png";
import trx2 from "@/assets/team/trx_2.png";
import trx3 from "@/assets/team/trx_3.png";

type Instructor = {
  name: string;
  role: string;
  years: string;
  desc: string;
  bio: string;
  photos: string[];
};

const team: Instructor[] = [
  {
    name: "Жанна Калугина",
    role: "Директор · Пилатес на реформерах",
    years: "10+ лет",
    desc: "Основатель студии. Бережный профессиональный подход для любого уровня.",
    bio: "Жанна — основатель студии «НОГИ ВВЕРХ» и сертифицированный инструктор по пилатесу на реформерах с опытом более 10 лет. Её философия — внимание к каждому ученику, точность движения и забота о теле в любом возрасте. Жанна работает с клиентами на восстановлении после травм, с осанкой и общей физической формой, помогая обрести лёгкость и силу через осознанную работу с телом.",
    photos: [zhanna1, zhanna2, zhanna3],
  },
  {
    name: "Наталья Рыкова",
    role: "Йога · Воздушные гамаки",
    years: "7 лет",
    desc: "Восстановление, постановка техники, работа с дыханием и расслаблением.",
    bio: "Наталья ведёт классы хатха-йоги и воздушных гамаков, объединяя силу, гибкость и глубокое расслабление. За 7 лет преподавания она помогла десяткам учеников найти баланс между телом и сознанием. На её занятиях вы научитесь слушать дыхание, отпускать напряжение и чувствовать каждую мышцу — мягко, без перегрузок и спешки.",
    photos: [natalya1, natalya2, natalya3],
  },
  {
    name: "Артур Назарян",
    role: "TRX · Функциональный тренинг",
    years: "8 лет",
    desc: "Сила, выносливость и контроль тела через подвесные тренировки TRX.",
    bio: "Артур — сертифицированный TRX-тренер с опытом более 8 лет. Его тренировки — это сочетание силовой работы, кардио и контроля собственного тела на подвесных петлях. Артур умеет адаптировать программу под любой уровень: от первого знакомства с TRX до продвинутых атлетических протоколов. Результат — рельефное тело, крепкий кор и уверенность в каждом движении.",
    photos: [trx1, trx2, trx3],
  },
];

export function Team() {
  const [active, setActive] = useState<Instructor | null>(null);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((m) => (
            <button
              key={m.name}
              onClick={() => setActive(m)}
              className="group text-left rounded-2xl overflow-hidden bg-cream border border-border/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_oklch(0.45_0.08_122/0.55)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={m.photos[0]}
                  alt={m.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute top-4 right-4 size-10 rounded-full bg-sand/95 flex items-center justify-center" title="Сертифицирован">
                  <img src={iconCertificate} alt="" className="size-6 object-contain" />
                </div>
                <div className="absolute bottom-4 left-5 right-5 text-sand text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Star className="size-3 fill-current" /> {m.years}
                </div>
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-[0.22em] text-walnut">{m.role}</div>
                <h3 className="mt-2 font-serif text-2xl leading-tight">{m.name}</h3>
                <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{m.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-olive group-hover:gap-3 transition-all">
                  Подробнее →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setActive(null)}
        >
          <div
            className="relative bg-cream rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Закрыть"
              className="absolute top-4 right-4 z-10 size-10 rounded-full bg-sand hover:bg-olive hover:text-sand transition-colors flex items-center justify-center"
            >
              <X className="size-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="grid grid-cols-2 gap-2 p-4 md:p-6">
                <img src={active.photos[0]} alt={active.name} className="col-span-2 aspect-[4/3] w-full h-full object-cover object-top rounded-2xl" />
                <img src={active.photos[1]} alt={active.name} className="aspect-square w-full h-full object-cover rounded-2xl" />
                <img src={active.photos[2]} alt={active.name} className="aspect-square w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <span className="eyebrow">{active.role}</span>
                <h3 className="mt-5 font-serif text-4xl md:text-5xl leading-tight">{active.name}</h3>
                <div className="mt-3 text-xs uppercase tracking-[0.22em] text-walnut">Опыт {active.years}</div>
                <p className="mt-6 text-foreground/75 leading-relaxed">{active.bio}</p>
                <a href="#contacts" onClick={() => setActive(null)} className="btn-primary mt-8 self-start">
                  Записаться на тренировку
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
