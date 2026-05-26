import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/i18n/LanguageProvider";

type Row = { key: string; value_en: string | null; value_fr: string | null };

export function useSiteContentMap() {
  return useQuery({
    queryKey: ["site_content_map"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("key,value_en,value_fr");
      const map = new Map<string, Row>();
      (data ?? []).forEach((r) => map.set(r.key, r as Row));
      return map;
    },
  });
}

/** Returns override for a translation key in the current language, or null. */
export function useContentOverride(key: string): string | null {
  const { lang } = useLang();
  const { data } = useSiteContentMap();
  const row = data?.get(key);
  if (!row) return null;
  return (lang === "fr" ? row.value_fr : row.value_en) || null;
}

export type SiteSettings = {
  id: number;
  site_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  default_meta_title: string | null;
  default_meta_description: string | null;
  default_og_image: string | null;
  social_linkedin: string | null;
  social_instagram: string | null;
  social_facebook: string | null;
  social_tiktok: string | null;
  social_x: string | null;
  social_youtube: string | null;
  updated_at: string;
};

export function useSettings() {
  return useQuery<SiteSettings | undefined>({
    queryKey: ["site_settings"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      return data as SiteSettings | undefined;
    },
  });
}
