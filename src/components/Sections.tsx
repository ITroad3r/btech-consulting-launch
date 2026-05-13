import {
  ShieldCheck,
  FileSearch,
  Cloud,
  Headphones,
  Globe2,
  Code2,
  Target,
  Sparkles,
  HandshakeIcon,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import parisOffice from "@/assets/paris-office.jpg";

/* ---------- Section wrapper ---------- */
function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-28 md:py-36 px-6 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-mint">
            <span className="h-px w-8 bg-mint/60" />
            {eyebrow}
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-5xl leading-tight">
            {title}
          </h2>
          {intro && (
            <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              {intro}
            </p>
          )}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
export function About() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Excellence Opérationnelle",
      desc: "Méthodologies certifiées ISO 27001 et conformité RGPD intégrées dès la conception de chaque mission.",
    },
    {
      icon: Sparkles,
      title: "Innovation Pragmatique",
      desc: "Adoption raisonnée de l'IA et du Cloud — pour des gains concrets, pas pour la démonstration.",
    },
    {
      icon: HandshakeIcon,
      title: "Engagement Long Terme",
      desc: "Une approche partenariale, sur plusieurs années, alignée avec votre stratégie et vos équipes.",
    },
  ];

  return (
    <Section
      id="a-propos"
      eyebrow="À Propos"
      title={
        <>
          Une approche{" "}
          <span className="text-gradient">boutique</span>, pensée
          pour la précision.
        </>
      }
      intro="Fondé sur la conviction que la technologie doit être un levier de croissance, Btech Consulting privilégie une approche Boutique : expertise technique de haut niveau, équipes seniors et réactivité immédiate."
    >
      <div className="grid lg:grid-cols-5 gap-8 items-stretch">
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden glass">
          <img
            src={parisOffice}
            alt="Bureaux Btech Consulting avec vue sur Paris"
            loading="lazy"
            width={1600}
            height={1200}
            className="w-full h-full object-cover min-h-[340px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-xs uppercase tracking-widest text-mint">
              Implantation
            </div>
            <div className="mt-1 font-display text-xl text-foreground">
              Paris 8ᵉ · La Défense
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 grid gap-4">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="glass rounded-2xl p-6 flex gap-5 hover:border-primary/40 transition-colors group"
            >
              <div className="shrink-0 h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                <p.icon size={20} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg">{p.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Audit & Conseil ---------- */
export function AuditConseil() {
  const services = [
    {
      icon: FileSearch,
      title: "Audit de Sécurité",
      desc: "Pentests applicatifs, audit de code et tests de résilience cyber pour anticiper les menaces.",
      tags: ["Pentest", "Code Review", "Cyber"],
    },
    {
      icon: ShieldCheck,
      title: "GRC — Gouvernance",
      desc: "Gouvernance, Risques et Conformité. Mise en conformité RGPD et certification ISO 27001.",
      tags: ["RGPD", "ISO 27001", "Risques"],
    },
    {
      icon: Cloud,
      title: "Stratégie Cloud",
      desc: "Migration AWS et Azure, architectures hybrides et accompagnement à la transformation digitale.",
      tags: ["AWS", "Azure", "Transformation"],
    },
  ];

  return (
    <Section
      id="audit-conseil"
      eyebrow="Services — Audit & Conseil"
      title={
        <>
          Maîtrise des risques,{" "}
          <span className="text-gradient">conformité, performance.</span>
        </>
      }
      intro="Nous intervenons sur l'ensemble du cycle de gestion des risques IT — de l'audit technique à la mise en conformité réglementaire et à la stratégie Cloud."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {services.map((s) => (
          <article
            key={s.title}
            className="group relative glass rounded-2xl p-7 hover:border-primary/40 transition-all hover:-translate-y-1 duration-300"
          >
            <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 text-primary flex items-center justify-center">
              <s.icon size={22} />
            </div>
            <h3 className="mt-6 font-display text-xl">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-muted-foreground border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Offshoring ---------- */
export function Offshoring() {
  const services = [
    {
      icon: Headphones,
      title: "Infogérance 24/7",
      desc: "Surveillance proactive et support multi-niveaux N1 / N2 / N3 pour assurer la continuité de vos opérations.",
    },
    {
      icon: Globe2,
      title: "Offshoring & Nearshoring",
      desc: "Centres de services globaux : développeurs Full-stack, DevOps et experts Data, pilotés depuis Paris.",
    },
    {
      icon: Code2,
      title: "Développement sur mesure",
      desc: "Solutions logicielles conçues en mode Agile, du MVP à la plateforme de production scalable.",
    },
  ];

  return (
    <Section
      id="offshoring"
      eyebrow="Services — Offshoring & Managed"
      title={
        <>
          Des équipes <span className="text-gradient">scalables</span>,{" "}
          la gouvernance française.
        </>
      }
      intro="Combinez la flexibilité de l'offshoring avec la rigueur d'un pilotage local. Nos centres de services délivrent à coût maîtrisé, sous standards européens."
    >
      <div className="grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden glass">
        {services.map((s) => (
          <div
            key={s.title}
            className="group bg-background/40 p-8 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-mint/15 text-mint flex items-center justify-center">
                <s.icon size={18} />
              </div>
              <h3 className="font-display text-lg">{s.title}</h3>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-mint opacity-0 group-hover:opacity-100 transition-opacity">
              En savoir plus <ArrowRight size={12} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Why Btech ---------- */
export function WhyBtech() {
  const items = [
    { k: "Boutique", v: "Équipes seniors dédiées, pas de sous-traitance pyramidale." },
    { k: "Local", v: "Pilotage et gouvernance basés à Paris, présence à La Défense." },
    { k: "Mesurable", v: "KPIs cyber et SLA contractuels, reporting transparent." },
    { k: "Pragmatique", v: "L'IA et le Cloud au service du ROI, pas du buzz." },
  ];

  return (
    <Section
      id="pourquoi"
      eyebrow="Pourquoi Btech"
      title={
        <>
          Une signature{" "}
          <span className="text-gradient">premium</span>, à la française.
        </>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((i) => (
          <div
            key={i.k}
            className="glass rounded-2xl p-6 hover:border-mint/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Target size={14} className="text-mint" />
              <div className="text-xs uppercase tracking-widest text-mint">
                {i.k}
              </div>
            </div>
            <p className="mt-4 text-sm text-foreground leading-relaxed">
              {i.v}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CTA / Contact ---------- */
export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-mint/15 blur-[120px]" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-mint">
                <span className="h-px w-8 bg-mint/60" />
                Contact
              </div>
              <h2 className="mt-5 font-display text-3xl md:text-5xl leading-tight">
                Parlons de votre <span className="text-gradient">prochain</span> projet.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Échangeons 30 minutes avec un expert senior. Audit, conformité,
                Cloud ou équipes offshore — nous revenons vers vous sous 24 h.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:scale-[1.03] active:scale-[0.98] transition-transform glow-primary"
                >
                  Prendre rendez-vous
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="mailto:contact@btech-consulting.fr"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass text-foreground font-medium text-sm hover:bg-white/5 transition-colors"
                >
                  <Mail size={16} className="text-mint" />
                  Nous écrire
                </a>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                { icon: MapPin, k: "Paris 8ᵉ — QCA", v: "Quartier Central des Affaires" },
                { icon: MapPin, k: "La Défense", v: "Tour de bureaux — Paris-La Défense" },
                { icon: MapPin, k: "Boulogne-Billancourt", v: "Hub technologique Île-de-France" },
                { icon: Phone, k: "+33 1 00 00 00 00", v: "Lun–Ven · 9h–19h CET" },
              ].map((c) => (
                <div
                  key={c.k}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-mint/15 text-mint flex items-center justify-center shrink-0">
                    <c.icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-foreground font-medium">{c.k}</div>
                    <div className="text-xs text-muted-foreground truncate">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-mint flex items-center justify-center font-display font-bold text-background text-sm">
            B
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Btech Consulting · Paris
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          IT Audit · Conseil · Offshoring · GRC · Cloud
        </div>
      </div>
    </footer>
  );
}
