
-- 1) Set fixed search_path on SECURITY DEFINER helper functions
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pg_temp;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pg_temp;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pg_temp;

-- 2) Revoke EXECUTE from anon/authenticated on internal queue helpers
--    (these are only called from edge functions running with service role)
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;

-- 3) Tighten public booking INSERT policy
DROP POLICY IF EXISTS "bookings public insert" ON public.bookings;
CREATE POLICY "bookings public insert"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending'::booking_status
  AND source = 'site'::booking_source
  AND char_length(customer_name) BETWEEN 1 AND 120
  AND char_length(customer_phone) BETWEEN 3 AND 32
  AND char_length(note) <= 1000
);
