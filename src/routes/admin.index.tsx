import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Users, Layers, Inbox } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });

function AdminDashboard() {
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [ins, dirs, classes, pending] = await Promise.all([
        supabase.from("instructors").select("id", { count: "exact", head: true }),
        supabase.from("directions").select("id", { count: "exact", head: true }),
        supabase.from("schedule_classes").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
      ]);
      return {
        instructors: ins.count ?? 0,
        directions: dirs.count ?? 0,
        classes: classes.count ?? 0,
        pending: pending.count ?? 0,
      };
    },
  });

  const cards = [
    { label: "Занятий в расписании", value: data?.classes ?? "—", icon: Calendar },
    { label: "Ожидают подтверждения", value: data?.pending ?? "—", icon: Inbox },
    { label: "Инструкторов", value: data?.instructors ?? "—", icon: Users },
    { label: "Направлений", value: data?.directions ?? "—", icon: Layers },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl mb-2">Здравствуйте 👋</h1>
      <p className="text-foreground/60 mb-10">Краткая сводка по студии.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-sand rounded-2xl p-6 border border-border/60">
            <c.icon className="size-5 text-olive mb-4" />
            <div className="font-serif text-4xl">{c.value}</div>
            <div className="text-xs text-foreground/60 mt-1">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
