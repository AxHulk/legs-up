import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, CalendarDays, Sparkles } from "lucide-react";
import { BookingDialog, useBookingUrl } from "@/components/site/BookingButton";

const SUBSCRIPTIONS_URL = "https://o18441.yclients.com/subscriptions";

const singles = [
  { name: "Группа", price: "1 200 ₽" },
  { name: "Группа реформер", price: "2 100 ₽" },
  { name: "Персональное занятие", price: "3 100 ₽" },
  { name: "Занятие вдвоём (сплит)", price: "4 200 ₽" },
];

const trials = [
  { name: "Пробное занятие в группе", price: "650 ₽" },
  { name: "Пробное занятие группа реформер", price: "1 000 ₽" },
];

const packs = [
  {
    kicker: "Групповые занятия",
    title: "4 занятия",
    term: "4 недели",
    price: "3 800 ₽",
    per: "950 ₽ за занятие",
  },
  {
    kicker: "Групповые занятия",
    title: "8 занятий",
    term: "8 недель",
    price: "7 200 ₽",
    per: "900 ₽ за занятие",
  },
  {
    kicker: "Групповые занятия",
    title: "12 занятий",
    term: "8 недель",
    price: "10 200 ₽",
    per: "850 ₽ за занятие",
  },
  {
    kicker: "Групповые реформер",
    title: "4 занятия",
    term: "4 недели",
    price: "7 600 ₽",
    per: "1 900 ₽ за занятие",
  },
  {
    kicker: "Групповые реформер",
    title: "8 занятий",
    term: "8 недель",
    price: "14 400 ₽",
    per: "1 800 ₽ за занятие",
    featured: true,
  },
  {
    kicker: "Групповые реформер",
    title: "12 занятий",
    term: "8 недель",
    price: "20 400 ₽",
    per: "1 700 ₽ за занятие",
  },
  {
    kicker: "Персональные",
    title: "4 занятия",
    term: "4 недели",
    price: "11 600 ₽",
    per: "2 900 ₽ за занятие",
  },
  {
    kicker: "Персональные",
    title: "8 занятий",
    term: "8 недель",
    price: "22 400 ₽",
    per: "2 800 ₽ за занятие",
  },
  {
    kicker: "Персональные",
    title: "12 занятий",
    term: "8 недель",
    price: "31 200 ₽",
    per: "2 600 ₽ за занятие",
  },
];

export function Memberships() {
  const bookingUrl = useBookingUrl();
  const [modal, setModal] = useState<null | "booking" | "subscriptions">(null);

  return (
    <section id="memberships" className="py-28 lg:py-36 bg-cream">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-20">
          <div>
            <span className="eyebrow">Абонементы и прайс</span>
            <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
              Стоимость
              <br />
              <span className="italic-accent">занятий</span>
            </h2>
          </div>
          <p className="max-w-md text-foreground/70 leading-relaxed">
            Абонемент выгоднее разовых визитов: чем больше занятий, тем ниже цена одного.
            Оплата онлайн — картой, через виджет покупки абонементов.
          </p>
        </div>

        {/* Пробные занятия */}
        <div className="mb-10 rounded-3xl bg-olive text-sand p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-sand/70">
              Первый визит
            </div>
            <h3 className="mt-3 font-serif text-3xl">Пробное занятие</h3>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {trials.map((t) => (
                <div key={t.name}>
                  <div className="text-sm text-sand/80">{t.name}</div>
                  <div className="font-serif text-3xl">{t.price}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-sand/70 max-w-md">
              Пробные занятия только групповые. Персональных пробных тренировок нет.
              Пробные не переносятся и не возвращаются.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModal("booking")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sand text-olive px-7 py-4 text-[13px] uppercase tracking-[0.16em] hover:bg-sand/90 transition-colors whitespace-nowrap"
          >
            <Sparkles className="size-4" /> Попробовать — онлайн-запись
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map((p) => (
            <article
              key={p.kicker + p.title}
              className={`rounded-3xl border p-8 flex flex-col ${
                p.featured
                  ? "bg-olive text-sand border-olive"
                  : "bg-sand border-border/60"
              }`}
            >
              <div
                className={`text-[10px] uppercase tracking-[0.22em] ${
                  p.featured ? "text-sand/70" : "text-walnut"
                }`}
              >
                {p.kicker}
              </div>
              <h3 className="mt-4 font-serif text-3xl">{p.title}</h3>
              <div className={`mt-1 text-sm ${p.featured ? "text-sand/75" : "text-foreground/60"}`}>
                срок действия — {p.term}
              </div>
              <div className="mt-7 font-serif text-4xl">{p.price}</div>
              <div className={`mt-1 text-sm ${p.featured ? "text-sand/75" : "text-foreground/60"}`}>
                {p.per}
              </div>
              <button
                type="button"
                onClick={() => setModal("subscriptions")}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] uppercase tracking-[0.16em] transition-colors ${
                  p.featured
                    ? "bg-sand text-olive hover:bg-sand/90"
                    : "bg-olive text-sand hover:bg-olive-deep"
                }`}
              >
                <CreditCard className="size-4" /> Купить абонемент
              </button>
            </article>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.2fr_1fr] gap-6">
          <div className="rounded-3xl bg-sand border border-border/60 p-8 lg:p-10">
            <h3 className="font-serif text-3xl">Разовые занятия</h3>
            <p className="mt-3 text-sm text-foreground/65">
              Оплата за одно посещение — без абонемента.
            </p>
            <ul className="mt-7 divide-y divide-border/50">
              {singles.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-6 py-3">
                  <span className="text-sm text-foreground/80">{s.name}</span>
                  <span className="font-serif text-lg whitespace-nowrap">{s.price}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/ceny"
              className="mt-7 inline-block text-sm text-olive underline underline-offset-4"
            >
              Полный прейскурант →
            </Link>
          </div>

          <div className="rounded-3xl bg-olive/10 border border-border/60 p-8 lg:p-10 flex flex-col justify-center">
            <h3 className="font-serif text-3xl">Условия</h3>
            <ul className="mt-6 space-y-2.5 text-sm text-foreground/75 list-disc pl-5">
              <li>Отмена без списания — за 8 часов до начала занятия.</li>
              <li>
                При покупке от 8 тренировок 1 раз за абонемент можно перенести или отменить
                занятие через администратора: группы — за 3 часа (если останется ≥3 чел),
                реформер — за 4 часа (если останется ≥2 чел), персональная — за 5 часов.
              </li>
              <li>Заморозки нет. Пробные не переносятся и не возвращаются.</li>
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setModal("subscriptions")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-olive text-sand px-6 py-3.5 text-[13px] uppercase tracking-[0.16em] hover:bg-olive-deep transition-colors"
              >
                <CreditCard className="size-4" /> Купить абонемент
              </button>
              <button
                type="button"
                onClick={() => setModal("booking")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-olive/40 px-6 py-3.5 text-[13px] uppercase tracking-[0.16em] text-olive hover:bg-olive hover:text-sand transition-colors"
              >
                <CalendarDays className="size-4" /> Смотреть расписание
              </button>
            </div>
            <p className="mt-5 text-xs text-foreground/55">
              Абонемент именной. Условия — в{" "}
              <Link to="/offer" className="underline underline-offset-4">
                публичной оферте
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {modal && (
        <BookingDialog
          url={modal === "subscriptions" ? SUBSCRIPTIONS_URL : bookingUrl}
          title={modal === "subscriptions" ? "Покупка абонемента" : "Расписание и онлайн-запись"}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}
