import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Download, X, Search } from "lucide-react";

const STATUSES = [
  "New",
  "Contacted",
  "Call Scheduled",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
  "Spam",
];

const PILLARS = ["IT Audit & Consulting", "IT Offshoring", "Not sure yet"];
const LEAD_TYPES = ["Service Lead", "Discovery Call Request"];

type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  lead_type: string;
  service_pillar: string | null;
  selected_service: string | null;
  need_description: string | null;
  urgency: string | null;
  full_name: string | null;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  preferred_date_time: string | null;
  preferred_contact_method: string | null;
  status: string;
  source: string;
  page_url: string | null;
  user_agent: string | null;
  internal_notes: string | null;
  assigned_to: string | null;
};

export const Route = createFileRoute("/admin/leads")({
  head: () => ({ meta: [{ title: "Leads" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: LeadsPage,
});

function LeadsPage() {
  const qc = useQueryClient();
  const [status, setStatus] = useState("");
  const [pillar, setPillar] = useState("");
  const [leadType, setLeadType] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["admin_leads"],
    queryFn: async (): Promise<Lead[]> => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Lead[];
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      if (status && l.status !== status) return false;
      if (pillar && l.service_pillar !== pillar) return false;
      if (leadType && l.lead_type !== leadType) return false;
      if (q) {
        const hay = [l.full_name, l.company_name, l.email, l.phone].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, status, pillar, leadType, search]);

  const updateLead = useMutation({
    mutationFn: async (patch: Partial<Lead> & { id: string }) => {
      const { id, ...rest } = patch;
      const { error } = await supabase.from("leads").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_leads"] }),
  });

  const exportCsv = () => {
    const cols = [
      "created_at", "full_name", "company_name", "email", "phone",
      "lead_type", "service_pillar", "selected_service", "urgency",
      "preferred_date_time", "preferred_contact_method", "status",
      "need_description", "page_url",
    ] as const;
    const esc = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const rows = [cols.join(","), ...filtered.map((l) => cols.map((c) => esc((l as any)[c])).join(","))];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-display font-semibold">Leads</h1>
          <p className="text-muted-foreground mt-1">Chatbot lead submissions.</p>
        </div>
        <Button onClick={exportCsv} variant="outline" className="gap-2">
          <Download size={16} /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="relative md:col-span-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full rounded-md border pl-8 pr-3 py-2 text-sm bg-background"
            placeholder="Search name, company, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="rounded-md border px-3 py-2 text-sm bg-background" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="rounded-md border px-3 py-2 text-sm bg-background" value={pillar} onChange={(e) => setPillar(e.target.value)}>
          <option value="">All pillars</option>
          {PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="rounded-md border px-3 py-2 text-sm bg-background" value={leadType} onChange={(e) => setLeadType(e.target.value)}>
          <option value="">All lead types</option>
          {LEAD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-3 py-2 font-medium">Date</th>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Company</th>
              <th className="px-3 py-2 font-medium">Type</th>
              <th className="px-3 py-2 font-medium">Pillar</th>
              <th className="px-3 py-2 font-medium">Service</th>
              <th className="px-3 py-2 font-medium">Contact</th>
              <th className="px-3 py-2 font-medium">Urgency</th>
              <th className="px-3 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={9} className="px-3 py-6 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={9} className="px-3 py-6 text-center text-muted-foreground">No leads yet.</td></tr>
            )}
            {filtered.map((l) => (
              <tr key={l.id} onClick={() => setSelected(l)} className="border-t hover:bg-muted/30 cursor-pointer">
                <td className="px-3 py-2 whitespace-nowrap">{new Date(l.created_at).toLocaleString()}</td>
                <td className="px-3 py-2">{l.full_name || "—"}</td>
                <td className="px-3 py-2">{l.company_name || "—"}</td>
                <td className="px-3 py-2">{l.lead_type}</td>
                <td className="px-3 py-2">{l.service_pillar || "—"}</td>
                <td className="px-3 py-2">{l.selected_service || "—"}</td>
                <td className="px-3 py-2">{l.email || l.phone || "—"}</td>
                <td className="px-3 py-2">{l.urgency || "—"}</td>
                <td className="px-3 py-2">
                  <span className="inline-block rounded-full px-2 py-0.5 text-xs bg-primary/10 text-primary">{l.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <LeadDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdate={(patch) => updateLead.mutate({ id: selected.id, ...patch })}
        />
      )}
    </div>
  );
}

function LeadDrawer({ lead, onClose, onUpdate }: { lead: Lead; onClose: () => void; onUpdate: (p: Partial<Lead>) => void }) {
  const [notes, setNotes] = useState(lead.internal_notes ?? "");
  const [status, setStatus] = useState(lead.status);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md h-full bg-background overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold">{lead.full_name || "(no name)"}</h2>
            <p className="text-sm text-muted-foreground">{lead.company_name || "—"}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded"><X size={18} /></button>
        </div>

        <div className="p-5 space-y-4 text-sm">
          <Field label="Lead type" value={lead.lead_type} />
          <Field label="Service pillar" value={lead.service_pillar} />
          <Field label="Selected service" value={lead.selected_service} />
          <Field label="Urgency" value={lead.urgency} />
          <Field label="Need description" value={lead.need_description} pre />
          <Field label="Email" value={lead.email} />
          <Field label="Phone" value={lead.phone} />
          <Field label="Preferred date/time" value={lead.preferred_date_time} />
          <Field label="Preferred contact method" value={lead.preferred_contact_method} />
          <Field label="Page URL" value={lead.page_url} />
          <Field label="User agent" value={lead.user_agent} pre />
          <Field label="Source" value={lead.source} />
          <Field label="Created" value={new Date(lead.created_at).toLocaleString()} />
          <Field label="Updated" value={new Date(lead.updated_at).toLocaleString()} />

          <div>
            <label className="text-xs text-muted-foreground">Status</label>
            <select
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-background"
              value={status}
              onChange={(e) => { setStatus(e.target.value); onUpdate({ status: e.target.value }); }}
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Internal notes</label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-background"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => onUpdate({ internal_notes: notes })}>Save notes</Button>
              {lead.status !== "Contacted" && (
                <Button size="sm" variant="outline" onClick={() => { setStatus("Contacted"); onUpdate({ status: "Contacted" }); }}>
                  Mark as contacted
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, pre }: { label: string; value: string | null | undefined; pre?: boolean }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={"mt-0.5 " + (pre ? "whitespace-pre-wrap break-words" : "")}>{value || <span className="text-muted-foreground">—</span>}</div>
    </div>
  );
}
