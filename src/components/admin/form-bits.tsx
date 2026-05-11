import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadAdminImage } from "@/lib/admin-uploads";

export function ImageInput({
  value,
  onChange,
  label,
  prefix,
  className = "",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setErr(null);
    setBusy(true);
    try {
      const url = await uploadAdminImage(file, prefix);
      onChange(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={className}>
      {label && <div className="text-xs uppercase tracking-[0.18em] text-walnut mb-2">{label}</div>}
      <div className="flex items-start gap-3">
        <div className="relative size-24 rounded-xl bg-sand border border-border overflow-hidden flex-shrink-0">
          {value ? (
            <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-foreground/40">
              нет
            </div>
          )}
          {busy && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 className="size-5 animate-spin text-sand" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => ref.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-olive text-sand text-xs disabled:opacity-50"
            >
              <Upload className="size-3.5" /> Загрузить
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-xs"
              >
                <X className="size-3.5" /> Очистить
              </button>
            )}
          </div>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="или вставьте URL изображения"
            className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-cream"
          />
          {err && <div className="text-xs text-destructive">{err}</div>}
        </div>
      </div>
    </div>
  );
}

export function PhotosInput({
  value,
  onChange,
  prefix,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  prefix?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-[0.18em] text-walnut">Фотографии</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {value.map((url, i) => (
          <ImageInput
            key={i}
            value={url}
            onChange={(u) => {
              const next = [...value];
              if (u) next[i] = u;
              else next.splice(i, 1);
              onChange(next);
            }}
            prefix={prefix}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...value, ""])}
        className="text-xs px-3 py-2 rounded-lg border border-dashed border-border text-walnut hover:border-olive hover:text-olive"
      >
        + Добавить фото
      </button>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-[0.18em] text-walnut mb-2">{label}</div>
      {children}
      {hint && <div className="text-[11px] text-foreground/55 mt-1.5 leading-relaxed">{hint}</div>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-border bg-cream px-3 py-2 outline-none focus:border-olive text-sm";
