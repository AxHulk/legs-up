import { useState } from "react";
import { Phone, MapPin, Clock, Send, Loader2, ArrowUpRight, CalendarPlus, Ticket, MessageCircle } from "lucide-react";
import { BookingDialog, useBookingUrl } from "@/components/site/BookingButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function formatRussianPhone(digits: string) {
  if (!digits) return "";
  const d = digits;
  let out = "+7";
  if (d.length > 1) out += " (" + d.slice(1, 4);
  if (d.length >= 5) out += ") " + d.slice(4, 7);
  else if (d.length >= 4) out += ")";
  if (d.length >= 8) out += "-" + d.slice(7, 9);
  if (d.length >= 10) out += "-" + d.slice(9, 11);
  return out;
}

function normalizeDigits(value: string) {
  let d = value.replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  return d.slice(0, 11);
}

export function Contacts() {
  const bookingUrl = useBookingUrl();
  const [modal, setModal] = useState<null | "booking" | "subscriptions">(null);
  const SUBSCRIPTIONS_URL = "https://o18441.yclients.com/subscriptions";

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    const prevDigits = phone.replace(/\D/g, "");
    let nextDigits = next.replace(/\D/g, "");
    if (next.length < phone.length && nextDigits.length === prevDigits.length) {
      nextDigits = nextDigits.slice(0, -1);
    }
    setPhone(formatRussianPhone(normalizeDigits(nextDigits)));
  };
  const handlePhoneFocus = () => { if (!phone) setPhone("+7 "); };
  const handlePhoneBlur = () => { if (phone === "+7" || phone === "+7 ") setPhone(""); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 11) {
      toast.error("Пожалуйста, укажите телефон полностью");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("bookings").insert({
        customer_name: name,
        customer_phone: `+${digits}`,
        note: question ? `Вопрос: ${question}` : "",
        source: "site",
        status: "pending",
      });
      if (error) throw error;
      setSent(true);
      setName(""); setPhone(""); setQuestion("");
      toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
    } catch (err) {
      console.error(err);
      toast.error("Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="scroll-mt-24 py-24 lg:py-32 bg-foreground text-sand relative overflow-hidden">
      <div className="absolute inset-0 pattern-floral opacity-[0.10]" />
      <div className="absolute -top-40 -right-40 size-[480px] rounded-full bg-olive/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 size-[480px] rounded-full bg-sand/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="eyebrow eyebrow-light">Контакты и запись</span>
          <h2 className="mt-6 text-5xl md:text-6xl lg:text-7xl text-sand">
            Запишитесь
            <br />
            <span className="italic font-light text-sand/90">прямо сейчас</span>
          </h2>
        </div>

        {/* Two big CTA cards — open YClients widget in modal */}
        <div className="mt-14 grid md:grid-cols-2 gap-5 lg:gap-6">
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="group relative overflow-hidden rounded-3xl bg-sand text-foreground p-8 lg:p-10 text-left transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-olive/15 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
            <div className="relative flex items-start justify-between gap-6">
              <div className="size-14 rounded-2xl bg-olive/15 text-olive flex items-center justify-center">
                <CalendarPlus className="size-7" />
              </div>
              <ArrowUpRight className="size-6 text-walnut transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <h3 className="relative mt-8 font-serif text-3xl lg:text-4xl">Записаться<br />на занятие</h3>
            <p className="relative mt-3 text-sm text-foreground/65 leading-relaxed max-w-sm">
              Выберите направление, инструктора и удобное время — мгновенное подтверждение онлайн.
            </p>
            <div className="relative mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-walnut">
              <span className="size-1.5 rounded-full bg-olive animate-pulse" /> Запись через YClients
            </div>
          </button>

          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="group relative overflow-hidden rounded-3xl bg-olive text-sand p-8 lg:p-10 text-left transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-sand/15 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
            <div className="relative flex items-start justify-between gap-6">
              <div className="size-14 rounded-2xl bg-sand/15 text-sand flex items-center justify-center">
                <Ticket className="size-7" />
              </div>
              <ArrowUpRight className="size-6 text-sand/80 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <h3 className="relative mt-8 font-serif text-3xl lg:text-4xl">Купить<br />абонемент</h3>
            <p className="relative mt-3 text-sm text-sand/80 leading-relaxed max-w-sm">
              Пакеты занятий и индивидуальные программы — оплата картой онлайн, без визита в студию.
            </p>
            <div className="relative mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-sand/70">
              <span className="size-1.5 rounded-full bg-sand animate-pulse" /> Оплата через YClients
            </div>
          </button>
        </div>

        <p className="mt-6 text-sm text-sand/55 max-w-3xl leading-relaxed">
          Запись на индивидуальные тренировки производится через администратора и форму на сайте.
        </p>

        {/* Info + form */}
        <div className="mt-16 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14">
          {/* Studio card */}
          <div className="relative rounded-3xl bg-sand/[0.04] border border-sand/10 p-8 lg:p-10 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-3xl text-sand">Студия</h3>
              <a
                href="https://yandex.ru/maps/?text=Балашиха%20Автозаводская%205"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] uppercase tracking-[0.22em] text-sand/60 hover:text-sand inline-flex items-center gap-1.5 transition-colors"
              >
                Маршрут <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <div className="mt-8 space-y-6">
              {[
                {
                  icon: <MapPin className="size-5" />,
                  label: "Адрес",
                  value: "Балашиха, мкр. Железнодорожный,\nул. Автозаводская, д. 5",
                },
                {
                  icon: <Clock className="size-5" />,
                  label: "Режим работы",
                  value: "Ежедневно с 09:00 до 21:00 · без выходных",
                },
                {
                  icon: <Phone className="size-5" />,
                  label: "Телефон",
                  value: "+7 (915) 027-85-83",
                  href: "tel:+79150278583",
                },
              ].map((it) => (
                <div key={it.label} className="flex items-start gap-5">
                  <span className="size-11 shrink-0 rounded-2xl bg-sand/10 border border-sand/10 flex items-center justify-center text-sand">
                    {it.icon}
                  </span>
                  <div className="pt-1">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-sand/55">{it.label}</div>
                    {it.href ? (
                      <a href={it.href} className="mt-1 block whitespace-pre-line text-sand hover:text-sand/80 transition-colors">{it.value}</a>
                    ) : (
                      <div className="mt-1 whitespace-pre-line text-sand/90">{it.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-sand/10 flex flex-wrap gap-3">
              <a
                href="https://wa.me/79150278583"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sand/15 hover:bg-sand hover:text-foreground transition-colors text-sm"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <a
                href="https://t.me/+79150278583"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sand/15 hover:bg-sand hover:text-foreground transition-colors text-sm"
              >
                <MessageCircle className="size-4" /> Telegram
              </a>
            </div>

            {/* Map embed */}
            <a
              href="https://yandex.ru/maps/?text=Балашиха%20Автозаводская%205"
              target="_blank"
              rel="noreferrer"
              className="mt-8 block rounded-2xl overflow-hidden border border-sand/10 group relative"
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?text=Балашиха%20Автозаводская%205&z=16"
                className="w-full h-56 border-0 grayscale-[0.4] contrast-90 brightness-95 group-hover:grayscale-0 transition-all"
                title="Карта"
                loading="lazy"
              />
            </a>
          </div>

          {/* Question form */}
          <form onSubmit={handleSubmit} className="rounded-3xl bg-sand text-foreground p-8 lg:p-10 self-start">
            <h3 className="font-serif text-3xl lg:text-4xl">Остались вопросы?</h3>
            <p className="mt-3 text-sm text-foreground/65 leading-relaxed">
              Оставьте заявку — мы свяжемся с вами, проконсультируем и подберём
              удобное время и формат занятий.
            </p>

            <div className="mt-7 space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-walnut">Ваше имя</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder="Как вас зовут?"
                  className="mt-2 w-full bg-cream border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/40 placeholder:text-foreground/40"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-walnut">Телефон</label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  onFocus={handlePhoneFocus}
                  onBlur={handlePhoneBlur}
                  maxLength={18}
                  placeholder="+7 (___) ___-__-__"
                  className="mt-2 w-full bg-cream border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/40 placeholder:text-foreground/40"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-walnut">Вопрос (необязательно)</label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder="Что вас интересует?"
                  className="mt-2 w-full bg-cream border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/40 placeholder:text-foreground/40 resize-none"
                />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full mt-7 disabled:opacity-70">
              {submitting ? (<><Loader2 className="size-4 animate-spin" /> Отправляем…</>)
                : sent ? (<>Заявка отправлена</>)
                : (<>Отправить заявку <Send className="size-4" /></>)}
            </button>

            <p className="mt-5 text-xs text-foreground/55 text-center leading-relaxed">
              Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных
            </p>
          </form>
        </div>
      </div>

      {bookingOpen && <BookingDialog url={bookingUrl} onClose={() => setBookingOpen(false)} />}
    </section>
  );
}
