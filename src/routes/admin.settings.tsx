import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Save, ExternalLink, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Field, inputClass } from "@/components/admin/form-bits";

export const Route = createFileRoute("/admin/settings")({ component: SettingsAdmin });

function SettingsAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-app-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("app_settings")
        .select("yclients_url")
        .eq("id", true)
        .maybeSingle();
      if (error) throw error;
      return data ?? { yclients_url: "" };
    },
  });

  const [url, setUrl] = useState("");
  const [savedTick, setSavedTick] = useState(false);

  useEffect(() => {
    if (data?.yclients_url !== undefined) setUrl(data.yclients_url);
  }, [data?.yclients_url]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("app_settings")
        .upsert({ id: true, yclients_url: url.trim(), updated_at: new Date().toISOString() });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-app-settings"] });
      qc.invalidateQueries({ queryKey: ["app-settings"] });
      setSavedTick(true);
      setTimeout(() => setSavedTick(false), 1800);
    },
  });

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-4xl">Настройки</h1>
        <p className="text-foreground/60 text-sm mt-1">
          Общие настройки сайта — применяются ко всем кнопкам «Записаться».
        </p>
      </div>

      <div className="bg-sand rounded-2xl p-6 border border-border/60 space-y-5">
        <Field
          label="Ссылка на онлайн-запись YClients"
          hint='Например: https://n2043963.yclients.com . Эта ссылка открывается в модалке по нажатию кнопок «Записаться» в шапке, hero, контактах и на карточках без своей ссылки.'
        >
          <input
            className={inputClass}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://n2043963.yclients.com"
            inputMode="url"
          />
        </Field>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs text-olive hover:text-olive-deep"
          >
            <ExternalLink className="size-3.5" /> Проверить ссылку
          </a>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => save.mutate()}
            disabled={save.isPending}
            className="btn-primary !py-2.5 !px-5 text-[13px] disabled:opacity-50"
          >
            <Save className="size-4" /> Сохранить
          </button>
          {savedTick && (
            <span className="inline-flex items-center gap-1.5 text-xs text-olive">
              <Check className="size-4" /> Сохранено
            </span>
          )}
          {save.isError && (
            <span className="text-xs text-destructive">
              {save.error instanceof Error ? save.error.message : "Ошибка"}
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-foreground/55 mt-6 leading-relaxed">
        Подсказка: в карточках направлений и инструкторов можно указать{" "}
        <b>свою</b> ссылку YClients (например, на конкретную услугу или сотрудника) — она
        будет использоваться вместо общей.
      </p>
    </div>
  );
}
