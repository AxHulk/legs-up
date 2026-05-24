import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import iconCertificate from "@/assets/icons/icon_certificate.png";
import { supabase } from "@/integrations/supabase/client";

type Instructor = {
  id: string;
  name: string;
  role: string;
  years: string;
  short_desc: string;
  bio: string;
  photos: string[];
};

export function Team() {
  const [active, setActive] = useState<Instructor | null>(null);

  const { data: team = [] } = useQuery({
    queryKey: ["public-instructors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("instructors")
        .select("id,name,role,years,short_desc,bio,photos")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Instructor[];
    },
  });

  if (team.length === 0) return null;

  return (
    <section id="team" className="py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-20">
          <div className="lg:col-span-7">
            <span className="eyebrow">Команда</span>
            <h2 className="mt-7 text-5xl md:text-6xl lg:text-7xl">
              Наши <span className="italic-accent">инструкторы</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-foreground/70 leading-relaxed">
            Сертифицированные специалисты с бережным подходом — от первой
            тренировки до сложных индивидуальных программ.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-12 md:gap-x-6 lg:gap-x-2">
          {team.map((m) => (
            <InstructorCard key={m.id} m={m} onOpen={() => setActive(m)} />
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setActive(null)}
        >
          <div
            className="relative bg-cream rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Закрыть"
              className="absolute top-4 right-4 z-10 size-10 rounded-full bg-sand hover:bg-olive hover:text-sand transition-colors flex items-center justify-center"
            >
              <X className="size-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-6 md:p-10 flex items-center justify-center bg-sand/40">
                <div className="w-full max-w-sm">
                  <OvalFrame
                    photo={active.photos[0]}
                    name={active.name}
                    role={active.role}
                    large
                  />
                </div>
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <span className="eyebrow">{active.role}</span>
                <h3 className="mt-5 font-serif text-4xl md:text-5xl leading-tight">{active.name}</h3>
                {active.years && (
                  <div className="mt-3 text-xs uppercase tracking-[0.22em] text-walnut">
                    Опыт {active.years}
                  </div>
                )}
                <p className="mt-6 text-foreground/75 leading-relaxed">{active.bio}</p>
                <a
                  href="#contacts"
                  onClick={() => setActive(null)}
                  className="btn-primary mt-8 self-start"
                >
                  Записаться на тренировку
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function InstructorCard({ m, onOpen }: { m: Instructor; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group text-left flex flex-col items-center focus:outline-none"
    >
      <OvalFrame photo={m.photos?.[0]} name={m.name} role={m.role} />
      <div className="mt-5 text-center px-2">
        <h3 className="font-serif text-xl leading-tight">{m.name}</h3>
        <div className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-walnut">{m.role}</div>
        <span className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-olive opacity-0 group-hover:opacity-100 transition-opacity">
          Подробнее →
        </span>
      </div>
    </button>
  );
}

/**
 * Studio logobook-inspired frame: oval olive outline with a square photo card
 * (mounted like an acrylic plate) overlaid in the center.
 */
function OvalFrame({
  photo,
  name,
  role,
  large = false,
}: {
  photo?: string;
  name: string;
  role: string;
  large?: boolean;
}) {
  return (
    <div className={`relative mx-auto ${large ? "w-full" : "w-full max-w-[230px]"} aspect-[3/4]`}>
      {/* Oval outline */}
      <svg
        viewBox="0 0 300 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <ellipse
          cx="150"
          cy="200"
          rx="135"
          ry="185"
          fill="none"
          stroke="oklch(0.45 0.08 122)"
          strokeWidth="6"
        />
      </svg>

      {/* Square plate */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] aspect-square bg-olive shadow-[0_18px_40px_-22px_oklch(0.45_0.08_122/0.55)] transition-transform duration-500 group-hover:-translate-y-[52%]">
        {/* Tiny hanger dot */}
        <span className="absolute top-1.5 left-1.5 size-2 rounded-full border border-sand/70" />

        <div className="absolute inset-1.5 grid grid-cols-[1.55fr_1fr]">
          {/* Photo */}
          <div className="relative overflow-hidden bg-sand">
            {photo ? (
              <img
                src={photo}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-walnut text-xs">
                фото
              </div>
            )}
          </div>

          {/* Right label panel */}
          <div className="relative bg-olive text-sand flex flex-col justify-between p-2.5">
            <div className="font-serif uppercase leading-[1.05] text-[10px] sm:text-[11px] tracking-[0.06em]">
              {role.split(" ").slice(0, 4).join(" ")}
            </div>
            <div className="text-[8px] uppercase tracking-[0.18em] opacity-85 leading-tight">
              {name}
            </div>
            <span className="absolute bottom-1.5 right-1.5 size-3 rounded-full bg-sand/15 flex items-center justify-center">
              <img src={iconCertificate} alt="" className="size-2 object-contain opacity-90" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
