import { useState } from "react";
import { Phone, MapPin, Clock, Send, MessageCircle, Loader2, ExternalLink } from "lucide-react";
import { useBookingUrl } from "@/components/site/BookingButton";
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
      setName("");
      setPhone("");
      setQuestion("");
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
      <div className="absolute inset-0 pattern-floral opacity-[0.12]" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="max-w-2xl">
          <span className="eyebrow eyebrow-light">Контакты и запись</span>
          <h2 className="mt-6 text-5xl md:text-6xl lg:text-7xl text-sand">
            Запишитесь
            <br />
            <span className="italic font-light text-sand/90">прямо сейчас</span>
          </h2>
          <p className="mt-6 text-sand/75 leading-relaxed">
            Выберите занятие или абонемент в виджете ниже — запись и оплата проходят онлайн.
            Запись на индивидуальные тренировки производится через администратора и форму на сайте.
          </p>
        </div>

        {/* YClients widget */}
        <div className="mt-12 rounded-3xl overflow-hidden border border-sand/15 bg-cream shadow-2xl">
          <div className="flex items-center justify-between px-5 py-3 bg-sand text-foreground border-b border-border/60">
            <div className="text-[11px] uppercase tracking-[0.22em] text-walnut">
              Онлайн-запись и абонементы
            </div>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-olive hover:text-olive transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="size-3.5" /> Открыть в новой вкладке
            </a>
          </div>
          <iframe
            src={bookingUrl}
            title="Онлайн-запись YClients"
            className="w-full border-0 bg-cream"
            style={{ height: "min(80vh, 900px)" }}
            allow="payment; clipboard-write; geolocation"
          />
        </div>

        {/* Info + form */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-sand">Как нас найти</h3>
            <div className="mt-8 space-y-7">
              {[
                {
                  icon: <MapPin className="size-5" />,
                  label: "Адрес",
                  value: "Балашиха, мкр. Железнодорожный,\nул. Автозаводская, д. 5",
                },
                {
                  icon: <Clock className="size-5" />,
                  label: "Режим работы",
                  value: "Ежедневно с 09:00 до 21:00\nБез выходных",
                },
                {
                  icon: <Phone className="size-5" />,
                  label: "Телефон",
                  value: "+7 (915) 027-85-83",
                  href: "tel:+79150278583",
                },
              ].map((it) => (
                <div key={it.label} className="flex items-start gap-5">
                  <span className="size-12 shrink-0 rounded-2xl bg-sand/10 border border-sand/15 flex items-center justify-center text-sand">
                    {it.icon}
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-sand/60">{it.label}</div>
                    {it.href ? (
                      <a href={it.href} className="mt-1 block whitespace-pre-line text-sand hover:text-sand/80 transition-colors">{it.value}</a>
                    ) : (
                      <div className="mt-1 whitespace-pre-line text-sand/90">{it.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://wa.me/79150278583"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-sand/20 hover:bg-sand hover:text-foreground transition-colors text-sm"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <a
                href="https://t.me/+79150278583"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-sand/20 hover:bg-sand hover:text-foreground transition-colors text-sm"
              >
                <MessageCircle className="size-4" /> Telegram
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl bg-sand text-foreground p-8 lg:p-10 self-start">
            <h3 className="font-serif text-3xl">Остались вопросы?</h3>
            <p className="mt-3 text-sm text-foreground/65 leading-relaxed">
              Оставьте заявку, и мы свяжемся с вами, чтобы проконсультировать
              и подобрать удобное время и формат занятий.
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
    </section>
  );
}
