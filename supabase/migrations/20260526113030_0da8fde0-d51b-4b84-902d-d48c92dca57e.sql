
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "admins view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ SITE CONTENT (key/value overrides for any translation key) ============
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value_en TEXT,
  value_fr TEXT,
  type TEXT NOT NULL DEFAULT 'text', -- text | richtext | image_url | url
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "admins manage site_content" ON public.site_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ BLOG POSTS ============
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft', -- draft | published
  published_at TIMESTAMPTZ,
  title_en TEXT NOT NULL DEFAULT '',
  title_fr TEXT NOT NULL DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_fr TEXT DEFAULT '',
  body_html_en TEXT DEFAULT '',
  body_html_fr TEXT DEFAULT '',
  cover_image_url TEXT,
  author TEXT DEFAULT 'Btech Consulting',
  tags TEXT[] DEFAULT '{}',
  -- SEO
  meta_title_en TEXT,
  meta_title_fr TEXT,
  meta_description_en TEXT,
  meta_description_fr TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  keywords TEXT,
  noindex BOOLEAN NOT NULL DEFAULT false,
  json_ld JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads published posts" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "admins read all posts" ON public.blog_posts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins manage posts" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_blog_status_pub ON public.blog_posts (status, published_at DESC);

-- ============ SITE SETTINGS (single row) ============
CREATE TABLE public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  site_name TEXT DEFAULT 'Btech Consulting',
  default_meta_title TEXT,
  default_meta_description TEXT,
  default_og_image TEXT,
  contact_email TEXT DEFAULT 'contact@btech-consulting.com',
  contact_phone TEXT DEFAULT '+33 (0) 6 50 31 27 50',
  contact_address TEXT DEFAULT '8 T Place Henri d''Astier, 94220 Charenton-le-Pont',
  social_linkedin TEXT DEFAULT 'https://www.linkedin.com/company/btech-consulting/',
  social_instagram TEXT DEFAULT 'https://www.instagram.com/b.tech_consulting',
  social_facebook TEXT DEFAULT 'https://www.facebook.com/share/1D7cTeYLVM/',
  social_tiktok TEXT DEFAULT 'https://www.tiktok.com/@btechconsulting',
  social_youtube TEXT DEFAULT 'https://www.youtube.com/channel/UCiTPQ5u-nSYlQCgSWX46ZEg',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "admins manage settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- ============ updated_at trigger ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER trg_blog_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ STORAGE bucket for media ============
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
