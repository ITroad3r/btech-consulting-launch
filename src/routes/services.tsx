import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer, Contact } from "@/components/Sections";
import {
  FileSearch,
  ShieldCheck,
  Cloud,
  Database,
  Network,
  Code2,
  Headphones,
  TestTube2,
  BarChart3,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "IT Audit, Consulting & Offshoring Services | Btech Consulting Paris" },
      {
        name: "description",
        content:
          "Explore Btech Consulting's full range of services: IT audit, governance, cybersecurity consulting, digital transformation, and IT offshoring from Paris, France.",
      },
    ],
  }),
  component: ServicesPage,
});

const audit = [
  {
    icon: FileSearch,
    title: "IT Governance & Compliance Audit",
    desc: "We assess your IT governance against COBIT 2019 and ITIL frameworks — executive audit report, risk register, and prioritised remediation roadmap.",
    items: [
      "Policy and procedure review",
      "IT steering committee effectiveness",
      "Vendor and contract management review",
      "Regulatory compliance gap analysis (GDPR, DORA, NIS2)",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Risk Assessment",
    desc: "Structured, evidence-based view of your attack surface — so you invest in the right defences.",
    items: [
      "Vulnerability and penetration test scoping",
      "ISO 27001 gap analysis",
      "Identity & access management review",
      "Incident response readiness evaluation",
      "Third-party and supply chain risk review",
    ],
  },
  {
    icon: Cloud,
    title: "Digital Transformation Consulting",
    desc: "Align technology investment with business strategy and ensure your transformation delivers real ROI.",
    items: [
      "Current-state IT architecture assessment",
      "Cloud migration strategy and readiness",
      "Process automation opportunity mapping",
      "Technology vendor selection support",
      "Transformation programme governance",
    ],
  },
  {
    icon: Database,
    title: "ERP & Software Implementation Advisory",
    desc: "Independent oversight to protect your investment — reviewing vendor proposals, managing implementation risk, and ensuring delivery accountability.",
    items: [
      "RFP and vendor evaluation support",
      "Implementation risk management",
      "Testing strategy and UAT oversight",
      "Go-live readiness assessment",
      "Post-implementation review",
    ],
  },
  {
    icon: Network,
    title: "IT Infrastructure Review",
    desc: "Hardware, network, data centre, and cloud architecture review — identifying bottlenecks, single points of failure, and modernisation opportunities.",
    items: [
      "Network architecture and performance review",
      "Data centre and cloud environment assessment",
      "Disaster recovery and business continuity review",
      "IT asset and licence management audit",
    ],
  },
];

const offshore = [
  {
    icon: Code2,
    title: "Offshore Software Development Teams",
    desc: "Build dedicated, scalable squads — from a single developer to a full-stack team — vetted by Btech and integrated into your processes.",
    items: [
      "Full-stack, front-end, back-end, mobile developers",
      "Dedicated or shared team models",
      "Agile / Scrum / Kanban delivery",
      "Daily stand-ups and transparent reporting",
      "IP protection and NDAs as standard",
    ],
  },
  {
    icon: Headphones,
    title: "Managed IT Support & Helpdesk",
    desc: "24/7 or business-hours support delivered offshore, supervised and quality-managed from Paris.",
    items: [
      "L1, L2, and L3 helpdesk support",
      "ITSM tool integration (ServiceNow, Jira)",
      "Multilingual support capability",
      "SLA-driven performance reporting",
    ],
  },
  {
    icon: TestTube2,
    title: "QA & Testing Outsourcing",
    desc: "Dedicated QA teams to test your software rigorously, reduce defect rates, and accelerate release cycles.",
    items: [
      "Manual and automated testing",
      "Performance and load testing",
      "Mobile and cross-browser testing",
      "Test strategy design and documentation",
    ],
  },
  {
    icon: BarChart3,
    title: "Data Management & Analytics",
    desc: "Offshore data engineers, analysts and BI developers — managed by Btech for data quality, security and delivery excellence.",
    items: [
      "Data pipeline engineering",
      "Business intelligence and dashboarding",
      "Data quality and governance",
      "Machine learning model support",
    ],
  },
  {
    icon: ClipboardList,
    title: "Project Management as a Service",
    desc: "Experienced offshore PMs and Scrum Masters keeping your projects on time, on budget, and aligned to business goals.",
    items: [
      "Sprint and release planning",
      "Stakeholder reporting and escalation",
      "Risk and dependency tracking",
      "Agile coaching and process improvement",
    ],
  },
];

const steps = [
  { t: "Initial Consultation", d: "Free 30 minutes to define your challenge and explore how we can help." },
  { t: "Proposal & Scope", d: "A detailed proposal with fixed scope, timeline, and pricing." },
  { t: "Kick-off & Onboarding", d: "Meet your dedicated team or consultant. Agree on communication cadences." },
  { t: "Delivery", d: "Structured, transparent delivery with regular touchpoints and milestone reporting." },
  { t: "Review & Extension", d: "End-of-engagement review, lessons learned, and discussion of ongoing needs." },
];

function ServiceList({
  items,
  badge,
}: {
  items: typeof audit;
  badge: string;
}) {
  return (
    <div className="space-y-5">
      {items.map((s) => (
        <article
          key={s.title}
          className="glass rounded-2xl p-7 md:p-9 hover:border-primary/40 transition-colors"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <s.icon size={22} />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold">{s.title}</h3>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-mint px-3 py-1 rounded-full bg-mint/10">
              {badge}
            </span>
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
      ))}
    </div>
  );
}

function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            Services
            <span className="h-px w-8 bg-primary/60" />
          </div>
          <h1 className="mt-6 font-display font-semibold text-4xl md:text-6xl leading-[1.05]">
            Two Service Pillars.{" "}
            <span className="text-gradient">One Trusted Partner.</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed">
            From in-depth IT audits to scalable offshore development teams —
            Btech Consulting delivers the expertise you need, exactly when you
            need it.
          </p>
        </div>
      </section>

      <section id="audit" className="py-16 px-6 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">Pillar 01</div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">
            IT Audit & <span className="text-gradient">Consulting</span>
          </h2>
          <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">
            Independent, authoritative assessments across IT governance, risk,
            and compliance — helping you meet regulatory requirements, protect
            critical assets, and optimise your technology investments.
          </p>
          <div className="mt-10">
            <ServiceList items={audit} badge="Audit & Consulting" />
          </div>
        </div>
      </section>

      <section id="offshoring" className="py-16 px-6 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">Pillar 02</div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">
            IT <span className="text-gradient">Offshoring</span>
          </h2>
          <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">
            A managed, Paris-supervised delivery model combining cost
            efficiency with uncompromising quality. We handle talent sourcing,
            vetting, onboarding, day-to-day management, QA and reporting.
          </p>
          <div className="mt-10">
            <ServiceList items={offshore} badge="Offshoring" />
          </div>
        </div>
      </section>

      {/* Engagement model */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">How We Work</div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">
            Our <span className="text-gradient">engagement model.</span>
          </h2>
          <div className="mt-12 grid md:grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <div key={s.t} className="glass rounded-2xl p-6">
                <div className="font-display text-2xl text-primary font-semibold tabular-nums">
                  0{i + 1}
                </div>
                <div className="mt-3 font-semibold text-foreground">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not sure */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl glass-strong rounded-3xl p-10 md:p-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Not Sure Where to Start?
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Book a free 30-minute consultation with one of our experts. No
            commitment, no pressure — just an honest conversation about your IT
            challenges.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:scale-[1.03] transition-transform glow-primary"
          >
            Book a Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
