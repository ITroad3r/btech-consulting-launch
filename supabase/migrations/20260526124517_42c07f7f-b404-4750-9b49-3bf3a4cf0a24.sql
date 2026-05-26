ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_x TEXT;
UPDATE public.site_settings SET social_x = 'https://x.com/Btechconsult1' WHERE id = 1;