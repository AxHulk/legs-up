import heroBg from "@/assets/hero_bg.jpg";
import beginners from "@/assets/card_beginners.jpg";
import advanced from "@/assets/card_advanced.jpg";
import privateImg from "@/assets/card_private.jpg";

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
            Светлый зал с большими окнами, оливковые реформеры, цветочные
            фрески, деревянный пол ёлочкой и уютные зоны отдыха.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          <div className="col-span-12 lg:col-span-8 row-span-2">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
              <img src={heroBg} alt="Зал студии" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
          <div className="col-span-6 lg:col-span-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img src={beginners} alt="Тренировка" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
          <div className="col-span-6 lg:col-span-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img src={privateImg} alt="Персональная тренировка" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
              <img src={advanced} alt="Продвинутый уровень" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 rounded-3xl bg-olive text-sand p-10 lg:p-14 flex flex-col justify-center">
            <div className="font-serif italic text-3xl lg:text-4xl leading-tight">
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
