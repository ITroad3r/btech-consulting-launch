import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "IT Insights & Expert Articles | Btech Consulting Blog — Paris" },
      {
        name: "description",
        content:
          "Read expert articles on IT audit, cybersecurity, digital transformation, and IT offshoring from the Btech Consulting team in Paris.",
      },
    ],
  }),
  component: BlogPage,
});

const categories = [
  "IT Audit & Governance",
  "Cybersecurity",
  "Digital Transformation",
  "IT Offshoring",
  "Compliance & Regulation",
  "Industry Trends",
];

const posts = [
  {
    category: "IT Audit & Governance",
    title: "5 Signs Your Organisation Needs an IT Audit in 2024",
    excerpt:
      "Most organisations wait until something breaks before commissioning an IT audit. Here are five signs your organisation should act sooner rather than later.",
  },
  {
    category: "IT Offshoring",
    title: "IT Offshoring in 2024: What Every European Business Needs to Know",
    excerpt:
      "IT offshoring has matured into a sophisticated, well-governed model for accessing global talent. A practical guide for European leaders.",
  },
  {
    category: "Cybersecurity",
    title: "From ISO 27001 to NIS2: A Practical Compliance Roadmap",
    excerpt:
      "How to translate new European cybersecurity regulations into an actionable, prioritised programme — without paralysing your operations.",
  },
  {
    category: "Digital Transformation",
    title: "Cloud Migration: The Five Hidden Costs Leaders Overlook",
    excerpt:
      "An honest look at the real total cost of cloud migration — and how to plan a programme that delivers ROI within 18 months.",
  },
  {
    category: "Compliance & Regulation",
    title: "DORA Is Coming: Are Your IT Service Providers Ready?",
    excerpt:
      "The Digital Operational Resilience Act will reshape how financial institutions manage third-party IT risk. Here's what to prepare now.",
  },
  {
    category: "Industry Trends",
    title: "Generative AI in the Enterprise: Hype, Reality, and Governance",
    excerpt:
      "A pragmatic framework for evaluating generative AI use cases — and the governance structure required to deploy them safely.",
  },
];

function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-40 pb-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            Blog & Insights
            <span className="h-px w-8 bg-primary/60" />
          </div>
          <h1 className="mt-6 font-display font-semibold text-4xl md:text-6xl leading-[1.05]">
            Insights. Analysis.{" "}
            <span className="text-gradient">Practical advice.</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed">
            Expert perspectives on IT audit, cybersecurity, digital
            transformation, and offshoring — from the Btech Consulting team.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-5xl flex flex-wrap gap-2 justify-center">
          {categories.map((c) => (
            <span
              key={c}
              className="text-xs px-3 py-1.5 rounded-full glass text-muted-foreground hover:text-primary hover:border-primary/40 cursor-pointer transition-colors"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p) => (
            <article
              key={p.title}
              className="group glass rounded-2xl p-7 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                {p.category}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
                {p.title}
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">
                {p.excerpt}
              </p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                Read article
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
