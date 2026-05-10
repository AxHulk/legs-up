
-- Booking status enum
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE public.booking_source AS ENUM ('site', 'manual', 'phone', 'instagram', 'whatsapp', 'telegram', 'other');

-- Instructors
CREATE TABLE public.instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  years text NOT NULL DEFAULT '',
  short_desc text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  photos text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Directions
CREATE TABLE public.directions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kicker text NOT NULL DEFAULT '',
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  icon_url text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Schedule classes
CREATE TABLE public.schedule_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  starts_at timestamptz NOT NULL,
  duration_min int NOT NULL DEFAULT 60,
  instructor_id uuid REFERENCES public.instructors(id) ON DELETE SET NULL,
  class_type text NOT NULL DEFAULT '',
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  seats_total int NOT NULL DEFAULT 8,
  booking_url text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_schedule_classes_starts_at ON public.schedule_classes(starts_at);

-- Bookings
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES public.schedule_classes(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_phone text NOT NULL DEFAULT '',
  status public.booking_status NOT NULL DEFAULT 'pending',
  source public.booking_source NOT NULL DEFAULT 'site',
  note text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_bookings_class_id ON public.bookings(class_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_instructors_updated BEFORE UPDATE ON public.instructors FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_directions_updated BEFORE UPDATE ON public.directions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_schedule_classes_updated BEFORE UPDATE ON public.schedule_classes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public read of published items
CREATE POLICY "instructors public read" ON public.instructors FOR SELECT USING (is_published = true);
CREATE POLICY "instructors auth all" ON public.instructors FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "directions public read" ON public.directions FOR SELECT USING (is_published = true);
CREATE POLICY "directions auth all" ON public.directions FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "schedule public read" ON public.schedule_classes FOR SELECT USING (is_published = true);
CREATE POLICY "schedule auth all" ON public.schedule_classes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Bookings: anyone can insert (booking from site), only admins can read/update/delete
CREATE POLICY "bookings public insert" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings auth all" ON public.bookings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket for admin uploads (public read)
INSERT INTO storage.buckets (id, name, public) VALUES ('admin-uploads', 'admin-uploads', true);

CREATE POLICY "admin-uploads public read" ON storage.objects FOR SELECT USING (bucket_id = 'admin-uploads');
CREATE POLICY "admin-uploads auth insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'admin-uploads');
CREATE POLICY "admin-uploads auth update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'admin-uploads');
CREATE POLICY "admin-uploads auth delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'admin-uploads');

-- Seed instructors
INSERT INTO public.instructors (name, role, years, short_desc, bio, photos, sort_order) VALUES
('Жанна Калугина', 'Директор · Пилатес на реформерах', '10+ лет',
 'Основатель студии. Бережный профессиональный подход для любого уровня.',
 'Жанна — основатель студии «НОГИ ВВЕРХ» и сертифицированный инструктор по пилатесу на реформерах с опытом более 10 лет. Её философия — внимание к каждому ученику, точность движения и забота о теле в любом возрасте. Жанна работает с клиентами на восстановлении после травм, с осанкой и общей физической формой, помогая обрести лёгкость и силу через осознанную работу с телом.',
 ARRAY['/seed/team/zhanna_1.png','/seed/team/zhanna_2.png','/seed/team/zhanna_3.png'], 1),
('Наталья Рыкова', 'Йога · Воздушные гамаки', '7 лет',
 'Восстановление, постановка техники, работа с дыханием и расслаблением.',
 'Наталья ведёт классы хатха-йоги и воздушных гамаков, объединяя силу, гибкость и глубокое расслабление. За 7 лет преподавания она помогла десяткам учеников найти баланс между телом и сознанием. На её занятиях вы научитесь слушать дыхание, отпускать напряжение и чувствовать каждую мышцу — мягко, без перегрузок и спешки.',
 ARRAY['/seed/team/natalya_1.png','/seed/team/natalya_2.png','/seed/team/natalya_3.png'], 2),
('Артур Назарян', 'TRX · Функциональный тренинг', '8 лет',
 'Сила, выносливость и контроль тела через подвесные тренировки TRX.',
 'Артур — сертифицированный TRX-тренер с опытом более 8 лет. Его тренировки — это сочетание силовой работы, кардио и контроля собственного тела на подвесных петлях. Артур умеет адаптировать программу под любой уровень: от первого знакомства с TRX до продвинутых атлетических протоколов. Результат — рельефное тело, крепкий кор и уверенность в каждом движении.',
 ARRAY['/seed/team/trx_1.png','/seed/team/trx_2.png','/seed/team/trx_3.png'], 3);

-- Seed directions
INSERT INTO public.directions (kicker, title, description, image_url, icon_url, sort_order) VALUES
('01 · Старт', 'Для начинающих', 'Мягкое погружение в пилатес: знакомство с реформером, базовые принципы дыхания и контроля тела.', '/seed/directions/card_beginners.jpg', '/seed/icons/icon_beginner.png', 1),
('02 · Уровень', 'Продвинутый', 'Интенсивные тренировки для тех, кто ищет глубокую проработку, силу и сложные элементы.', '/seed/directions/card_advanced.jpg', '/seed/icons/icon_advanced.png', 2),
('03 · Персонально', 'Индивидуальные', 'Программа под вас: работа со спиной, восстановление, подготовка к спорту или беременности.', '/seed/directions/card_private.jpg', '/seed/icons/icon_personal.png', 3);

-- Seed schedule (next 7 days)
INSERT INTO public.schedule_classes (starts_at, instructor_id, class_type, title, description, seats_total)
SELECT
  (date_trunc('day', now()) + (i || ' days')::interval + (h || ' hours')::interval)::timestamptz,
  (SELECT id FROM public.instructors ORDER BY sort_order LIMIT 1 OFFSET (i % 3)),
  CASE (i % 4) WHEN 0 THEN 'Реформер' WHEN 1 THEN 'Йога' WHEN 2 THEN 'Растяжка' ELSE 'Спина' END,
  CASE (i % 4) WHEN 0 THEN 'Пилатес на реформерах' WHEN 1 THEN 'Хатха йога' WHEN 2 THEN 'Растяжка в гамаках' ELSE 'Здоровая спина' END,
  '',
  8
FROM generate_series(1, 6) AS i, LATERAL (SELECT (9 + (i*3) % 11)::int AS h) sub;
