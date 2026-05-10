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
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/40 to-foreground/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/65 via-foreground/25 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-6 lg:px-12 pb-20 lg:pb-28 pt-40">
        <div className="max-w-3xl animate-fade-up [text-shadow:0_2px_24px_oklch(0.2_0.02_60/0.55)]">
          <div className="flex items-center gap-3 text-sand">
            <MapPin className="size-4" />
            <span className="text-[11px] tracking-[0.3em] uppercase">
              Балашиха · ЖК «Счастье» · Железнодорожный
            </span>
          </div>

          <h1 className="hero-headline mt-8 text-sand text-6xl md:text-7xl lg:text-[112px]">
            Почувствуй
            <br />
            <span className="italic font-light">гармонию</span>
            <br />
            с телом
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-sand font-light">
            Студия пилатеса на реформерах в Железнодорожном — место, где каждая
            тренировка становится путешествием к лучшей версии себя.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a href="#contacts" className="btn-primary">
              Попробовать бесплатно <ArrowRight className="size-4" />
            </a>
            <a href="#directions" className="btn-outline-light btn-outline-light--strong">
              Наши направления
            </a>
          </div>
        </div>

        {/* Logo mark */}
        <div className="mt-20 lg:mt-28 flex justify-end">
          <img
            src={logo}
            alt=""
            aria-hidden
            className="h-16 w-auto opacity-50 [filter:brightness(0)_invert(1)]"
          />
        </div>
      </div>
    </section>
  );
}
