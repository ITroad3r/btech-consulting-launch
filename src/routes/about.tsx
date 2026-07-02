import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer, Contact } from "@/components/Sections";
import { CheckCircle2 } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Btech Consulting | IT Audit & Offshoring Experts — Paris" },
      { name: "description", content: "Learn about Btech Consulting's story, mission, values, and the expert team behind our IT audit, consulting, and offshoring services in Paris, France." },
      { property: "og:title", content: "About Btech Consulting | IT Audit & Offshoring Experts — Paris" },
      { property: "og:description", content: "Our story, mission, values, and the expert team behind Btech Consulting in Paris." },
      { property: "og:url", content: "https://btech-consulting.com/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://btech-consulting.com/about" }],
  }),
  component: AboutPage,
});


function AboutPage() {
  const t = useT();
  const a = t.aboutPage;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-40 pb-16 md:pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            {a.eyebrow}
            <span className="h-px w-8 bg-primary/60" />
          </div>
          <h1 className="mt-6 font-display font-semibold text-4xl md:text-6xl leading-[1.05]">
            {a.titleA}
            <span className="text-gradient">{a.titleHL}</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed">{a.sub}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl glass rounded-3xl p-10 md:p-14">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">{a.storyEyebrow}</div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold">{a.storyTitle}</h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
            {a.storyParas.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="glass rounded-2xl p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-primary">{a.mission}</div>
              <p className="mt-5 text-foreground leading-relaxed">{a.missionText}</p>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-primary">{a.vision}</div>
              <p className="mt-5 text-foreground leading-relaxed">{a.visionText}</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold">
              {a.valuesTitleA}<span className="text-gradient">{a.valuesTitleHL}</span>
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {a.values.map((v) => (
                <div key={v.k} className="glass rounded-2xl p-6">
                  <div className="text-sm font-semibold text-primary">{v.k}</div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">{a.approachEyebrow}</div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">
            {a.approachTitleA}<span className="text-gradient">{a.approachTitleHL}</span>{a.approachTitleB}
          </h2>
          <div className="mt-12 space-y-4">
            {a.approach.map((s, i) => (
              <div key={s.t} className="glass rounded-2xl p-7 flex gap-6 items-start hover:border-primary/40 transition-colors">
                <div className="font-display text-3xl text-primary font-semibold tabular-nums shrink-0 w-12">0{i + 1}</div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{s.t}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl glass-strong rounded-3xl p-10 md:p-14">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">{a.teamEyebrow}</div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold">{a.teamTitle}</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {a.credentials.map((c) => (
              <div key={c} className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle2 size={16} className="text-primary shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">{a.parisEyebrow}</div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">
            {a.parisTitleA}<span className="text-gradient">{a.parisTitleHL}</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">{a.parisText}</p>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
