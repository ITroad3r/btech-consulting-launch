import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE_URL = "https://btech-consulting.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
        ];

        let postEntries: { slug: string; lastmod?: string }[] = [];
        try {
          const { data: posts } = await supabaseAdmin
            .from("blog_posts")
            .select("slug,published_at")
            .eq("status", "published");
          postEntries = (posts ?? []).map((p: any) => ({
            slug: p.slug,
            lastmod: p.published_at ? new Date(p.published_at).toISOString().split("T")[0] : undefined,
          }));
          postEntries.forEach((p) => {
            (["en", "fr"] as const).forEach((lang) => {
              entries.push({
                path: `/blog/${lang}/${p.slug}`,
                lastmod: p.lastmod,
                changefreq: "monthly",
                priority: "0.6",
              });
            });
          });
        } catch (e) {
          // ignore — sitemap still works with static routes
        }

        const urls = entries.map((e) => {
          const isLangPost = /^\/blog\/(en|fr)\//.test(e.path);
          const alt = isLangPost
            ? (() => {
                const [, , , slug] = e.path.split("/");
                return [
                  `    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/blog/en/${slug}" />`,
                  `    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}/blog/fr/${slug}" />`,
                  `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/blog/en/${slug}" />`,
                ].join("\n")
              })()
            : null;
          return [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            alt,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
