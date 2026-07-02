import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { BlogPostDialog } from "@/components/BlogPostDialog";

export const Route = createFileRoute("/admin/blog")({
  component: BlogList,
});

function BlogList() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ["admin_blog_posts"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  function openNew() {
    setEditingId(null);
    setDialogOpen(true);
  }
  function openEdit(id: string) {
    setEditingId(id);
    setDialogOpen(true);
  }

  async function del(id: string) {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    refetch();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-semibold">Blog</h1>
          <p className="text-muted-foreground mt-1">Manage all blog articles.</p>
        </div>
        <Button onClick={openNew}><Plus size={16} /> New post</Button>
      </div>

      <div className="mt-6 glass rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Updated</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  <button className="hover:text-primary text-left" onClick={() => openEdit(p.id)}>
                    {p.title_en || <em className="text-muted-foreground">Untitled</em>}
                  </button>
                </td>
                <td className="p-3 text-xs text-muted-foreground">{p.slug}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === "published" ? "bg-primary/20 text-primary" : "bg-muted"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-3 text-xs text-muted-foreground">{new Date(p.updated_at).toLocaleDateString()}</td>
                <td className="p-3 flex gap-2 justify-end">
                  <button onClick={() => openEdit(p.id)} className="p-2 rounded hover:bg-muted" title="Edit"><Edit size={14} /></button>
                  <button onClick={() => del(p.id)} className="p-2 rounded hover:bg-muted text-destructive" title="Delete"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {data && data.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No posts yet. Click "New post".</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <BlogPostDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        postId={editingId}
        onSaved={() => refetch()}
      />
    </div>
  );
}
