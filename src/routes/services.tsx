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
  Landmark,
  Handshake,
  SearchCheck,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "IT Audit, Consulting & Offshoring Services | Btech Consulting Paris" },
      {
        name: "description",
        content:
          "Explore Btech Consulting's full range of services: IT audit, governance, cybersecurity, digital transformation, ERP advisory, DORA, M&A IT due diligence, and managed IT offshoring from Paris.",
      },
    ],
  }),
  component: ServicesPage,
});

const audit = [
  {
    icon: FileSearch,
    title: "IT Governance & Compliance Audit",
    desc: "An independent assessment of how well your organisation governs its technology — benchmarked against COBIT 2019, ITIL 4, ISO/IEC 38500 — with a clear roadmap for improvement, board-ready reporting, and regulatory alignment (GDPR, NIS2, DORA).",
    items: [
      "IT strategy alignment with board priorities",
      "IT steering committee structure and effectiveness",
      "IT policy framework — completeness and enforcement",
      "Vendor and third-party contract governance",
      "IT risk management framework maturity",
      "Change and release governance",
      "Regulatory compliance posture (GDPR, NIS2, DORA)",
      "Executive summary + COBIT maturity scorecard + remediation roadmap",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Risk Assessment",
    desc: "A structured, evidence-based evaluation of your information security posture against ISO/IEC 27001:2022 and the NIST Cybersecurity Framework — identifying vulnerabilities, assessing controls, and delivering a prioritised improvement plan focused on real risk reduction.",
    items: [
      "ISMS review against all 93 ISO 27001:2022 Annex A controls",
      "Identity, access and privileged account review",
      "Network and endpoint security architecture",
      "Cloud security posture (AWS, Azure, GCP)",
      "Third-party and supply chain risk",
      "Incident detection, response and recovery readiness",
      "External attack surface summary",
      "Risk heat map and 90-day / 6-month / 12-month roadmap",
    ],
  },
  {
    icon: Cloud,
    title: "Digital Transformation Consulting",
    desc: "We help you design transformation strategies grounded in business reality — scoped realistically and built to deliver measurable value at every stage, not just at the end of a multi-year programme.",
    items: [
      "Current-state IT architecture and technical debt analysis",
      "Digital maturity benchmarking across 5 dimensions",
      "Cloud strategy: public, private, hybrid, multi-cloud",
      "Cloud migration planning and readiness",
      "Process automation, RPA and AI opportunity mapping",
      "Vendor selection and RFP support",
      "Phased roadmap: 90-day wins, 6-month builds, 12–24-month initiatives",
      "Programme governance model and RACI",
    ],
  },
  {
    icon: Database,
    title: "ERP & Enterprise Software Advisory",
    desc: "Independent oversight across the full ERP lifecycle — from vendor selection to post-go-live — protecting your investment by managing delivery risk and keeping the programme aligned to business outcomes.",
    items: [
      "Business requirements definition and RFP design",
      "Vendor evaluation, scoring and contract negotiation",
      "Implementation partner selection",
      "Programme governance and PMO establishment",
      "Data migration strategy and quality oversight",
      "Testing strategy, UAT planning and sign-off",
      "Go-live readiness assessment",
      "Experience across SAP S/4HANA, MS Dynamics 365, Oracle NetSuite, Sage, Odoo, Salesforce",
    ],
  },
  {
    icon: Network,
    title: "IT Infrastructure Review",
    desc: "A comprehensive, independent assessment of your technical environment — surfacing performance bottlenecks, resilience gaps, security weaknesses and cost optimisation opportunities across on-premise, cloud and hybrid estates.",
    items: [
      "Network architecture, segmentation and remote access",
      "Server, cloud and storage capacity review",
      "Disaster recovery and BCP — RTO/RPO achievability",
      "Backup integrity and recovery testing",
      "IT asset and software licence compliance",
      "Cloud cost optimisation recommendations",
      "End-user computing and MDM review",
      "Prioritised infrastructure improvement roadmap",
    ],
  },
  {
    icon: Landmark,
    title: "DORA Compliance Assessment",
    desc: "A dedicated assessment for EU financial entities and their critical ICT third-party providers — benchmarking your ICT governance against all five DORA pillars and delivering a clear, prioritised compliance roadmap.",
    items: [
      "Pillar 1 — ICT Risk Management framework review",
      "Pillar 2 — ICT incident classification and reporting workflows",
      "Pillar 3 — Resilience and TLPT testing readiness",
      "Pillar 4 — ICT third-party risk and concentration",
      "Pillar 5 — Threat intelligence and information sharing",
      "Pillar-by-pillar gap register with regulatory references",
      "DORA compliance maturity scorecard",
      "Board / supervisor presentation deck",
    ],
  },
  {
    icon: SearchCheck,
    title: "IT Due Diligence for M&A",
    desc: "Independent, board-ready IT due diligence for acquirers and investors — quantifying technology risk, technical debt and integration cost before a deal closes. Rapid 10–15 day turnarounds available for time-critical transactions.",
    items: [
      "IT architecture and infrastructure maturity",
      "Cybersecurity posture and vulnerability exposure",
      "Software licence compliance and IP risk",
      "Technical debt and remediation cost estimation",
      "Key person dependencies and IT talent risk",
      "Data quality and GDPR compliance",
      "Integration complexity and indicative cost",
      "Red flag summary for deal negotiation",
    ],
  },
];

const offshore = [
  {
    icon: Code2,
    title: "Offshore Software Development Teams",
    desc: "Dedicated, rigorously vetted developer squads — front-end, back-end, full-stack, mobile, cloud, data and AI — assembled, managed and quality-controlled by Btech from Paris. Operational capacity in weeks, not months.",
    items: [
      "Front-end: React, Vue, Angular, Next.js, TypeScript",
      "Back-end: Node.js, Python, Java, .NET, Go, Ruby on Rails",
      "Mobile: iOS (Swift), Android (Kotlin), React Native, Flutter",
      "Cloud & DevOps: AWS, Azure, GCP, Kubernetes, CI/CD",
      "AI/ML and blockchain specialists on request",
      "Dedicated, team-extension or project-based models",
      "Paris-based Delivery Manager + daily standups in CET",
      "Underperformer replacement at no additional cost",
    ],
  },
  {
    icon: Headphones,
    title: "Managed IT Support & Helpdesk",
    desc: "Multilingual, SLA-driven L1/L2/L3 and NOC support delivered offshore and supervised directly from Paris — typically reducing IT support cost by 40–60% versus equivalent in-house staffing.",
    items: [
      "L1 — password resets, provisioning, first-line triage",
      "L2 — application, hardware and network support",
      "L3 — infrastructure, server and complex application issues",
      "24/7 NOC monitoring and first-response",
      "Coverage: 8×5, 12×5, or 24×7",
      "French, English and additional languages on request",
      "ITSM integration: ServiceNow, Jira SM, Freshdesk, Zendesk",
      "Monthly SLA reporting + Paris-based Service Delivery Manager",
    ],
  },
  {
    icon: TestTube2,
    title: "QA & Software Testing Outsourcing",
    desc: "Embedded or phase-based QA teams that integrate into your Agile process — reducing production defect rates, accelerating releases, and building sustainable automation coverage.",
    items: [
      "Manual functional and end-to-end testing",
      "Automation: Selenium, Playwright, Cypress, Appium",
      "API testing: Postman, REST-assured, contract testing",
      "Performance & load: JMeter, Gatling, k6",
      "Mobile, cross-browser and cross-device testing",
      "Security testing — OWASP Top 10",
      "Accessibility testing — WCAG 2.1",
      "Test suite handover and CI/CD integration",
    ],
  },
  {
    icon: BarChart3,
    title: "Data Engineering & Analytics Offshoring",
    desc: "Data engineers, analytics engineers, BI developers and ML specialists — managed to European standards from Paris. Scalable data capability without the cost of a full in-house data science team.",
    items: [
      "Pipelines & ETL: Airflow, Prefect, Dagster, dbt, Spark",
      "Cloud data: AWS Redshift/Glue, Azure Synapse, GCP BigQuery",
      "Streaming: Kafka, Kinesis, Pub/Sub",
      "BI: Power BI, Tableau, Looker, Metabase, Superset",
      "ML/AI: Python, TensorFlow, PyTorch, LLM integration",
      "Data governance, cataloguing and lineage",
      "Data quality monitoring and reporting",
      "GDPR-compliant data processing (SCCs where applicable)",
    ],
  },
  {
    icon: ClipboardList,
    title: "Project Management as a Service",
    desc: "Experienced offshore project managers, programme managers and Scrum masters — managed from Paris and integrated into your delivery rhythm to keep projects on time, on budget and aligned to business goals.",
    items: [
      "PMP / Prince2 certified senior project managers",
      "Certified Scrum Masters (CSM / PSM)",
      "Programme managers and PMO analysts",
      "Frameworks: Agile/Scrum, SAFe, Waterfall, Hybrid",
      "Weekly RAG dashboards and executive reporting",
      "Risk, issue and dependency management",
      "Budget tracking and forecast reporting",
      "PMO setup and tooling (Jira, Monday, MS Project)",
    ],
  },
  {
    icon: Handshake,
    title: "IT Offshoring Audit & Programme Review",
    desc: "Independent audit and remediation plan for existing offshore programmes — surfacing quality issues, governance gaps and cost leakage, and benchmarking vendor performance against agreed SLAs and KPIs.",
    items: [
      "Vendor SLA and KPI performance review",
      "Governance, oversight and escalation effectiveness",
      "Quality, defect and rework analysis",
      "Communication and ways-of-working assessment",
      "Cost benchmarking and value-for-money review",
      "Knowledge transfer and key-person risk",
      "Contract and exit-clause review",
      "Practical remediation plan with prioritised actions",
    ],
  },
];

const steps = [
  { t: "Discovery", d: "Stakeholder interviews, documentation review, IT landscape mapping." },
  { t: "Assessment", d: "Deep-dive analysis against relevant frameworks and regulatory requirements." },
  { t: "Validation", d: "Findings reviewed with your team to ensure accuracy and business context." },
  { t: "Reporting", d: "Executive report + technical annex, prioritised by risk and business impact." },
  { t: "Support", d: "Optional remediation support, roadmap tracking and follow-up review." },
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
            Our <span className="text-gradient">five-phase methodology.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">
            Every audit and consulting engagement follows the same structured,
            transparent process — scoped to your context and delivered by a
            senior consultant from start to finish.
          </p>
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
