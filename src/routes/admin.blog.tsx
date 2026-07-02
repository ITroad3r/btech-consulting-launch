import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2 } from "lucide-react";
import { BlogPostDialog } from "@/components/BlogPostDialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/blog")({
  component: BlogList,
});

function BlogList() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pendingDelete, setPendingDelete] = useState<string[] | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ["admin_blog_posts"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const rows = data ?? [];
  const allSelected = rows.length > 0 && selected.size === rows.length;
  const someSelected = selected.size > 0 && !allSelected;

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(rows.map((r) => r.id)));
  }
  function toggleOne(id: string) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function openNew() { setEditingId(null); setDialogOpen(true); }
  function openEdit(id: string) { setEditingId(id); setDialogOpen(true); }

  async function confirmDelete() {
    if (!pendingDelete) return;
    const ids = pendingDelete;
    setPendingDelete(null);
    const { error } = await supabase.from("blog_posts").delete().in("id", ids);
    if (error) return alert(error.message);
    setSelected((s) => {
      const next = new Set(s);
      ids.forEach((id) => next.delete(id));
      return next;
    });
    refetch();
  }

  const deleteLabel = useMemo(() => {
    if (!pendingDelete) return "";
    if (pendingDelete.length === 1) {
      const p = rows.find((r) => r.id === pendingDelete[0]);
      return `"${p?.title_en || "Untitled"}"`;
    }
    return `${pendingDelete.length} posts`;
  }, [pendingDelete, rows]);

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-display font-semibold">Blog</h1>
          <p className="text-muted-foreground mt-1">Manage all blog articles.</p>
        </div>
        <div className="flex gap-2">
          {selected.size > 0 && (
            <Button variant="destructive" onClick={() => setPendingDelete(Array.from(selected))}>
              <Trash2 size={16} /> Delete {selected.size} selected
            </Button>
          )}
          <Button onClick={openNew}><Plus size={16} /> New post</Button>
        </div>
      </div>

      <div className="mt-6 glass rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase">
            <tr>
              <th className="p-3 w-10">
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Updated</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t" data-state={selected.has(p.id) ? "selected" : undefined}>
                <td className="p-3">
                  <Checkbox
                    checked={selected.has(p.id)}
                    onCheckedChange={() => toggleOne(p.id)}
                    aria-label={`Select ${p.title_en || "post"}`}
                  />
                </td>
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
                  <button onClick={() => setPendingDelete([p.id])} className="p-2 rounded hover:bg-muted text-destructive" title="Delete"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No posts yet. Click "New post".</td></tr>
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

      <AlertDialog open={!!pendingDelete} onOpenChange={(v) => !v && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteLabel}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The selected {pendingDelete && pendingDelete.length > 1 ? "posts" : "post"} will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
