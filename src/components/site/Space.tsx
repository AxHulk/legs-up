import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BookingButton } from "./BookingButton";
import slide1 from "@/assets/space/slide-1.jpg";
import slide2 from "@/assets/space/slide-2.jpg";
import slide3 from "@/assets/space/slide-3.jpg";
import slide4 from "@/assets/space/slide-4.jpg";
import slide5 from "@/assets/space/slide-5.jpg";
import slide6 from "@/assets/space/slide-6.jpg";

const slides = [
  { src: slide1, alt: "Тренировка с роллом на коврике" },
  { src: slide2, alt: "Растяжка на TRX в зеркальном зале" },
  { src: slide3, alt: "Прогиб в пилатесе под неоновой вывеской НОГИ ВВЕРХ" },
  { src: slide4, alt: "Индивидуальное занятие пилатесом с мячом" },
  { src: slide5, alt: "Групповое занятие на реформерах" },
  { src: slide6, alt: "Йога в воздушных гамаках" },
];

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
            Два зала с большими зеркалами и кондиционерами. Один зал выделен для занятий пилатесом на реформерах, второй зал оснащён всем необходимым оборудованием для проведения групповых занятий. Много тёплого света для релаксации и погружения в атмосферу гармонии с телом.
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

        {/* Horizontal photo slider */}
        <Carousel opts={{ align: "start", loop: true }} className="mb-8">
          <CarouselContent className="-ml-4">
            {slides.map((s, i) => (
              <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <figure className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_oklch(0.3_0.04_60/0.45)]">
                  <img src={s.src} alt={s.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        {/* Message tile */}
        <div className="rounded-3xl bg-olive text-sand p-10 lg:p-14 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="font-serif italic text-3xl lg:text-4xl leading-tight">
              Тело мечты стало ближе!
            </div>
            <p className="mt-6 text-sand/85 leading-relaxed text-lg">
              «Ноги вверх» — это студия рядом с домом. Больше не надо тратить время на дорогу, очереди в раздевалках, а главное — не нужно покупать абонемент, чтобы просто войти в зал! Достаточно оплатить только те тренировки, которые вас интересуют.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <BookingButton className="inline-flex items-center justify-center rounded-full bg-sand text-olive px-8 py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-sand/90 transition-colors">
              Записаться
            </BookingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
