import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { ArrowUpRight } from "lucide-react";
import { useT, useLang } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "IT Insights & Expert Articles | Btech Consulting Blog — Paris" },
      { name: "description", content: "Read expert articles on IT audit, cybersecurity, digital transformation, and IT offshoring from the Btech Consulting team in Paris." },
      { property: "og:title", content: "IT Insights & Expert Articles | Btech Consulting Blog" },
      { property: "og:description", content: "Expert articles on IT audit, cybersecurity, digital transformation, and offshoring." },
      { property: "og:url", content: "https://btech-consulting.com/blog" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://btech-consulting.com/blog" }],
  }),
  component: BlogPage,
});


function BlogPage() {
  const t = useT();
  const { lang } = useLang();
  const bp = t.blogPage;

  const { data: posts } = useQuery({
    queryKey: ["public_blog_posts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id,slug,title_en,title_fr,excerpt_en,excerpt_fr,cover_image_url,tags,published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-40 pb-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary/60" />{bp.eyebrow}<span className="h-px w-8 bg-primary/60" />
          </div>
          <h1 className="mt-6 font-display font-semibold text-4xl md:text-6xl leading-[1.05]">
            {bp.titleA}<span className="text-gradient">{bp.titleHL}</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed">{bp.sub}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
        <h2 className="sr-only">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {(posts ?? []).map((p) => {
            const title = (lang === "fr" ? p.title_fr : p.title_en) || p.title_en;
            const excerpt = (lang === "fr" ? p.excerpt_fr : p.excerpt_en) || "";
            return (
              <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group glass rounded-2xl overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {p.cover_image_url && <img src={p.cover_image_url} alt="" className="h-44 w-full object-cover" />}
                <div className="p-7 flex-1 flex flex-col">
                  {p.tags?.[0] && <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">{p.tags[0]}</div>}
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{title}</h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">{excerpt}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                    {bp.read}<ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
          {posts && posts.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-12">No posts published yet.</p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
