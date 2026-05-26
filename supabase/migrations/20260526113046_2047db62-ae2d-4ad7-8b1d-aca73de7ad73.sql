
-- Fix set_updated_at search_path
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Lock down SECURITY DEFINER functions (only RLS evaluator and triggers need them)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- Replace broad media SELECT with a no-listing pattern: direct URL fetches still work via signed/public object URLs
DROP POLICY IF EXISTS "Public read media" ON storage.objects;
CREATE POLICY "Public read media objects" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'media' AND (storage.foldername(name))[1] IS NOT NULL);
