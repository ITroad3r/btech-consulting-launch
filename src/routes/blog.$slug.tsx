import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { useLang } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import { SafeHtml } from "@/components/RichEditor";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
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
    const title = p.meta_title_en || p.title_en;
    const desc = p.meta_description_en || p.excerpt_en || "";
    const url = `https://btech-consulting.com/blog/${params.slug}`;
    const img = p.og_image_url || p.cover_image_url;
    const meta: any[] = [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
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
      headline: p.title_en,
      description: desc,
      image: img,
      datePublished: p.published_at,
      author: { "@type": "Person", name: p.author || "Btech Consulting" },
    };
    return {
      meta,
      links: [{ rel: "canonical", href: p.canonical_url || url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const { lang } = useLang();
  const { data } = useQuery({
    queryKey: ["blog_post_public", slug],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      return data;
    },
    initialData: (Route.useLoaderData() as any)?.post,
  });
  if (!data) return null;
  const title = (lang === "fr" ? data.title_fr : data.title_en) || data.title_en;
  const body = (lang === "fr" ? data.body_html_fr : data.body_html_en) || data.body_html_en || "";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <article className="pt-28 sm:pt-36 md:pt-40 pb-16 md:pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft size={14} /> All posts
          </Link>
          {data.tags?.[0] && <div className="mt-6 text-xs uppercase tracking-[0.2em] text-primary">{data.tags[0]}</div>}
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
          <div className="mt-4 text-sm text-muted-foreground">
            {data.author && <>By {data.author}</>}
            {data.published_at && <> · {new Date(data.published_at).toLocaleDateString()}</>}
          </div>
          {data.cover_image_url && <img src={data.cover_image_url} alt="" className="mt-8 w-full rounded-2xl" />}
          <SafeHtml html={body} className="prose prose-invert max-w-none mt-10 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_a]:text-primary [&_img]:rounded-xl" />
        </div>
      </article>
      <Footer />
    </main>
  );
}
