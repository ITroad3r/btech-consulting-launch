import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer, Contact } from "@/components/Sections";
import {
  FileSearch, ShieldCheck, Cloud, Database, Network, Code2, Headphones,
  TestTube2, BarChart3, ClipboardList, ArrowRight, Landmark, Handshake, SearchCheck,
} from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "IT Audit, Consulting & Offshoring Services | Btech Consulting" },
      { name: "description", content: "IT audit, governance, cybersecurity, digital transformation, ERP advisory, DORA, M&A IT due diligence, and managed offshoring from Paris." },
      { property: "og:title", content: "IT Audit, Consulting & Offshoring Services | Btech Consulting" },
      { property: "og:description", content: "Full-spectrum IT audit, consulting, and offshoring services delivered from Paris." },
      { property: "og:url", content: "https://btech-consulting.com/services" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://btech-consulting.com/services" }],
  }),
  component: ServicesPage,
});


const auditIcons = [FileSearch, ShieldCheck, Cloud, Database, Network, Landmark, SearchCheck];
const offshoreIcons = [Code2, Headphones, TestTube2, BarChart3, ClipboardList, Handshake];

function ServiceList({
  items,
  badge,
  icons,
}: {
  items: { title: string; desc: string; items: string[] }[];
  badge: string;
  icons: typeof auditIcons;
}) {
  return (
    <div className="space-y-5">
      {items.map((s, idx) => {
        const Icon = icons[idx] ?? FileSearch;
        return (
          <article key={s.title} className="glass rounded-2xl p-7 md:p-9 hover:border-primary/40 transition-colors">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold">{s.title}</h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-mint px-3 py-1 rounded-full bg-mint/10">{badge}</span>
            </div>
            <p className="mt-5 text-muted-foreground leading-relaxed">{s.desc}</p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground">
              {s.items.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-primary mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

function ServicesPage() {
  const t = useT();
  const sp = t.servicesPage;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            {sp.eyebrow}
            <span className="h-px w-8 bg-primary/60" />
          </div>
          <h1 className="mt-6 font-display font-semibold text-4xl md:text-6xl leading-[1.05]">
            {sp.titleA}<span className="text-gradient">{sp.titleHL}</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed">{sp.sub}</p>
        </div>
      </section>

      <section id="audit" className="py-16 px-6 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">{sp.pillar1Eyebrow}</div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">
            {sp.pillar1TitleA}<span className="text-gradient">{sp.pillar1TitleHL}</span>
          </h2>
          <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">{sp.pillar1Sub}</p>
          <div className="mt-10">
            <ServiceList items={t.auditServices} badge={sp.auditBadge} icons={auditIcons} />
          </div>
        </div>
      </section>

      <section id="offshoring" className="py-16 px-6 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">{sp.pillar2Eyebrow}</div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">
            {sp.pillar2TitleA}<span className="text-gradient">{sp.pillar2TitleHL}</span>
          </h2>
          <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">{sp.pillar2Sub}</p>
          <div className="mt-10">
            <ServiceList items={t.offshoreServices} badge={sp.offshoreBadge} icons={offshoreIcons} />
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">{sp.methodEyebrow}</div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">
            {sp.methodTitleA}<span className="text-gradient">{sp.methodTitleHL}</span>
          </h2>
          <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">{sp.methodSub}</p>
          <div className="mt-12 grid md:grid-cols-5 gap-4">
            {sp.steps.map((s, i) => (
              <div key={s.t} className="glass rounded-2xl p-6">
                <div className="font-display text-2xl text-primary font-semibold tabular-nums">0{i + 1}</div>
                <div className="mt-3 font-semibold text-foreground">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl glass-strong rounded-3xl p-10 md:p-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">{sp.notSureTitle}</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">{sp.notSureText}</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:scale-[1.03] transition-transform glow-primary">
            {sp.notSureCta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
