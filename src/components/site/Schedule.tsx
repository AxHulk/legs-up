import { Phone } from "lucide-react";

const classes = [
  { title: "Пилатес на реформерах", time: "Пн, Ср, Пт · 09:00 — 10:00", status: "Есть места" },
  { title: "Растяжка в гамаках", time: "Вт, Чт · 18:00 — 19:00", status: "Есть места" },
  { title: "Здоровая спина", time: "Пн, Ср · 19:30 — 20:30", status: "Мало мест" },
  { title: "Хатха йога", time: "Сб, Вс · 10:00 — 11:30", status: "Есть места" },
];

export function Schedule() {
  return (
    <section className="py-24 lg:py-32 bg-olive text-sand">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="eyebrow !text-sand/70">Расписание</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Занятия <span className="italic-serif !text-sand/90">каждый день</span>
          </h2>
          <p className="mt-6 max-w-md text-sand/80">
            Удобное расписание утренних и вечерних групп. Запишитесь через мессенджер или позвоните нам.
          </p>
          <a
            href="tel:+79150278583"
            className="mt-8 inline-flex items-center gap-3 bg-sand text-olive px-6 py-3.5 rounded-full font-medium hover:bg-sand/90 transition-colors"
          >
            <Phone className="size-4" /> +7 (915) 027-85-83
          </a>
        </div>

        <div className="space-y-3">
          {classes.map((c) => (
            <div key={c.title} className="rounded-2xl bg-sand/[0.06] backdrop-blur border border-sand/15 p-5 flex items-center justify-between gap-4 hover:bg-sand/10 transition-colors">
              <div>
                <div className="font-serif text-xl">{c.title}</div>
                <div className="text-sm text-sand/70 mt-1">{c.time}</div>
              </div>
              <span className={`shrink-0 text-xs px-3 py-1.5 rounded-full ${c.status === "Мало мест" ? "bg-walnut/40 text-sand" : "bg-sand/15 text-sand"}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
