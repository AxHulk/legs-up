
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save, X, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Field, ImageInput, PhotosInput, inputClass } from "@/components/admin/form-bits";

type Instructor = {
  id: string;
  name: string;
  role: string;
  years: string;
  short_desc: string;
  bio: string;
  photos: string[];
  yclients_url: string;
  sort_order: number;
  is_published: boolean;
};

const empty = (sort_order: number): Omit<Instructor, "id"> => ({
  name: "",
  role: "",
  years: "",
  short_desc: "",
  bio: "",
  photos: [],
  yclients_url: "",
  sort_order,
  is_published: true,
});

function InstructorsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Instructor> | null>(null);

  const { data: list = [] } = useQuery({
    queryKey: ["admin-instructors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("instructors")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Instructor[];
    },
  });

  const save = useMutation({
    mutationFn: async (row: Partial<Instructor>) => {
      const payload = {
        name: row.name ?? "",
        role: row.role ?? "",
        years: row.years ?? "",
        short_desc: row.short_desc ?? "",
        bio: row.bio ?? "",
        photos: row.photos ?? [],
        yclients_url: row.yclients_url ?? "",
        sort_order: row.sort_order ?? 0,
        is_published: row.is_published ?? true,
      };
      if (row.id) {
        const { error } = await supabase.from("instructors").update(payload).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("instructors").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-instructors"] });
      qc.invalidateQueries({ queryKey: ["public-instructors"] });
      setEditing(null);
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("instructors").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-instructors"] });
      qc.invalidateQueries({ queryKey: ["public-instructors"] });
    },
  });

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl">Инструкторы</h1>
          <p className="text-foreground/60 text-sm mt-1">Управление карточками тренеров на сайте.</p>
        </div>
        <button
          onClick={() => setEditing(empty(list.length + 1))}
          className="btn-primary !py-2.5 !px-5 text-[13px]"
        >
          <Plus className="size-4" /> Добавить
        </button>
      </div>

      <div className="grid gap-4">
        {list.map((it) => (
          <div key={it.id} className="bg-sand rounded-2xl p-5 border border-border/60 flex gap-5 items-center">
            <img
              src={it.photos[0] || "/seed/team/zhanna_1.png"}
              alt=""
              className="size-20 object-cover object-top rounded-xl"
            />
            <div className="flex-1">
              <div className="font-serif text-2xl">{it.name}</div>
              <div className="text-xs text-walnut uppercase tracking-[0.18em] mt-1">{it.role}</div>
              <div className="text-sm text-foreground/65 mt-2 line-clamp-2">{it.short_desc}</div>
            </div>
            <div className="flex flex-col gap-2">
              {!it.is_published && (
                <span className="text-[10px] uppercase tracking-[0.18em] text-walnut">скрыт</span>
              )}
              <button
                onClick={() => setEditing(it)}
                className="text-xs px-3 py-2 rounded-lg bg-olive text-sand"
              >
                Изменить
              </button>
              <button
                onClick={() => {
                  if (confirm(`Удалить «${it.name}»?`)) del.mutate(it.id);
                }}
                className="text-xs px-3 py-2 rounded-lg border border-destructive/40 text-destructive"
              >
                <Trash2 className="size-3.5 inline" /> Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Редактирование" : "Новый инструктор"}>
          <div className="space-y-4">
            <Field label="Имя">
              <input
                className={inputClass}
                value={editing.name ?? ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Должность">
                <input
                  className={inputClass}
                  value={editing.role ?? ""}
                  onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                />
              </Field>
              <Field label="Опыт">
                <input
                  className={inputClass}
                  value={editing.years ?? ""}
                  onChange={(e) => setEditing({ ...editing, years: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Краткое описание">
              <textarea
                className={inputClass}
                rows={2}
                value={editing.short_desc ?? ""}
                onChange={(e) => setEditing({ ...editing, short_desc: e.target.value })}
              />
            </Field>
            <Field label="Биография">
              <textarea
                className={inputClass}
                rows={5}
                value={editing.bio ?? ""}
                onChange={(e) => setEditing({ ...editing, bio: e.target.value })}
              />
            </Field>
            <PhotosInput
              value={editing.photos ?? []}
              onChange={(v) => setEditing({ ...editing, photos: v })}
              prefix="instructors"
            />
            <Field
              label="Ссылка YClients (необязательно)"
              hint="Если указана, кнопка «Записаться к инструктору» ведёт сюда. Иначе — на общий виджет из «Настроек»."
            >
              <input
                className={inputClass}
                value={editing.yclients_url ?? ""}
                onChange={(e) => setEditing({ ...editing, yclients_url: e.target.value })}
                placeholder="https://n2043963.yclients.com/..."
                inputMode="url"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Порядок сортировки">
                <input
                  type="number"
                  className={inputClass}
                  value={editing.sort_order ?? 0}
                  onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                />
              </Field>
              <Field label="Видимость">
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, is_published: !editing.is_published })}
                  className={`${inputClass} text-left flex items-center gap-2`}
                >
                  {editing.is_published ? (
                    <>
                      <Eye className="size-4 text-olive" /> Показывать на сайте
                    </>
                  ) : (
                    <>
                      <EyeOff className="size-4 text-walnut" /> Скрыто
                    </>
                  )}
                </button>
              </Field>
            </div>
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
    </div>
  );
}

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-cream rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border/60 sticky top-0 bg-cream z-10">
          <h2 className="font-serif text-2xl">{title}</h2>
          <button onClick={onClose} className="size-9 rounded-full bg-sand hover:bg-walnut hover:text-sand flex items-center justify-center">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default InstructorsAdmin;
