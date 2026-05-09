import { lazy, Suspense } from "react";
import studio1 from "@/assets/space/studio_1.jpg";
import studio2 from "@/assets/space/studio_2.jpg";
import beginners from "@/assets/card_beginners.jpg";
import privateImg from "@/assets/card_private.jpg";

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
            Зеркальные арки с тёплой подсветкой, оливковые реформеры, цветочные
            фрески, паркет ёлочкой и уютные зоны отдыха.
          </p>
        </div>

        {/* Mosaic — like a photo collage */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Top-left: large landscape */}
          <figure className="col-span-12 md:col-span-7 rotate-[-1deg]">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_oklch(0.3_0.04_60/0.45)]">
              <img src={studio1} alt="Зеркальный зал с арками и тёплой подсветкой" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </figure>

          {/* Top-right: tall */}
          <figure className="col-span-12 md:col-span-5 md:mt-10 rotate-[1.2deg]">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_oklch(0.3_0.04_60/0.45)]">
              <img src={privateImg} alt="Пилатес на реформере у окна" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </figure>

          {/* Bottom-left: square-ish */}
          <figure className="col-span-12 md:col-span-5 md:-mt-6 rotate-[1.5deg]">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_oklch(0.3_0.04_60/0.45)]">
              <img src={beginners} alt="Тренировка с инструктором на реформере" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </figure>

          {/* Bottom-right: large landscape */}
          <figure className="col-span-12 md:col-span-7 rotate-[-0.8deg]">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_oklch(0.3_0.04_60/0.45)]">
              <img src={studio2} alt="Групповое занятие пилатес на реформерах" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </figure>

          {/* Quote tile */}
          <div className="col-span-12 mt-4 rounded-3xl bg-olive text-sand p-10 lg:p-14 flex flex-col justify-center">
            <div className="font-serif italic text-3xl lg:text-4xl leading-tight max-w-3xl">
              «Расслабиться, почувствовать гармонию со своим телом и подарить себе красивое и здоровое тело»
            </div>
            <div className="mt-6 text-[11px] uppercase tracking-[0.25em] text-sand/70">
              Философия студии «НОГИ ВВЕРХ»
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
