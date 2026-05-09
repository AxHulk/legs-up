import { ArrowRight, MapPin } from "lucide-react";
import heroBg from "@/assets/hero_bg.jpg";
import logo from "@/assets/logo-nogi-vverh.png";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-end overflow-hidden">
      <img
        src={heroBg}
        alt="Интерьер студии пилатеса"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/30 to-foreground/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-6 lg:px-12 pb-20 lg:pb-28 pt-40">
        <div className="max-w-3xl animate-fade-up">
          <div className="flex items-center gap-3 text-sand/90">
            <MapPin className="size-4" />
            <span className="text-[11px] tracking-[0.3em] uppercase">
              Балашиха · ЖК «Счастье» · Железнодорожный
            </span>
          </div>

          <h1 className="hero-headline mt-8 text-sand text-6xl md:text-7xl lg:text-[112px]">
            Почувствуй
            <br />
            <span className="italic font-light text-sand/95">гармонию</span>
            <br />
            с телом
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-sand/85 font-light">
            Студия пилатеса на реформерах в Железнодорожном — место, где каждая
            тренировка становится путешествием к лучшей версии себя.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a href="#contacts" className="btn-primary">
              Записаться на пробное <ArrowRight className="size-4" />
            </a>
            <a href="#directions" className="btn-outline-light">
              Наши направления
            </a>
          </div>
        </div>

        {/* Floating card */}
        <div className="mt-20 lg:mt-28 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <img
              src={logo}
              alt=""
              aria-hidden
              className="h-16 w-auto opacity-30 [filter:brightness(0)_invert(1)]"
            />
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <div className="grid grid-cols-3 gap-8 lg:gap-10 bg-sand/10 backdrop-blur-md border border-sand/15 rounded-2xl px-7 py-6">
              <Stat value="8+" label="направлений" />
              <Stat value="5" label="инструкторов" />
              <Stat value="200+" label="клиентов" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl lg:text-4xl text-sand">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-sand/70">{label}</div>
    </div>
  );
}
