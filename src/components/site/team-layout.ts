// Разбивает список инструкторов на ряды по `size` карточек, чтобы на странице
// помещались все опубликованные тренеры, сколько бы их ни было.
export function chunkRows<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

// Число колонок ряда зависит от количества карточек в нём: неполный последний
// ряд центрируется и остаётся такой же ширины, что и карточки выше.
export function rowClass(length: number): string {
  if (length >= 4) return "md:grid-cols-4";
  if (length === 3) return "md:grid-cols-3 lg:max-w-[75%] lg:mx-auto";
  if (length === 2) return "md:grid-cols-2 lg:max-w-[50%] lg:mx-auto";
  return "md:grid-cols-1 lg:max-w-[25%] lg:mx-auto";
}

export type PhotoFraming = {
  scale?: number;
  objectPosition?: string;
  origin?: string;
};

// Индивидуальная подгонка кадрирования по конкретным фото инструкторов,
// чтобы лица были на одном уровне и головы не обрезались.
export const PHOTO_FRAMING: Record<string, PhotoFraming> = {
  "Валентина Рудич": { scale: 1.35, objectPosition: "50% 8%" },
  "Мария Козлова": { scale: 1, objectPosition: "50% 15%" },
  "Наталья Чеботарева": { scale: 1, objectPosition: "50% 15%" },
  "Мария Эрькина": { scale: 1, objectPosition: "50% 15%" },
  "Лилия Романова": { scale: 1, objectPosition: "50% 15%" },
  "Елизавета Кечина": { scale: 1, objectPosition: "50% 15%" },
  "Анастасия Петрова": { scale: 1, objectPosition: "50% 15%" },
  // На этих фото человек снят низко, сверху много стены с вывеской —
  // приближаем кадр снизу, чтобы лицо встало в верхней трети.
  "Елена Федотова": { scale: 1.44, objectPosition: "50% 100%", origin: "center bottom" },
  "Наталья Звягинцева": { scale: 1.5, objectPosition: "50% 100%", origin: "center bottom" },
};
