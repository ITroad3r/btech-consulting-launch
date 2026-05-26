import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const { data } = useQuery({
    queryKey: ["site_settings_admin"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      return data;
    },
  });
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!form) return <div>Loading…</div>;

  const u = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  async function save() {
    setSaving(true);
    const { error } = await supabase.from("site_settings").update(form).eq("id", 1);
    setSaving(false);
    if (error) return alert(error.message);
    qc.invalidateQueries({ queryKey: ["site_settings"] });
    alert("Saved");
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-display font-semibold">Settings</h1>
      <p className="text-muted-foreground mt-2">Contact info, social links and default SEO.</p>

      <div className="mt-6 space-y-6">
        <section className="glass rounded-xl p-5 space-y-3">
          <h2 className="font-medium">Site</h2>
          <div><Label>Site name</Label><Input value={form.site_name ?? ""} onChange={(e) => u("site_name", e.target.value)} /></div>
          <div><Label>Default meta title</Label><Input value={form.default_meta_title ?? ""} onChange={(e) => u("default_meta_title", e.target.value)} /></div>
          <div><Label>Default meta description</Label><Textarea rows={2} value={form.default_meta_description ?? ""} onChange={(e) => u("default_meta_description", e.target.value)} /></div>
          <div><Label>Default OG image URL</Label><Input value={form.default_og_image ?? ""} onChange={(e) => u("default_og_image", e.target.value)} /></div>
        </section>

        <section className="glass rounded-xl p-5 space-y-3">
          <h2 className="font-medium">Contact</h2>
          <div><Label>Email</Label><Input value={form.contact_email ?? ""} onChange={(e) => u("contact_email", e.target.value)} /></div>
          <div><Label>Phone</Label><Input value={form.contact_phone ?? ""} onChange={(e) => u("contact_phone", e.target.value)} /></div>
          <div><Label>Address</Label><Input value={form.contact_address ?? ""} onChange={(e) => u("contact_address", e.target.value)} /></div>
        </section>

        <section className="glass rounded-xl p-5 space-y-3">
          <h2 className="font-medium">Social links</h2>
          {[
            ["social_x", "X (Twitter)"],
            ["social_linkedin", "LinkedIn"],
            ["social_instagram", "Instagram"],
            ["social_facebook", "Facebook"],
            ["social_tiktok", "TikTok"],
            ["social_youtube", "YouTube"],
          ].map(([k, l]) => (
            <div key={k}><Label>{l}</Label><Input value={form[k] ?? ""} onChange={(e) => u(k, e.target.value)} /></div>
          ))}
        </section>

        <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save settings"}</Button>
      </div>
    </div>
  );
}
