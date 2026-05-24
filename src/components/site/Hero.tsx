import { ArrowRight, MapPin, ChevronDown } from "lucide-react";
import heroBody from "@/assets/hero_body.jpg";
import { BookingButton } from "@/components/site/BookingButton";

const chips = [
  "Пилатес на реформерах",
  "Малые группы",
  "Йога в гамаках",
  "Индивидуальный подход",
];

// Вертикальная позиция заголовка в hero: меньше число — выше, больше — ниже.
const HERO_HEADLINE_TOP = "44vh";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden bg-walnut">
      {/* Body photo — warm, alive, the real subject */}
      <img
        src={heroBody}
        alt="Пилатес на реформере — работа с телом в студии НОГИ ВВЕРХ"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Soft vignette only — keep the warmth of the skin and the studio */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/35 via-transparent to-foreground/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.2_0.02_60/0.45)_100%)]" />

      {/* Subtle film grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Centered editorial content */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-6 lg:px-12 pb-16">
        <div className="text-center max-w-4xl animate-fade-up [text-shadow:0_2px_30px_oklch(0.2_0.02_60/0.5)]">
          {/* Headline — position controlled by HERO_HEADLINE_TOP above */}
          <h1
            className="hero-headline absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,760px)] text-sand text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[0.98]"
            style={{ top: HERO_HEADLINE_TOP }}
          >
            Искусство работы
            <br />
            <span className="italic font-light">с&nbsp;телом</span>
          </h1>

          {/* Chips — pushed lower */}
          <div className="mt-[72vh] flex flex-wrap items-center justify-center gap-2.5">
            {chips.map((c) => (
              <span
                key={c}
                className="px-4 py-2 rounded-full text-[12px] tracking-wide text-sand bg-sand/10 border border-sand/25 backdrop-blur-md"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Circular CTA */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <BookingButton
              ariaLabel="Записаться на занятие"
              className="group relative size-32 lg:size-36 rounded-full bg-cream text-foreground flex items-center justify-center font-serif italic text-2xl lg:text-3xl shadow-[0_30px_80px_-20px_oklch(0.2_0.02_60/0.6)] hover:bg-sand transition-all hover:scale-[1.03]"
            >
              <span className="absolute inset-2 rounded-full border border-walnut/20" />
              Запись
              <ArrowRight className="absolute bottom-6 size-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </BookingButton>
            <span className="text-[11px] tracking-[0.3em] uppercase text-sand/70">
              Первое занятие — бесплатно
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar — location + scroll hint */}
      <div className="relative z-10 px-6 lg:px-12 pb-8">
        <div className="mx-auto max-w-[1440px] flex items-end justify-between gap-6 text-sand/80">
          <div className="flex items-center gap-2.5 text-[11px] tracking-[0.25em] uppercase">
            <MapPin className="size-3.5" />
            ЖК «Счастье» · Железнодорожный
          </div>
          <div className="hidden md:flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-sand/70">
            <span className="h-px w-8 bg-sand/50" />
            Студия пилатеса · Балашиха
          </div>
          <a
            href="#about"
            className="hidden md:inline-flex flex-col items-center gap-2 text-[10px] tracking-[0.35em] uppercase hover:text-sand transition-colors"
          >
            Листать
            <ChevronDown className="size-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
