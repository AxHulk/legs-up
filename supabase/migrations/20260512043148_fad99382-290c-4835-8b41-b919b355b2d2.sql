
ALTER TABLE public.schedule_classes
  ADD COLUMN IF NOT EXISTS yclients_activity_id bigint,
  ADD COLUMN IF NOT EXISTS yclients_service_id bigint,
  ADD COLUMN IF NOT EXISTS yclients_staff_id bigint,
  ADD COLUMN IF NOT EXISTS seats_free integer,
  ADD COLUMN IF NOT EXISTS synced_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS schedule_classes_yclients_activity_id_key
  ON public.schedule_classes (yclients_activity_id)
  WHERE yclients_activity_id IS NOT NULL;

ALTER TABLE public.app_settings
  ADD COLUMN IF NOT EXISTS schedule_synced_at timestamptz,
  ADD COLUMN IF NOT EXISTS schedule_sync_days integer NOT NULL DEFAULT 21,
  ADD COLUMN IF NOT EXISTS schedule_sync_error text;
