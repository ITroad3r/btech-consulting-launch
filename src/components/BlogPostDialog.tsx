import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { RichEditor } from "@/components/RichEditor";
import { Save, Upload, Trash2 } from "lucide-react";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

const EMPTY = {
  slug: "",
  title_en: "", title_fr: "",
  excerpt_en: "", excerpt_fr: "",
  body_html_en: "", body_html_fr: "",
  meta_title_en: "", meta_title_fr: "",
  meta_description_en: "", meta_description_fr: "",
  canonical_url: "", keywords: "", og_image_url: "",
  noindex: false, json_ld: null as any,
  cover_image_url: null as string | null,
  author: "", tags: [] as string[] | string,
  published_at: null as string | null,
  status: "draft" as string,
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  postId: string | null; // null = create new
  onSaved?: () => void;
};

export function BlogPostDialog({ open, onOpenChange, postId, onSaved }: Props) {
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(postId);

  useEffect(() => { setCurrentId(postId); }, [postId, open]);

  const { data, isLoading } = useQuery({
    queryKey: ["blog_post_dialog", currentId],
    enabled: !!currentId && open,
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", currentId!).single();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!open) return;
    if (currentId && data) setForm(data);
    if (!currentId) setForm({ ...EMPTY });
  }, [data, currentId, open]);

  const update = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  async function save(publish?: boolean) {
    setSaving(true);
    const payload: any = { ...form };
    if (typeof payload.tags === "string") {
      payload.tags = payload.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
    }
    if (publish !== undefined) {
      payload.status = publish ? "published" : "draft";
      if (publish && !payload.published_at) payload.published_at = new Date().toISOString();
    }

    if (!currentId) {
      // create
      if (!payload.slug) payload.slug = slugify(payload.title_en || "untitled-" + Date.now());
      if (!payload.title_en) payload.title_en = "Untitled";
      if (!payload.title_fr) payload.title_fr = payload.title_fr || "Sans titre";
      const { data, error } = await supabase.from("blog_posts").insert(payload).select().single();
      setSaving(false);
      if (error) return alert(error.message);
      setCurrentId(data.id);
      setForm(data);
      onSaved?.();
    } else {
      const { id, created_at, updated_at, ...rest } = payload;
      const { error } = await supabase.from("blog_posts").update(rest).eq("id", currentId);
      setSaving(false);
      if (error) return alert(error.message);
      onSaved?.();
      if (publish !== undefined) setForm({ ...form, status: payload.status, published_at: payload.published_at });
    }
  }

  async function uploadCover(file: File) {
    const path = `covers/${Date.now()}-${file.name.replace(/[^a-z0-9.\-_]/gi, "_")}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) return alert(error.message);
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    update("cover_image_url", data.publicUrl);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[95vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b flex-row items-center justify-between space-y-0">
          <DialogTitle>{currentId ? "Edit post" : "New post"}</DialogTitle>
          <div className="flex gap-2 items-center mr-8">
            <span className="text-xs text-muted-foreground">{form.status}</span>
            <Button variant="outline" size="sm" onClick={() => save()} disabled={saving}>
              <Save size={14} /> {currentId ? "Save" : "Create draft"}
            </Button>
            {currentId && (form.status === "published"
              ? <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving}>Unpublish</Button>
              : <Button size="sm" onClick={() => save(true)} disabled={saving}>Publish</Button>)}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {currentId && isLoading ? (
            <div className="text-muted-foreground">Loading…</div>
          ) : (
            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="meta">Meta</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6 mt-6">
                <div>
                  <Label>Slug (URL)</Label>
                  <div className="flex gap-2">
                    <Input value={form.slug ?? ""} onChange={(e) => update("slug", slugify(e.target.value))} />
                    <Button variant="outline" type="button" onClick={() => update("slug", slugify(form.title_en))}>From title</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">URL: /blog/{form.slug || "…"}</p>
                </div>

                <Tabs defaultValue="en">
                  <TabsList><TabsTrigger value="en">English</TabsTrigger><TabsTrigger value="fr">Français</TabsTrigger></TabsList>
                  {(["en", "fr"] as const).map((lang) => (
                    <TabsContent key={lang} value={lang} className="space-y-4 mt-4">
                      <div>
                        <Label>Title</Label>
                        <Input value={form[`title_${lang}`] ?? ""} onChange={(e) => update(`title_${lang}`, e.target.value)} className="text-lg" />
                      </div>
                      <div>
                        <Label>Excerpt (short summary)</Label>
                        <Textarea rows={3} value={form[`excerpt_${lang}`] ?? ""} onChange={(e) => update(`excerpt_${lang}`, e.target.value)} />
                      </div>
                      <div>
                        <Label>Body</Label>
                        <RichEditor value={form[`body_html_${lang}`] ?? ""} onChange={(v) => update(`body_html_${lang}`, v)} placeholder="Write the article body…" />
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 mt-6">
                <p className="text-sm text-muted-foreground">SEO controls applied to the published blog post page.</p>
                {(["en", "fr"] as const).map((lang) => (
                  <div key={lang} className="glass rounded-lg p-4 space-y-3">
                    <div className="font-medium uppercase text-xs text-primary">{lang}</div>
                    <div>
                      <Label>Meta title <span className="text-xs text-muted-foreground">({(form[`meta_title_${lang}`] ?? "").length}/60)</span></Label>
                      <Input maxLength={70} value={form[`meta_title_${lang}`] ?? ""} onChange={(e) => update(`meta_title_${lang}`, e.target.value)} placeholder={form[`title_${lang}`]} />
                    </div>
                    <div>
                      <Label>Meta description <span className="text-xs text-muted-foreground">({(form[`meta_description_${lang}`] ?? "").length}/160)</span></Label>
                      <Textarea rows={2} maxLength={200} value={form[`meta_description_${lang}`] ?? ""} onChange={(e) => update(`meta_description_${lang}`, e.target.value)} placeholder={form[`excerpt_${lang}`]} />
                    </div>
                  </div>
                ))}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Canonical URL (optional)</Label>
                    <Input value={form.canonical_url ?? ""} onChange={(e) => update("canonical_url", e.target.value)} placeholder="https://btech-consulting.com/blog/…" />
                  </div>
                  <div>
                    <Label>Keywords (comma separated)</Label>
                    <Input value={form.keywords ?? ""} onChange={(e) => update("keywords", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>OG / share image URL</Label>
                    <Input value={form.og_image_url ?? ""} onChange={(e) => update("og_image_url", e.target.value)} placeholder="Falls back to cover image" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={!!form.noindex} onCheckedChange={(v) => update("noindex", v)} />
                  <Label className="!m-0">noindex (hide from search engines)</Label>
                </div>
                <div>
                  <Label>Custom JSON-LD (advanced, optional)</Label>
                  <Textarea rows={6} value={form.json_ld ? JSON.stringify(form.json_ld, null, 2) : ""}
                    onChange={(e) => {
                      try { update("json_ld", e.target.value ? JSON.parse(e.target.value) : null); }
                      catch { /* ignore until valid */ }
                    }}
                    placeholder='Leave empty for auto-generated Article schema'
                    className="font-mono text-xs"
                  />
                </div>
              </TabsContent>

              <TabsContent value="meta" className="space-y-4 mt-6">
                <div>
                  <Label>Cover image</Label>
                  {form.cover_image_url && (
                    <div className="my-2 relative inline-block">
                      <img src={form.cover_image_url} alt="" className="max-h-48 rounded" />
                      <button onClick={() => update("cover_image_url", null)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2 items-center">
                    <Input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); }} />
                    <Upload size={16} className="text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <Label>Author</Label>
                  <Input value={form.author ?? ""} onChange={(e) => update("author", e.target.value)} />
                </div>
                <div>
                  <Label>Tags (comma separated)</Label>
                  <Input
                    value={Array.isArray(form.tags) ? form.tags.join(", ") : (form.tags ?? "")}
                    onChange={(e) => update("tags", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Published at</Label>
                  <Input type="datetime-local"
                    value={form.published_at ? new Date(form.published_at).toISOString().slice(0, 16) : ""}
                    onChange={(e) => update("published_at", e.target.value ? new Date(e.target.value).toISOString() : null)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
