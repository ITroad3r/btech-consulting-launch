import { createFileRoute, notFound, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { useLang } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import { SafeHtml } from "@/components/RichEditor";
import { ArrowLeft } from "lucide-react";

type PostLang = "en" | "fr";

export const Route = createFileRoute("/blog/$lang/$slug")({
  beforeLoad: ({ params }) => {
    if (params.lang !== "en" && params.lang !== "fr") {
      throw redirect({ to: "/blog/$lang/$slug", params: { lang: "en", slug: params.slug } });
    }
  },
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "published")
      .maybeSingle();
    if (!data) throw notFound();
    return { post: data };
  },
  head: ({ loaderData, params }) => {
    const p: any = loaderData?.post;
    if (!p) return { meta: [{ title: "Post not found" }] };
    const lang = params.lang as PostLang;
    const title = (lang === "fr" ? p.meta_title_fr || p.title_fr : p.meta_title_en || p.title_en) || p.title_en;
    const desc = (lang === "fr" ? p.meta_description_fr || p.excerpt_fr : p.meta_description_en || p.excerpt_en) || "";
    const base = "https://btech-consulting.com";
    const url = `${base}/blog/${lang}/${params.slug}`;
    const altEn = `${base}/blog/en/${params.slug}`;
    const altFr = `${base}/blog/fr/${params.slug}`;
    const img = p.og_image_url || p.cover_image_url;
    const meta: any[] = [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:locale", content: lang === "fr" ? "fr_FR" : "en_US" },
      { property: "og:locale:alternate", content: lang === "fr" ? "en_US" : "fr_FR" },
    ];
    if (img) {
      meta.push({ property: "og:image", content: img });
      meta.push({ name: "twitter:image", content: img });
    }
    if (p.keywords) meta.push({ name: "keywords", content: p.keywords });
    if (p.noindex) meta.push({ name: "robots", content: "noindex, nofollow" });
    const jsonLd = p.json_ld || {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: lang === "fr" ? p.title_fr : p.title_en,
      description: desc,
      image: img,
      datePublished: p.published_at,
      inLanguage: lang === "fr" ? "fr-FR" : "en-US",
      author: { "@type": "Person", name: p.author || "Btech Consulting" },
    };
    return {
      meta,
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "en", href: altEn },
        { rel: "alternate", hrefLang: "fr", href: altFr },
        { rel: "alternate", hrefLang: "x-default", href: altEn },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { slug, lang: routeLang } = Route.useParams();
  const lang = routeLang as PostLang;
  const { setLang } = useLang();

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  const { data } = useQuery({
    queryKey: ["blog_post_public", slug],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      return data;
    },
    initialData: (Route.useLoaderData() as any)?.post,
  });
  if (!data) return null;
  const title = (lang === "fr" ? data.title_fr : data.title_en) || data.title_en;
  const body = (lang === "fr" ? data.body_html_fr : data.body_html_en) || data.body_html_en || "";
  const otherLang: PostLang = lang === "fr" ? "en" : "fr";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <article className="pt-28 sm:pt-36 md:pt-40 pb-16 md:pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft size={14} /> {lang === "fr" ? "Tous les articles" : "All posts"}
            </Link>
            <Link
              to="/blog/$lang/$slug"
              params={{ lang: otherLang, slug }}
              className="text-xs font-semibold px-3 py-1.5 rounded-md glass hover:border-primary/40"
            >
              {otherLang === "fr" ? "Lire en Français" : "Read in English"}
            </Link>
          </div>
          {data.tags?.[0] && <div className="mt-6 text-xs uppercase tracking-[0.2em] text-primary">{data.tags[0]}</div>}
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
          <div className="mt-4 text-sm text-muted-foreground">
            {data.author && <>{lang === "fr" ? "Par " : "By "}{data.author}</>}
            {data.published_at && <> · {new Date(data.published_at).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US")}</>}
          </div>
          {data.cover_image_url && <img src={data.cover_image_url} alt="" className="mt-8 w-full rounded-2xl" />}
          <SafeHtml html={body} className="prose prose-invert max-w-none mt-10 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_a]:text-primary [&_img]:rounded-xl" />
        </div>
      </article>
      <Footer />
    </main>
  );
}
