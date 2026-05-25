import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer, Contact } from "@/components/Sections";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Btech Consulting | IT Audit & Offshoring Experts — Paris" },
      {
        name: "description",
        content:
          "Learn about Btech Consulting's story, mission, values, and the expert team behind our IT audit, consulting, and offshoring services in Paris, France.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { k: "Integrity", v: "We provide honest assessments, even when the findings are uncomfortable." },
  { k: "Excellence", v: "Every deliverable meets the highest professional standard." },
  { k: "Agility", v: "We adapt to your context, timeline, and constraints." },
  { k: "Partnership", v: "We work alongside your teams, not above them." },
  { k: "Innovation", v: "We stay at the frontier of technology so you don't have to." },
];

const approach = [
  { t: "Discovery & Scoping", d: "We invest time upfront to understand your organisation — structure, objectives, technology stack, and pain points." },
  { t: "Assessment & Analysis", d: "Thorough technical and governance reviews using COBIT 2019, ISO 27001, ITIL 4, and GDPR frameworks, documented with full evidence." },
  { t: "Reporting & Recommendations", d: "A clear, executive-ready report — prioritised by risk and business impact, with actionable next steps. No jargon, no filler." },
  { t: "Implementation Support", d: "We don't audit and disappear. Our consultants stay engaged to support remediation, change management, and rollout." },
  { t: "Review & Continuous Improvement", d: "Periodic reviews to track progress, adapt to change, and ensure sustained improvement." },
];

const credentials = [
  "Certified IT Auditors (CISA, CISM, CISSP)",
  "Enterprise Architects and Cloud Specialists",
  "PMP and Prince2 Project Managers",
  "Multilingual Offshore Delivery Managers",
  "Cybersecurity and Compliance Experts",
  "ISO 27001, COBIT 2019, ITIL 4, GDPR aligned",
];

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            About Us
            <span className="h-px w-8 bg-primary/60" />
          </div>
          <h1 className="mt-6 font-display font-semibold text-4xl md:text-6xl leading-[1.05]">
            Expertise You Can Trust.{" "}
            <span className="text-gradient">Partnership You Can Count On.</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed">
            Btech Consulting was founded on a single conviction — that
            businesses deserve IT advisory that is as committed to their
            success as they are.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl glass rounded-3xl p-10 md:p-14">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">Our Story</div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold">
            Built to fill a gap in the European market.
          </h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Btech Consulting was established in Paris with a clear purpose:
              to bring enterprise-grade IT audit and consulting capabilities to
              organisations of all sizes — and to make world-class technology
              talent accessible through ethical, transparent offshoring.
            </p>
            <p>
              Our founders observed a recurring challenge in the French and
              European market: companies were caught between overly expensive
              global consultancies and underpowered local providers. Btech
              Consulting was built to fill that gap.
            </p>
            <p>
              From our first audit engagement to our hundredth, we have
              maintained the same standard: rigorous analysis, honest
              communication, and results that make a measurable difference.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="glass rounded-2xl p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-primary">Our Mission</div>
              <p className="mt-5 text-foreground leading-relaxed">
                To empower organisations through independent IT expertise and
                scalable technology talent — helping them operate more
                securely, efficiently, and competitively in a digital world.
              </p>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-primary">Our Vision</div>
              <p className="mt-5 text-foreground leading-relaxed">
                To be the most trusted IT audit and offshoring partner for
                European businesses — known for integrity, precision, and
                genuine client outcomes.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold">
              Our Core <span className="text-gradient">Values</span>
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {values.map((v) => (
                <div key={v.k} className="glass rounded-2xl p-6">
                  <div className="text-sm font-semibold text-primary">{v.k}</div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">Our Approach</div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">
            A structured, <span className="text-gradient">client-centric</span> methodology.
          </h2>
          <div className="mt-12 space-y-4">
            {approach.map((s, i) => (
              <div
                key={s.t}
                className="glass rounded-2xl p-7 flex gap-6 items-start hover:border-primary/40 transition-colors"
              >
                <div className="font-display text-3xl text-primary font-semibold tabular-nums shrink-0 w-12">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{s.t}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Credentials */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl glass-strong rounded-3xl p-10 md:p-14">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">Meet the Team</div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold">
            Decades of field experience, continuous development.
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {credentials.map((c) => (
              <div key={c} className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle2 size={16} className="text-primary shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paris & Beyond */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">Paris & Beyond</div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">
            Based in Paris —{" "}
            <span className="text-gradient">working globally.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Our Paris headquarters places us at the heart of one of Europe's
            most dynamic business ecosystems. We serve French, European, and
            international clients from this base while leveraging a global
            network of delivery centres — offering European-timezone contact,
            French and English-language service, and proximity to GDPR and DORA
            regulatory frameworks.
          </p>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
