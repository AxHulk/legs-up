import { useState } from "react";
import { Phone, MapPin, Clock } from "lucide-react";

export function Contacts() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contacts" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-2 gap-14 lg:gap-20">
        <div>
          <span className="eyebrow">Контакты</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Запишитесь
            <br /><span className="italic-serif">прямо сейчас</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Первое занятие — бесплатно. Оставьте заявку, и мы свяжемся с вами в течение часа.
          </p>

          <div className="mt-10 space-y-6">
            {[
              { icon: Phone, label: "Телефон", value: "+7 (915) 027-85-83" },
              { icon: MapPin, label: "Адрес", value: "Балашиха, мкр. Железнодорожный\nАвтозаводская ул., дом 5, 2 этаж" },
              { icon: Clock, label: "Режим работы", value: "Пн–Пт: 08:00 — 21:00\nСб–Вс: 09:00 — 18:00" },
            ].map((it) => {
              const Icon = it.icon;
              return (
                <div key={it.label} className="flex items-start gap-4">
                  <span className="size-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-olive" />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-walnut">{it.label}</div>
                    <div className="mt-1 whitespace-pre-line text-foreground">{it.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl bg-secondary p-8 lg:p-10"
        >
          <h3 className="font-serif text-3xl">Записаться на занятие</h3>
          <p className="mt-2 text-sm text-muted-foreground">Первое пробное занятие — бесплатно</p>

          <div className="mt-8 space-y-5">
            <Field label="Ваше имя" name="name" placeholder="Как вас зовут?" required />
            <Field label="Телефон" name="phone" placeholder="+7 (___) ___-__-__" required />
            <div>
              <label className="text-[11px] uppercase tracking-[0.2em] text-walnut">Направление</label>
              <select className="mt-2 w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/40">
                <option>Выберите направление</option>
                <option>Пилатес на реформерах</option>
                <option>Растяжка и гамаки</option>
                <option>Функциональный тренинг</option>
                <option>Здоровая спина</option>
                <option>Full Body</option>
                <option>Хатха йога</option>
              </select>
            </div>
            <Field label="Удобное время" name="time" placeholder="Когда вам удобно?" />
          </div>

          <button type="submit" className="btn-primary w-full mt-8 !py-4">
            {sent ? "Заявка отправлена ✓" : "Отправить заявку"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, placeholder, required }: { label: string; name: string; placeholder: string; required?: boolean }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.2em] text-walnut">{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/40"
      />
    </div>
  );
}
