-- Site-wide settings (single-row table)
CREATE TABLE IF NOT EXISTS public.app_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id = true),
  yclients_url text NOT NULL DEFAULT 'https://n2043963.yclients.com',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "settings public read" ON public.app_settings FOR SELECT TO public USING (true);
CREATE POLICY "settings auth all" ON public.app_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.app_settings (id) VALUES (true) ON CONFLICT (id) DO NOTHING;

-- Optional per-card YClients deep links
ALTER TABLE public.directions ADD COLUMN IF NOT EXISTS yclients_url text NOT NULL DEFAULT '';
ALTER TABLE public.instructors ADD COLUMN IF NOT EXISTS yclients_url text NOT NULL DEFAULT '';