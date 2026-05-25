
-- 1. Restrict app_settings public access. Only yclients_url is needed publicly.
DROP POLICY IF EXISTS "settings public read" ON public.app_settings;

CREATE OR REPLACE FUNCTION public.get_public_yclients_url()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT yclients_url FROM public.app_settings WHERE id = true;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_yclients_url() TO anon, authenticated;

-- 2. Drop overly permissive public SELECT on admin-uploads storage objects.
-- Public bucket URLs still work via the public storage endpoint (bypasses RLS).
DROP POLICY IF EXISTS "admin-uploads public read" ON storage.objects;
