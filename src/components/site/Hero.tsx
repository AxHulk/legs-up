import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 lg:pt-40 pb-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="eyebrow">Балашиха · Железнодорожный</span>
          <h1 className="mt-8 font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-foreground">
            Почувствуй
            <br />
            <span className="italic-serif">гармонию</span>
            <br />
            с телом
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Студия пилатеса на реформерах — место, где вы найдёте баланс, силу и красоту.
            Профессиональные инструкторы, современное оборудование и уютная атмосфера.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#contacts" className="btn-primary">Записаться на пробное</a>
            <a href="#directions" className="btn-ghost-link">
              Наши направления <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-md border-t border-border pt-8">
            <div>
              <div className="font-serif text-3xl text-olive">8+</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">направлений</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-olive">5</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">инструкторов</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-olive">200+</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">довольных клиентов</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[5/6] rounded-3xl bg-olive overflow-hidden">
            <ReformerIllustration />
            <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-72 rounded-2xl bg-sand/95 backdrop-blur p-5 shadow-xl">
              <div className="text-[11px] uppercase tracking-[0.2em] text-walnut">Первое занятие</div>
              <div className="font-serif text-3xl text-olive mt-1">Бесплатно</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReformerIllustration() {
  return (
    <svg viewBox="0 0 600 720" className="absolute inset-0 w-full h-full" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.62 0.08 120)" stopOpacity="0.45" />
          <stop offset="1" stopColor="oklch(0.62 0.08 120)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <circle cx="470" cy="240" r="120" fill="url(#g1)" />
      <circle cx="120" cy="540" r="90" fill="url(#g1)" />
      {/* reformer */}
      <g transform="translate(60 380)" fill="oklch(0.78 0.05 120)" opacity="0.85">
        <rect x="0" y="80" width="480" height="40" rx="10" />
        <rect x="20" y="60" width="440" height="20" rx="6" opacity="0.7" />
        <circle cx="40" cy="140" r="22" />
        <circle cx="440" cy="140" r="22" />
        <rect x="380" y="50" width="80" height="60" rx="8" opacity="0.85" />
        {/* figure */}
        <g transform="translate(140 -10)" fill="oklch(0.85 0.04 120)">
          <circle cx="40" cy="20" r="22" />
          <path d="M30 45 Q60 80 110 70 L 220 60 Q 240 60 240 75 L 240 90 Q 240 100 220 100 L 110 110 Q 60 120 30 100 Z" />
          <rect x="10" y="60" width="40" height="80" rx="14" />
        </g>
      </g>
    </svg>
  );
}
