import { useState } from "react";

const filters = ["Все", "Реформер", "Растяжка", "Йога", "Спина"];

const schedule = [
  { day: "ПН", date: "12", time: "09:00", title: "Пилатес на реформерах", coach: "Жанна К.", cat: "Реформер", spots: "Есть места" },
  { day: "ПН", date: "12", time: "19:30", title: "Здоровая спина", coach: "Анна С.", cat: "Спина", spots: "Мало мест" },
  { day: "ВТ", date: "13", time: "10:30", title: "Растяжка в гамаках", coach: "Наталья Р.", cat: "Растяжка", spots: "Есть места" },
  { day: "ВТ", date: "13", time: "18:00", title: "Хатха йога", coach: "Ольга К.", cat: "Йога", spots: "Есть места" },
  { day: "СР", date: "14", time: "09:00", title: "Пилатес · продвинутый", coach: "Жанна К.", cat: "Реформер", spots: "1 место" },
  { day: "ЧТ", date: "15", time: "20:00", title: "Воздушные гамаки", coach: "Наталья Р.", cat: "Растяжка", spots: "Есть места" },
];

export function Schedule() {
  const [active, setActive] = useState("Все");
  const list = active === "Все" ? schedule : schedule.filter((s) => s.cat === active);

  return (
    <section id="schedule" className="py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Schedule */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">Расписание</span>
            <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
              Занятия <span className="italic-accent">каждый день</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] border transition-colors ${
                  active === f
                    ? "bg-olive text-sand border-olive"
                    : "bg-transparent border-border text-foreground/70 hover:border-olive/50 hover:text-olive"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-cream border border-border/60 overflow-hidden">
          {list.map((s, i) => (
            <div
              key={`${s.day}-${s.time}-${s.title}`}
              className={`grid grid-cols-12 gap-4 items-center px-5 lg:px-8 py-5 ${
                i !== list.length - 1 ? "border-b border-border/60" : ""
              } hover:bg-sand/60 transition-colors`}
            >
              <div className="col-span-3 lg:col-span-2 flex items-baseline gap-3">
                <span className="font-serif text-3xl text-olive">{s.date}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-walnut">{s.day}</span>
              </div>
              <div className="col-span-3 lg:col-span-2 font-serif text-xl">{s.time}</div>
              <div className="col-span-12 lg:col-span-4 order-last lg:order-none mt-2 lg:mt-0">
                <div className="font-medium">{s.title}</div>
                <div className="text-xs text-foreground/60 mt-0.5">{s.coach}</div>
              </div>
              <div className="col-span-4 lg:col-span-2 hidden lg:block">
                <span className="text-[11px] uppercase tracking-[0.2em] text-walnut">{s.cat}</span>
              </div>
              <div className="col-span-6 lg:col-span-2 flex justify-end">
                <a
                  href="#contacts"
                  className={`text-xs px-4 py-2 rounded-full transition-colors ${
                    s.spots.includes("Мало") || s.spots.includes("место")
                      ? "bg-walnut/15 text-walnut hover:bg-walnut hover:text-sand"
                      : "bg-olive/10 text-olive hover:bg-olive hover:text-sand"
                  }`}
                >
                  {s.spots}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
