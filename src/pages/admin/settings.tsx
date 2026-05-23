
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Save, ExternalLink, Check, RefreshCw, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Field, inputClass } from "@/components/admin/form-bits";
import { syncYclientsSchedule } from "@/lib/admin-api";
import { toast } from "sonner";

function SettingsAdmin() {
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["admin-app-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("app_settings")
        .select("yclients_url, schedule_synced_at, schedule_sync_error")
        .eq("id", true)
        .maybeSingle();
      if (error) throw error;
      return data ?? { yclients_url: "", schedule_synced_at: null, schedule_sync_error: null };
    },
  });

  const [url, setUrl] = useState("");
  const [savedTick, setSavedTick] = useState(false);

  useEffect(() => {
    if (data?.yclients_url !== undefined) setUrl(data.yclients_url ?? "");
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

  const sync = useMutation({
    mutationFn: async () => syncYclientsSchedule(),
    onSuccess: (r: { fetched: number; upserted: number }) => {
      toast.success(`Импортировано ${r.upserted} занятий из YClients`);
      qc.invalidateQueries({ queryKey: ["admin-app-settings"] });
      qc.invalidateQueries({ queryKey: ["public-schedule"] });
      qc.invalidateQueries({ queryKey: ["admin-schedule"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Не удалось синхронизировать расписание");
    },
  });

  const fmt = (iso?: string | null) =>
    iso ? new Date(iso).toLocaleString("ru-RU", { dateStyle: "medium", timeStyle: "short" }) : "никогда";

  return (
    <div className="max-w-2xl space-y-8">
      <div>
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

      <div className="bg-sand rounded-2xl p-6 border border-border/60 space-y-4">
        <div>
          <h2 className="font-serif text-2xl">Синхронизация расписания</h2>
          <p className="text-foreground/60 text-sm mt-1">
            Раз в 15 минут расписание автоматически подтягивается из YClients
            (групповые занятия на 3 недели вперёд). Кнопка ниже запускает синхронизацию вручную.
          </p>
        </div>

        <div className="text-sm text-foreground/70">
          Последняя синхронизация: <b>{fmt(data?.schedule_synced_at)}</b>
        </div>

        {data?.schedule_sync_error && (
          <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 rounded-xl p-3">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <span className="break-words">{data.schedule_sync_error}</span>
          </div>
        )}

        <button
          onClick={() => sync.mutate()}
          disabled={sync.isPending}
          className="btn-primary !py-2.5 !px-5 text-[13px] disabled:opacity-50"
        >
          <RefreshCw className={`size-4 ${sync.isPending ? "animate-spin" : ""}`} />
          {sync.isPending ? "Синхронизируем…" : "Синхронизировать сейчас"}
        </button>
      </div>

      <p className="text-xs text-foreground/55 leading-relaxed">
        Подсказка: в карточках направлений и инструкторов можно указать{" "}
        <b>свою</b> ссылку YClients (например, на конкретную услугу или сотрудника) — она
        будет использоваться вместо общей. Имена инструкторов в админке желательно записывать
        ровно так, как они называются в YClients — тогда занятия автоматически связываются
        с карточками тренеров.
      </p>
    </div>
  );
}

export default SettingsAdmin;
