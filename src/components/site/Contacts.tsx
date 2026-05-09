import { useState } from "react";
import { Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import iconHeart from "@/assets/icons/icon_heart.png";

export function Contacts() {
  const [sent, setSent] = useState(false);

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
            <Field label="Телефон" name="phone" placeholder="+7 (___) ___-__-__" required type="tel" />
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
