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
  Building2,
  Heart,
  ShoppingBag,
  Factory,
  Landmark,
  Radio,
  GraduationCap,
  Quote,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import parisOffice from "@/assets/paris-office.jpg";
import logoFooter from "@/assets/btech-logo.jpeg";

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
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
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

/* ---------- About / Who We Are ---------- */
export function About() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Specialised Expertise",
      desc: "We focus exclusively on IT — no distractions, no generalist compromise. Every engagement benefits from deep, domain-specific knowledge.",
    },
    {
      icon: Sparkles,
      title: "Paris-Based, Globally Connected",
      desc: "Our Paris headquarters gives you a European anchor with access to a global talent network and international delivery capabilities.",
    },
    {
      icon: HandshakeIcon,
      title: "Human-First Approach",
      desc: "Technology serves people. Our consultants understand your culture, constraints, and ambitions before recommending a single solution.",
    },
  ];

  return (
    <Section
      id="about"
      eyebrow="Who We Are"
      title={
        <>
          The agility of a{" "}
          <span className="text-gradient">specialised boutique</span>, the rigour of a global leader.
        </>
      }
      intro="Btech Consulting is a leading IT advisory firm based in Paris, France. We help organisations harness the full power of technology while managing risk, reducing costs, and accelerating growth — with tailored, actionable strategies, not one-size-fits-all reports."
    >
      <div className="grid lg:grid-cols-5 gap-8 items-stretch">
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden glass">
          <img
            src={parisOffice}
            alt="Btech Consulting headquarters in Paris"
            loading="lazy"
            width={1600}
            height={1200}
            className="w-full h-full object-cover min-h-[340px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-xs uppercase tracking-widest text-primary">
              Headquarters
            </div>
            <div className="mt-1 font-display text-xl text-foreground font-semibold">
              Paris · France
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
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all"
          >
            Learn more about Btech Consulting <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Services Overview (Audit & Consulting) ---------- */
export function AuditConseil() {
  const services = [
    {
      icon: FileSearch,
      title: "IT Governance & Compliance",
      desc: "Governance audits aligned with COBIT 2019 and ITIL — gap analysis, risk register, and a prioritised remediation roadmap.",
      tags: ["COBIT", "GDPR", "DORA", "NIS2"],
    },
    {
      icon: ShieldCheck,
      title: "Cybersecurity Risk Assessment",
      desc: "Structured, evidence-based view of your attack surface — from vulnerability scoping to incident response readiness.",
      tags: ["ISO 27001", "IAM", "Pentest"],
    },
    {
      icon: Cloud,
      title: "Digital Transformation",
      desc: "Cut through the noise — align technology investment with business strategy and ensure your roadmap delivers real ROI.",
      tags: ["Cloud", "Automation", "Architecture"],
    },
  ];

  return (
    <Section
      id="audit-consulting"
      eyebrow="Service Pillar 01 — IT Audit & Consulting"
      title={
        <>
          Independent assessments.{" "}
          <span className="text-gradient">Boardroom-ready insights.</span>
        </>
      }
      intro="Your technology infrastructure is only as strong as your understanding of it. We deliver authoritative assessments across IT governance, risk, and compliance — helping you meet regulations, protect assets, and optimise investments."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {services.map((s) => (
          <article
            key={s.title}
            className="group relative glass rounded-2xl p-7 hover:border-primary/40 transition-all hover:-translate-y-1 duration-300"
          >
            <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 text-primary flex items-center justify-center">
              <s.icon size={22} />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-primary/5 text-muted-foreground border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all"
        >
          Explore IT Audit & Consulting <ArrowRight size={14} />
        </Link>
      </div>
    </Section>
  );
}

/* ---------- Offshoring ---------- */
export function Offshoring() {
  const services = [
    {
      icon: Code2,
      title: "Offshore Development Teams",
      desc: "Dedicated, scalable squads — full-stack, front-end, back-end, mobile — integrated into your processes and culture.",
    },
    {
      icon: Headphones,
      title: "Managed IT Support & Helpdesk",
      desc: "L1, L2 and L3 helpdesk delivered offshore, supervised from Paris. ITSM-integrated, multilingual, SLA-driven.",
    },
    {
      icon: Globe2,
      title: "QA, Data & Project Management",
      desc: "Testing, BI, data engineering and offshore PMs / Scrum Masters — managed end-to-end by Btech Consulting.",
    },
  ];

  return (
    <Section
      id="offshoring"
      eyebrow="Service Pillar 02 — IT Offshoring"
      title={
        <>
          World-class technology talent,{" "}
          <span className="text-gradient">Paris-supervised delivery.</span>
        </>
      }
      intro="Scale your technology capabilities without scaling your overhead. We handle talent sourcing, technical vetting, onboarding, day-to-day management, QA and reporting — you get the results without the complexity."
    >
      <div className="grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden glass">
        {services.map((s) => (
          <div
            key={s.title}
            className="group bg-background/60 p-8 hover:bg-primary/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-mint/15 text-mint flex items-center justify-center">
                <s.icon size={18} />
              </div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Learn more <ArrowRight size={12} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all"
        >
          Explore IT Offshoring <ArrowRight size={14} />
        </Link>
      </div>
    </Section>
  );
}

/* ---------- Why Btech ---------- */
export function WhyBtech() {
  const items = [
    { k: "Specialised", v: "Exclusive focus on IT — no generalist compromise." },
    { k: "Transparent", v: "Fixed scope, timeline, and outcomes agreed upfront." },
    { k: "Human-First", v: "We understand your culture before recommending solutions." },
    { k: "Proven Methods", v: "COBIT, ISO 27001, ITIL 4 and GDPR frameworks." },
  ];

  return (
    <Section
      id="why-btech"
      eyebrow="Why Btech Consulting"
      title={
        <>
          A refreshing alternative{" "}
          <span className="text-gradient">to the big four.</span>
        </>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((i) => (
          <div
            key={i.k}
            className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Target size={14} className="text-primary" />
              <div className="text-xs uppercase tracking-widest text-primary font-medium">
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

/* ---------- Industries ---------- */
export function Industries() {
  const items = [
    { icon: Landmark, label: "Financial Services & Banking" },
    { icon: Heart, label: "Healthcare & Life Sciences" },
    { icon: ShoppingBag, label: "Retail & E-Commerce" },
    { icon: Factory, label: "Manufacturing & Industry 4.0" },
    { icon: Building2, label: "Public Sector & Government" },
    { icon: Radio, label: "Telecoms & Media" },
    { icon: GraduationCap, label: "Education & EdTech" },
  ];

  return (
    <Section
      id="industries"
      eyebrow="Industries We Serve"
      title={
        <>
          Sector expertise{" "}
          <span className="text-gradient">across the European market.</span>
        </>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((i) => (
          <div
            key={i.label}
            className="glass rounded-xl p-5 flex items-center gap-3 hover:border-primary/40 transition-colors"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <i.icon size={18} />
            </div>
            <div className="text-sm font-medium text-foreground">{i.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Testimonials ---------- */
export function Testimonials() {
  const quotes = [
    {
      q: "Btech Consulting's IT audit uncovered gaps we hadn't seen in years of internal reviews. Their recommendations were practical, prioritised, and implemented within weeks — not months.",
      a: "Head of IT, French Industrial Group",
    },
    {
      q: "We scaled our development team from 3 to 15 engineers in under two months through Btech's offshoring programme. The quality and communication exceeded our expectations.",
      a: "CTO, Paris-based FinTech Startup",
    },
    {
      q: "A refreshing alternative to the big four — same rigour, faster turnaround, and they actually listen.",
      a: "IT Director, European Retail Chain",
    },
  ];

  return (
    <Section
      id="testimonials"
      eyebrow="What Our Clients Say"
      title={
        <>
          Trusted by leaders{" "}
          <span className="text-gradient">who measure outcomes.</span>
        </>
      }
    >
      <div className="grid md:grid-cols-3 gap-5">
        {quotes.map((t, i) => (
          <figure
            key={i}
            className="glass rounded-2xl p-7 flex flex-col hover:border-primary/40 transition-colors"
          >
            <Quote size={22} className="text-primary/60" />
            <blockquote className="mt-4 text-sm text-foreground leading-relaxed flex-1">
              {t.q}
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-border text-xs text-muted-foreground">
              {t.a}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CTA / Contact ---------- */
export function Contact() {
  return (
    <section id="contact-cta" className="relative py-28 md:py-36 px-6 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/25 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-mint/15 blur-[120px]" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
                <span className="h-px w-8 bg-primary/60" />
                Get in touch
              </div>
              <h2 className="mt-5 font-display text-3xl md:text-5xl leading-tight">
                Ready to <span className="text-gradient">transform</span> your IT?
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Whether you need a comprehensive IT audit, strategic consulting,
                or a world-class offshore development team — Btech Consulting
                is ready to help. Book a free 30-minute consultation, no
                commitment.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:scale-[1.03] active:scale-[0.98] transition-transform glow-primary"
                >
                  Request a Free Consultation
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass text-foreground font-medium text-sm hover:bg-primary/5 transition-colors"
                >
                  View Our Services
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                { icon: MapPin, k: "Paris, France", v: "Btech Consulting HQ" },
                { icon: Mail, k: "contact@btech-consulting.fr", v: "We reply within 24 h" },
                { icon: Phone, k: "+33 1 00 00 00 00", v: "Mon–Fri · 9am–7pm CET" },
                { icon: Globe2, k: "Global Delivery", v: "European & international clients" },
              ].map((c) => (
                <div
                  key={c.k}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <c.icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-foreground font-medium truncate">{c.k}</div>
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
  const cols = [
    {
      title: "Services",
      links: [
        "IT Audit & Consulting",
        "Cybersecurity Assessment",
        "Digital Transformation",
        "IT Offshoring",
        "Managed IT Support",
      ],
    },
    {
      title: "Resources",
      links: ["Blog & Insights", "Case Studies", "White Papers", "FAQ"],
    },
    {
      title: "Company",
      links: ["About Us", "Contact", "Request a Consultation", "Paris Office"],
    },
  ];

  return (
    <footer className="border-t border-border px-6 pt-20 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <img src={logoFooter} alt="Btech Consulting" className="h-9 w-auto" />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Precision IT. Real Results. Paris-based. Globally delivered.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Btech Consulting. All rights reserved.
          </div>
          <div className="text-xs text-muted-foreground space-x-4">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Legal Notice</span>
            <span className="hover:text-foreground cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
