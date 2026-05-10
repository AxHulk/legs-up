import { useState } from "react";
import { Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import iconHeart from "@/assets/icons/icon_heart.png";

// Format an arbitrary digit string into a Russian phone mask:
// "+7 (XXX) XXX-XX-XX". The input is always normalized so it
// starts with "7" and is at most 11 digits long.
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

// Strip everything but digits and normalize so the resulting
// string represents a Russian number (starts with "7").
function normalizeDigits(value: string) {
  let d = value.replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  return d.slice(0, 11);
}

export function Contacts() {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    const prevDigits = phone.replace(/\D/g, "");
    let nextDigits = next.replace(/\D/g, "");

    // If the user deleted a character but the digit count did not
    // change, they just removed a separator — drop the last digit
    // so backspace/delete actually shorten the number.
    if (next.length < phone.length && nextDigits.length === prevDigits.length) {
      nextDigits = nextDigits.slice(0, -1);
    }

    setPhone(formatRussianPhone(normalizeDigits(nextDigits)));
  };

  const handlePhoneFocus = () => {
    if (!phone) setPhone("+7 ");
  };

  const handlePhoneBlur = () => {
    if (phone === "+7" || phone === "+7 ") setPhone("");
  };

  return (
    <section id="contacts" className="py-28 lg:py-36 bg-foreground text-sand relative overflow-hidden">
      <div className="absolute inset-0 pattern-floral opacity-[0.15]" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-2 gap-14 lg:gap-20">
        <div>
          <span className="eyebrow eyebrow-light">Контакты</span>
          <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl text-sand">
            Запишитесь
            <br />
            <span className="italic font-light text-sand/90">прямо сейчас</span>
          </h2>
          <p className="mt-7 max-w-md text-sand/75 leading-relaxed">
            Первое занятие — бесплатно. Оставьте заявку, и мы свяжемся с вами
            в течение часа, чтобы подобрать удобное время.
          </p>

          <div className="mt-12 space-y-7">
            {[
              { icon: <Phone className="size-5" />, label: "Телефон", value: "+7 (915) 027-85-83", href: "tel:+79150278583" },
              { icon: <MapPin className="size-5" />, label: "Адрес", value: "ЖК «Счастье», ул. Автозаводская, 5\nБалашиха, мкр. Железнодорожный, 2 этаж" },
              { icon: <Clock className="size-5" />, label: "Режим работы", value: "Пн–Пт: 08:00 — 21:00\nСб–Вс: 09:00 — 18:00" },
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
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-sand/20 hover:bg-sand hover:text-foreground transition-colors text-sm">
              <MessageCircle className="size-4" /> WhatsApp
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-sand/20 hover:bg-sand hover:text-foreground transition-colors text-sm">
              <MessageCircle className="size-4" /> Telegram
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl bg-sand text-foreground p-8 lg:p-10 self-start"
        >
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-olive/10 flex items-center justify-center">
              <img src={iconHeart} alt="" className="size-9 object-contain" />
            </div>
            <div>
              <h3 className="font-serif text-3xl">Записаться на занятие</h3>
              <p className="text-sm text-foreground/60 mt-1">Первое пробное — бесплатно</p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <Field label="Ваше имя" name="name" placeholder="Как вас зовут?" required />
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-walnut">Телефон</label>
              <input
                type="tel"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 (___) ___-__-__"
                required
                value={phone}
                onChange={handlePhoneChange}
                onFocus={handlePhoneFocus}
                onBlur={handlePhoneBlur}
                maxLength={18}
                className="mt-2 w-full bg-cream border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/40 placeholder:text-foreground/40"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-walnut">Направление</label>
              <select className="mt-2 w-full bg-cream border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/40">
                <option>Выберите направление</option>
                <option>Пилатес — для начинающих</option>
                <option>Пилатес — продвинутый</option>
                <option>Индивидуальные занятия</option>
                <option>Растяжка / гамаки</option>
                <option>Йога / здоровая спина</option>
              </select>
            </div>
            <Field label="Удобное время" name="time" placeholder="Когда вам удобно?" />
          </div>

          <button type="submit" className="btn-primary w-full mt-8">
            {sent ? "Заявка отправлена ✓" : (<>Отправить заявку <Send className="size-4" /></>)}
          </button>

          <p className="mt-5 text-xs text-foreground/55 text-center leading-relaxed">
            Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, placeholder, required, type = "text" }: { label: string; name: string; placeholder: string; required?: boolean; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-walnut">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full bg-cream border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/40 placeholder:text-foreground/40"
      />
    </div>
  );
}
