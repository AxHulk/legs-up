import { Award, Users, MapPin, Tag } from "lucide-react";

const items = [
  { icon: Award, title: "Профессионалы", desc: "Все инструкторы имеют профильное образование и регулярно повышают квалификацию." },
  { icon: Users, title: "Малые группы", desc: "Небольшие группы позволяют уделить внимание каждому и отработать технику." },
  { icon: MapPin, title: "Удобно добраться", desc: "Студия расположена в жилом комплексе — легко найти и удобно парковаться." },
  { icon: Tag, title: "Приятные цены", desc: "Гибкая система абонементов и скидки для детей и пенсионеров." },
];

export function WhyUs() {
  return (
    <section className="py-24 lg:py-32 bg-cocoa text-sand">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow !text-sand/70">Почему мы</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Что делает нас
            <br /><span className="italic-serif !text-olive-soft">особенными</span>
          </h2>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 rounded-3xl border border-sand/10 overflow-hidden">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div key={it.title} className={`p-8 lg:p-10 ${i !== items.length - 1 ? "lg:border-r border-sand/10" : ""} ${i < 2 ? "sm:border-b lg:border-b-0 border-sand/10" : ""} ${i % 2 === 0 ? "sm:border-r border-sand/10" : ""} `}>
                <div className="size-12 rounded-xl bg-olive/25 flex items-center justify-center">
                  <Icon className="size-6 text-olive-soft" />
                </div>
                <h3 className="mt-6 font-serif text-2xl">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand/70">{it.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
