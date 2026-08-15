DROP POLICY IF EXISTS "admin-uploads auth insert" ON storage.objects;
DROP POLICY IF EXISTS "admin-uploads auth update" ON storage.objects;
DROP POLICY IF EXISTS "admin-uploads auth delete" ON storage.objects;

CREATE POLICY "admin-uploads owner insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'admin-uploads' AND owner = auth.uid());

CREATE POLICY "admin-uploads owner update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'admin-uploads' AND owner = auth.uid())
WITH CHECK (bucket_id = 'admin-uploads' AND owner = auth.uid());

CREATE POLICY "admin-uploads owner delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'admin-uploads' AND owner = auth.uid());