import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, FileEdit, Settings } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin_stats"],
    queryFn: async () => {
      const [{ count: posts }, { count: drafts }] = await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
      ]);
      return { posts: posts ?? 0, drafts: drafts ?? 0 };
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-display font-semibold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Manage your website content, blog and settings.</p>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-6">
          <div className="text-sm text-muted-foreground">Published posts</div>
          <div className="text-3xl font-semibold mt-1">{stats?.posts ?? "—"}</div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="text-sm text-muted-foreground">Drafts</div>
          <div className="text-3xl font-semibold mt-1">{stats?.drafts ?? "—"}</div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="text-sm text-muted-foreground">Languages</div>
          <div className="text-3xl font-semibold mt-1">EN / FR</div>
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <Link to="/admin/blog" className="glass rounded-xl p-6 hover:border-primary/40 transition">
          <FileText className="text-primary" /><div className="mt-3 font-medium">Blog posts</div>
          <p className="text-xs text-muted-foreground mt-1">Create and edit articles with rich text and full SEO.</p>
        </Link>
        <Link to="/admin/content" className="glass rounded-xl p-6 hover:border-primary/40 transition">
          <FileEdit className="text-primary" /><div className="mt-3 font-medium">Site content</div>
          <p className="text-xs text-muted-foreground mt-1">Override any text on the website (EN/FR).</p>
        </Link>
        <Link to="/admin/settings" className="glass rounded-xl p-6 hover:border-primary/40 transition">
          <Settings className="text-primary" /><div className="mt-3 font-medium">Settings</div>
          <p className="text-xs text-muted-foreground mt-1">Contact info, social links, default SEO.</p>
        </Link>
      </div>
    </div>
  );
}
