import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Field, ImageInput, inputClass } from "@/components/admin/form-bits";
import { Modal } from "./admin.instructors";

export const Route = createFileRoute("/admin/directions")({ component: DirectionsAdmin });

type Direction = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image_url: string;
  icon_url: string;
  yclients_url: string;
  sort_order: number;
  is_published: boolean;
};

function DirectionsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Direction> | null>(null);

  const { data: list = [] } = useQuery({
    queryKey: ["admin-directions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("directions").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as Direction[];
    },
  });

  const save = useMutation({
    mutationFn: async (row: Partial<Direction>) => {
      const payload = {
        kicker: row.kicker ?? "",
        title: row.title ?? "",
        description: row.description ?? "",
        image_url: row.image_url ?? "",
        icon_url: row.icon_url ?? "",
        yclients_url: row.yclients_url ?? "",
        sort_order: row.sort_order ?? 0,
        is_published: row.is_published ?? true,
      };
      if (row.id) {
        const { error } = await supabase.from("directions").update(payload).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("directions").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-directions"] });
      qc.invalidateQueries({ queryKey: ["public-directions"] });
      setEditing(null);
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("directions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-directions"] });
      qc.invalidateQueries({ queryKey: ["public-directions"] });
    },
  });

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl">Направления</h1>
          <p className="text-foreground/60 text-sm mt-1">Карточки направлений на главной.</p>
        </div>
        <button
          onClick={() =>
            setEditing({
              kicker: "",
              title: "",
              description: "",
              image_url: "",
              icon_url: "",
              yclients_url: "",
              sort_order: list.length + 1,
              is_published: true,
            })
          }
          className="btn-primary !py-2.5 !px-5 text-[13px]"
        >
          <Plus className="size-4" /> Добавить
        </button>
      </div>

      <div className="grid gap-4">
        {list.map((it) => (
          <div key={it.id} className="bg-sand rounded-2xl p-5 border border-border/60 flex gap-5 items-center">
            <img src={it.image_url} alt="" className="size-20 object-cover rounded-xl" />
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-[0.2em] text-walnut">{it.kicker}</div>
              <div className="font-serif text-2xl">{it.title}</div>
              <div className="text-sm text-foreground/65 mt-1 line-clamp-2">{it.description}</div>
            </div>
            <div className="flex flex-col gap-2">
              {!it.is_published && (
                <span className="text-[10px] uppercase tracking-[0.18em] text-walnut">скрыт</span>
              )}
              <button onClick={() => setEditing(it)} className="text-xs px-3 py-2 rounded-lg bg-olive text-sand">
                Изменить
              </button>
              <button
                onClick={() => {
                  if (confirm(`Удалить «${it.title}»?`)) del.mutate(it.id);
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
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Редактирование" : "Новое направление"}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Рубрика">
                <input
                  className={inputClass}
                  value={editing.kicker ?? ""}
                  onChange={(e) => setEditing({ ...editing, kicker: e.target.value })}
                  placeholder="01 · Старт"
                />
              </Field>
              <Field label="Порядок">
                <input
                  type="number"
                  className={inputClass}
                  value={editing.sort_order ?? 0}
                  onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                />
              </Field>
            </div>
            <Field label="Заголовок">
              <input
                className={inputClass}
                value={editing.title ?? ""}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              />
            </Field>
            <Field label="Описание">
              <textarea
                className={inputClass}
                rows={4}
                value={editing.description ?? ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              />
            </Field>
            <ImageInput
              label="Главное изображение"
              value={editing.image_url ?? ""}
              onChange={(u) => setEditing({ ...editing, image_url: u })}
              prefix="directions"
            />
            <ImageInput
              label="Иконка (необязательно)"
              value={editing.icon_url ?? ""}
              onChange={(u) => setEditing({ ...editing, icon_url: u })}
              prefix="icons"
            />
            <Field
              label="Ссылка YClients (необязательно)"
              hint="Если указана, кнопка «Записаться» на этой карточке ведёт сюда. Иначе — на общий виджет из «Настроек»."
            >
              <input
                className={inputClass}
                value={editing.yclients_url ?? ""}
                onChange={(e) => setEditing({ ...editing, yclients_url: e.target.value })}
                placeholder="https://n2043963.yclients.com/..."
                inputMode="url"
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
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-border text-sm">
              Отмена
            </button>
            <button onClick={() => save.mutate(editing)} disabled={save.isPending} className="btn-primary !py-2.5 !px-5 text-[13px] disabled:opacity-50">
              <Save className="size-4" /> Сохранить
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
