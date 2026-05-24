import { lazy, Suspense } from "react";
import groupClass from "@/assets/space/group-class.jpg";
import hammock from "@/assets/space/hammock.jpg";
import neon from "@/assets/space/neon.jpg";
import arches from "@/assets/space/arches.jpg";

const RotatingModel = lazy(() =>
  import("./RotatingModel").then((m) => ({ default: m.RotatingModel })),
);

export function Space() {
  return (
    <section className="py-28 lg:py-36 bg-cream">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-7">
            <span className="eyebrow">Пространство</span>
            <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
              Эстетика, в которой
              <br />хочется <span className="italic-accent">оставаться</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-foreground/70 leading-relaxed self-end">
            Зеркальные арки с тёплой подсветкой, оливковые реформеры, неоновая
            вывеска, паркет ёлочкой и уютные зоны отдыха.
          </p>
        </div>

        {/* Cinematic studio reel */}
        <figure className="relative rounded-3xl overflow-hidden shadow-[0_40px_100px_-50px_oklch(0.3_0.04_60/0.55)] mb-6 lg:mb-8">
          <video
            className="block w-full h-auto aspect-video object-cover"
            src="/space/studio.mp4"
            poster="/space/studio-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-3xl" />
        </figure>

        {/* Mosaic — supporting photos */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <figure className="col-span-12 md:col-span-7 rotate-[-0.6deg]">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_oklch(0.3_0.04_60/0.45)]">
              <img src={arches} alt="Зеркальные арки с тёплой подсветкой и реформеры" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </figure>

          <figure className="col-span-12 md:col-span-5 md:mt-10 rotate-[1deg]">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_oklch(0.3_0.04_60/0.45)]">
              <img src={hammock} alt="Йога в гамаках в студии" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </figure>

          <figure className="col-span-12 md:col-span-5 md:-mt-6 rotate-[1.2deg]">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_oklch(0.3_0.04_60/0.45)]">
              <img src={neon} alt="Неоновая вывеска НОГИ ВВЕРХ и растяжка" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </figure>

          <figure className="col-span-12 md:col-span-7 rotate-[-0.8deg]">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_oklch(0.3_0.04_60/0.45)]">
              <img src={groupClass} alt="Групповое занятие пилатес на реформерах" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </figure>

          {/* Quote tile */}
          <div className="col-span-12 mt-4 rounded-3xl bg-olive text-sand p-10 lg:p-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="font-serif italic text-3xl lg:text-4xl leading-tight">
                «Расслабиться, почувствовать гармонию со своим телом и подарить себе красивое и здоровое тело»
              </div>
              <div className="mt-6 text-[11px] uppercase tracking-[0.25em] text-sand/70">
                Философия студии «НОГИ ВВЕРХ»
              </div>
            </div>
            <div className="lg:col-span-4 h-64 lg:h-80">
              <Suspense fallback={null}>
                <RotatingModel />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
