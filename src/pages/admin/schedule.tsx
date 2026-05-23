
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save, Eye, EyeOff, Check, X as XIcon, Inbox } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Field, inputClass } from "@/components/admin/form-bits";
import { Modal } from "./instructors";

type Klass = {
  id: string;
  starts_at: string;
  duration_min: number;
  instructor_id: string | null;
  class_type: string;
  title: string;
  description: string;
  seats_total: number;
  booking_url: string;
  is_published: boolean;
};

const toLocal = (iso: string) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

function ScheduleAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Klass> | null>(null);
  const [bookingsFor, setBookingsFor] = useState<Klass | null>(null);

  const { data: classes = [] } = useQuery({
    queryKey: ["admin-classes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schedule_classes")
        .select("*")
        .order("starts_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Klass[];
    },
  });

  const { data: instructors = [] } = useQuery({
    queryKey: ["admin-instructors-options"],
    queryFn: async () => {
      const { data, error } = await supabase.from("instructors").select("id,name").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: bookingCounts = {} } = useQuery({
    queryKey: ["admin-booking-counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("class_id,status");
      if (error) throw error;
      const acc: Record<string, { confirmed: number; pending: number }> = {};
      for (const b of data ?? []) {
        if (!b.class_id) continue;
        if (!acc[b.class_id]) acc[b.class_id] = { confirmed: 0, pending: 0 };
        if (b.status === "confirmed") acc[b.class_id].confirmed++;
        if (b.status === "pending") acc[b.class_id].pending++;
      }
      return acc;
    },
  });

  const save = useMutation({
    mutationFn: async (row: Partial<Klass>) => {
      const starts_at = row.starts_at;
      const payload = {
        starts_at: starts_at!,
        duration_min: row.duration_min ?? 60,
        instructor_id: row.instructor_id ?? null,
        class_type: row.class_type ?? "",
        title: row.title ?? "",
        description: row.description ?? "",
        seats_total: row.seats_total ?? 8,
        booking_url: row.booking_url ?? "",
        is_published: row.is_published ?? true,
      };
      if (row.id) {
        const { error } = await supabase.from("schedule_classes").update(payload).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("schedule_classes").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-classes"] });
      qc.invalidateQueries({ queryKey: ["public-schedule"] });
      setEditing(null);
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("schedule_classes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-classes"] });
      qc.invalidateQueries({ queryKey: ["public-schedule"] });
    },
  });

  const grouped = useMemo(() => {
    const acc: Record<string, Klass[]> = {};
    for (const c of classes) {
      const key = new Date(c.starts_at).toLocaleDateString("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      (acc[key] = acc[key] ?? []).push(c);
    }
    return acc;
  }, [classes]);

  const instructorName = (id: string | null) => instructors.find((i) => i.id === id)?.name ?? "—";

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl">Расписание</h1>
          <p className="text-foreground/60 text-sm mt-1">Создавайте и редактируйте занятия. Подтверждайте брони.</p>
        </div>
        <button
          onClick={() =>
            setEditing({
              starts_at: new Date().toISOString(),
              duration_min: 60,
              instructor_id: instructors[0]?.id ?? null,
              class_type: "Реформер",
              title: "",
              description: "",
              seats_total: 8,
              booking_url: "",
              is_published: true,
            })
          }
          className="btn-primary !py-2.5 !px-5 text-[13px]"
        >
          <Plus className="size-4" /> Новое занятие
        </button>
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([day, items]) => (
          <div key={day}>
            <h3 className="font-serif text-2xl mb-3 capitalize">{day}</h3>
            <div className="bg-sand rounded-2xl border border-border/60 overflow-hidden">
              {items.map((c, i) => {
                const time = new Date(c.starts_at).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
                const counts = bookingCounts[c.id] ?? { confirmed: 0, pending: 0 };
                const free = c.seats_total - counts.confirmed;
                return (
                  <div
                    key={c.id}
                    className={`grid grid-cols-12 gap-4 items-center px-5 py-4 ${
                      i !== items.length - 1 ? "border-b border-border/60" : ""
                    }`}
                  >
                    <div className="col-span-1 font-serif text-2xl text-olive">{time}</div>
                    <div className="col-span-4">
                      <div className="font-medium">{c.title || "(без названия)"}</div>
                      <div className="text-xs text-foreground/60">
                        {c.class_type} · {instructorName(c.instructor_id)}
                      </div>
                    </div>
                    <div className="col-span-2 text-xs text-foreground/65">
                      {free} / {c.seats_total} мест
                      {counts.pending > 0 && (
                        <div className="text-walnut mt-1">+{counts.pending} ожидают</div>
                      )}
                    </div>
                    <div className="col-span-2 text-xs">
                      {!c.is_published && <span className="text-walnut uppercase tracking-[0.18em]">скрыт</span>}
                    </div>
                    <div className="col-span-3 flex gap-2 justify-end">
                      <button
                        onClick={() => setBookingsFor(c)}
                        className="text-xs px-3 py-2 rounded-lg border border-border inline-flex items-center gap-1.5"
                      >
                        <Inbox className="size-3.5" /> Брони
                      </button>
                      <button onClick={() => setEditing(c)} className="text-xs px-3 py-2 rounded-lg bg-olive text-sand">
                        Изменить
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Удалить занятие?")) del.mutate(c.id);
                        }}
                        className="text-xs px-2 py-2 rounded-lg border border-destructive/40 text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {classes.length === 0 && (
          <div className="text-center py-16 text-foreground/50 text-sm">
            Расписание пусто. Создайте первое занятие.
          </div>
        )}
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Редактирование занятия" : "Новое занятие"}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Дата и время">
                <input
                  type="datetime-local"
                  className={inputClass}
                  defaultValue={editing.starts_at ? toLocal(editing.starts_at) : ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      starts_at: e.target.value ? new Date(e.target.value).toISOString() : editing.starts_at,
                    })
                  }
                />
              </Field>
              <Field label="Длительность (минут)">
                <input
                  type="number"
                  className={inputClass}
                  value={editing.duration_min ?? 60}
                  onChange={(e) => setEditing({ ...editing, duration_min: Number(e.target.value) })}
                />
              </Field>
            </div>
            <Field label="Название занятия">
              <input
                className={inputClass}
                value={editing.title ?? ""}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Тип занятия">
                <input
                  className={inputClass}
                  value={editing.class_type ?? ""}
                  onChange={(e) => setEditing({ ...editing, class_type: e.target.value })}
                  placeholder="Реформер / Йога / Растяжка / Спина"
                />
              </Field>
              <Field label="Инструктор">
                <select
                  className={inputClass}
                  value={editing.instructor_id ?? ""}
                  onChange={(e) => setEditing({ ...editing, instructor_id: e.target.value || null })}
                >
                  <option value="">— не назначен —</option>
                  {instructors.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Описание / комментарий">
              <textarea
                className={inputClass}
                rows={3}
                value={editing.description ?? ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Количество мест">
                <input
                  type="number"
                  className={inputClass}
                  value={editing.seats_total ?? 8}
                  onChange={(e) => setEditing({ ...editing, seats_total: Number(e.target.value) })}
                />
              </Field>
              <Field label="Внешняя ссылка для брони (опц.)">
                <input
                  className={inputClass}
                  value={editing.booking_url ?? ""}
                  onChange={(e) => setEditing({ ...editing, booking_url: e.target.value })}
                  placeholder="https://..."
                />
              </Field>
            </div>
            <Field label="Видимость">
              <button
                type="button"
                onClick={() => setEditing({ ...editing, is_published: !editing.is_published })}
                className={`${inputClass} text-left flex items-center gap-2`}
              >
                {editing.is_published ? (
                  <>
                    <Eye className="size-4 text-olive" /> На сайте
                  </>
                ) : (
                  <>
                    <EyeOff className="size-4 text-walnut" /> Скрыто
                  </>
                )}
              </button>
            </Field>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-border text-sm">
              Отмена
            </button>
            <button
              onClick={() => save.mutate(editing)}
              disabled={save.isPending}
              className="btn-primary !py-2.5 !px-5 text-[13px] disabled:opacity-50"
            >
              <Save className="size-4" /> Сохранить
            </button>
          </div>
        </Modal>
      )}

      {bookingsFor && (
        <BookingsForClass klass={bookingsFor} onClose={() => setBookingsFor(null)} />
      )}
    </div>
  );
}

function BookingsForClass({ klass, onClose }: { klass: Klass; onClose: () => void }) {
  const qc = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("manual");
  const [note, setNote] = useState("");

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", klass.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("class_id", klass.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "confirmed" | "cancelled" | "pending" }) => {
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings", klass.id] });
      qc.invalidateQueries({ queryKey: ["admin-booking-counts"] });
      qc.invalidateQueries({ queryKey: ["all-bookings"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings", klass.id] });
      qc.invalidateQueries({ queryKey: ["admin-booking-counts"] });
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("bookings").insert({
        class_id: klass.id,
        customer_name: name,
        customer_phone: phone,
        source: source as "manual" | "site" | "phone" | "instagram" | "whatsapp" | "telegram" | "other",
        note,
        status: "confirmed",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings", klass.id] });
      qc.invalidateQueries({ queryKey: ["admin-booking-counts"] });
      setAdding(false);
      setName("");
      setPhone("");
      setNote("");
    },
  });

  return (
    <Modal onClose={onClose} title={`Брони · ${klass.title}`}>
      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b.id} className="bg-sand rounded-xl p-4 flex items-center gap-3">
            <div className="flex-1">
              <div className="font-medium">{b.customer_name}</div>
              <div className="text-xs text-foreground/60">
                {b.customer_phone || "—"} · источник: {b.source}
              </div>
              {b.note && <div className="text-xs text-foreground/60 mt-1">{b.note}</div>}
            </div>
            <span
              className={`text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full ${
                b.status === "confirmed"
                  ? "bg-olive text-sand"
                  : b.status === "cancelled"
                    ? "bg-destructive/15 text-destructive"
                    : "bg-walnut/15 text-walnut"
              }`}
            >
              {b.status === "confirmed" ? "подтв." : b.status === "cancelled" ? "отменён" : "ожидает"}
            </span>
            {b.status !== "confirmed" && (
              <button
                onClick={() => setStatus.mutate({ id: b.id, status: "confirmed" })}
                className="size-8 rounded-full bg-olive text-sand flex items-center justify-center"
                title="Подтвердить"
              >
                <Check className="size-4" />
              </button>
            )}
            {b.status !== "cancelled" && (
              <button
                onClick={() => setStatus.mutate({ id: b.id, status: "cancelled" })}
                className="size-8 rounded-full bg-walnut/15 text-walnut flex items-center justify-center"
                title="Отменить"
              >
                <XIcon className="size-4" />
              </button>
            )}
            <button
              onClick={() => {
                if (confirm("Удалить бронь?")) remove.mutate(b.id);
              }}
              className="size-8 rounded-full border border-destructive/40 text-destructive flex items-center justify-center"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
        {bookings.length === 0 && <div className="text-sm text-foreground/50 py-4">Броней пока нет.</div>}

        {adding ? (
          <div className="bg-cream border border-border rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input className={inputClass} placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
              <input className={inputClass} placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <select className={inputClass} value={source} onChange={(e) => setSource(e.target.value)}>
              <option value="manual">Вручную</option>
              <option value="phone">Телефон</option>
              <option value="instagram">Instagram</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
              <option value="other">Другое</option>
            </select>
            <input className={inputClass} placeholder="Комментарий" value={note} onChange={(e) => setNote(e.target.value)} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setAdding(false)} className="px-3 py-2 text-sm rounded-lg border border-border">
                Отмена
              </button>
              <button
                onClick={() => create.mutate()}
                disabled={!name || create.isPending}
                className="px-3 py-2 text-sm rounded-lg bg-olive text-sand disabled:opacity-50"
              >
                Добавить
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="w-full text-sm py-3 rounded-xl border border-dashed border-border text-walnut hover:border-olive hover:text-olive"
          >
            + Добавить бронь вручную
          </button>
        )}
      </div>
    </Modal>
  );
}

export default ScheduleAdmin;
