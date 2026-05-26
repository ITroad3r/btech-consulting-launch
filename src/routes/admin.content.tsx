import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, Save } from "lucide-react";

export const Route = createFileRoute("/admin/content")({
  component: ContentEditor,
});

function ContentEditor() {
  const { data, refetch } = useQuery({
    queryKey: ["site_content_admin"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("*").order("key");
      return data ?? [];
    },
  });

  const [filter, setFilter] = useState("");
  const [newKey, setNewKey] = useState("");

  async function addKey() {
    if (!newKey.trim()) return;
    const { error } = await supabase.from("site_content").insert({ key: newKey.trim(), value_en: "", value_fr: "" });
    if (error) return alert(error.message);
    setNewKey("");
    refetch();
  }

  async function saveRow(row: any) {
    const { error } = await supabase.from("site_content").update({
      value_en: row.value_en, value_fr: row.value_fr, description: row.description,
    }).eq("id", row.id);
    if (error) return alert(error.message);
    refetch();
  }

  async function del(id: string) {
    if (!confirm("Delete this override? The site will fall back to the built-in text.")) return;
    await supabase.from("site_content").delete().eq("id", id);
    refetch();
  }

  const filtered = (data ?? []).filter((r) => r.key.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h1 className="text-3xl font-display font-semibold">Site Content</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Override any text on your website. The <code className="text-xs bg-muted px-1 rounded">key</code> matches a
        translation key (e.g. <code className="text-xs bg-muted px-1 rounded">hero.title</code>,
        <code className="text-xs bg-muted px-1 rounded ml-1">contact.email</code>). Leave blank to use the built-in default.
      </p>

      <div className="mt-6 flex gap-2 flex-wrap">
        <Input placeholder="Search keys…" value={filter} onChange={(e) => setFilter(e.target.value)} className="max-w-xs" />
        <div className="flex gap-2 ml-auto">
          <Input placeholder="new.content.key" value={newKey} onChange={(e) => setNewKey(e.target.value)} className="w-64" />
          <Button onClick={addKey}><Plus size={14} /> Add key</Button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 && (
          <div className="glass rounded-xl p-8 text-center text-muted-foreground">
            No overrides yet. Add a key above (e.g. <code>hero.title</code>) and provide custom EN/FR text — it will replace the default on the site.
          </div>
        )}
        {filtered.map((row) => (
          <ContentRow key={row.id} row={row} onSave={saveRow} onDelete={del} />
        ))}
      </div>
    </div>
  );
}

function ContentRow({ row, onSave, onDelete }: any) {
  const [local, setLocal] = useState(row);
  const dirty = local.value_en !== row.value_en || local.value_fr !== row.value_fr || local.description !== row.description;
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between gap-2">
        <code className="text-sm font-mono text-primary">{row.key}</code>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onSave(local)} disabled={!dirty}><Save size={14} /> Save</Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(row.id)}><Trash2 size={14} /></Button>
        </div>
      </div>
      <Tabs defaultValue="en" className="mt-3">
        <TabsList><TabsTrigger value="en">English</TabsTrigger><TabsTrigger value="fr">Français</TabsTrigger></TabsList>
        <TabsContent value="en"><Textarea rows={2} value={local.value_en ?? ""} onChange={(e) => setLocal({ ...local, value_en: e.target.value })} /></TabsContent>
        <TabsContent value="fr"><Textarea rows={2} value={local.value_fr ?? ""} onChange={(e) => setLocal({ ...local, value_fr: e.target.value })} /></TabsContent>
      </Tabs>
      <Label className="mt-2 text-xs">Note (optional)</Label>
      <Input value={local.description ?? ""} onChange={(e) => setLocal({ ...local, description: e.target.value })} placeholder="What this key controls" />
    </div>
  );
}
