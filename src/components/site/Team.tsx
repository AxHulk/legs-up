import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-14 md:gap-x-8">
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
                  <OvalPortrait photo={active.photos[0]} name={active.name} tinted={false} />
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

// Индивидуальная подгонка кадрирования по конкретным фото инструкторов,
// чтобы лица были на одном уровне и головы не обрезались.
const PHOTO_FRAMING: Record<string, { scale?: number; objectPosition?: string }> = {
  "Валентина Рудич": { scale: 0.82, objectPosition: "50% 20%" },
  "Мария Козлова": { scale: 0.85, objectPosition: "50% 20%" },
  "Наталья Клочкова": { scale: 0.88, objectPosition: "50% 20%" },
  "Наталья Чеботарева": { scale: 1, objectPosition: "50% 10%" },
  "Мария Эрькина": { scale: 1, objectPosition: "50% 8%" },
};

function InstructorCard({ m, onOpen }: { m: Instructor; onOpen: () => void }) {
  const framing = PHOTO_FRAMING[m.name] ?? {};
  return (
    <button
      onClick={onOpen}
      className="group text-left flex flex-col items-center focus:outline-none"
    >
      <OvalPortrait
        photo={m.photos?.[0]}
        name={m.name}
        scale={framing.scale}
        objectPosition={framing.objectPosition}
      />
      <div className="mt-6 text-center px-2 flex flex-col items-center w-full">
        <h3 className="font-serif text-[22px] leading-tight whitespace-nowrap flex items-start justify-center">
          {m.name}
        </h3>
        <span className="mt-2 block size-1 rounded-full bg-olive/50" />
        <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-walnut leading-relaxed max-w-[200px] min-h-[3.2em] flex items-start justify-center">
          {m.role}
        </div>
        <span className="mt-3 text-[10px] uppercase tracking-[0.2em] text-olive opacity-0 group-hover:opacity-100 transition-opacity">
          Подробнее →
        </span>
      </div>
    </button>
  );
}

function OvalPortrait({
  photo,
  name,
  scale = 1,
  objectPosition = "50% 10%",
}: {
  photo?: string;
  name: string;
  tinted?: boolean;
  scale?: number;
  objectPosition?: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[260px] aspect-[4/5]">
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-olive/40 bg-sand transition-transform duration-700 ease-out group-hover:-translate-y-1.5 shadow-[0_22px_50px_-30px_oklch(0.45_0.08_122/0.45)]">
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition,
              transform: scale !== 1 ? `scale(${scale})` : undefined,
              transformOrigin: scale < 1 ? "center center" : "center top",
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-walnut text-xs">
            фото
          </div>
        )}
      </div>
    </div>
  );
}
