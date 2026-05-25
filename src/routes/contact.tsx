import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Btech Consulting | IT Audit & Offshoring — Paris" },
      {
        name: "description",
        content:
          "Get in touch with Btech Consulting in Paris. Request a free consultation for IT audit, consulting, or offshoring services.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary/60" />
              Contact
            </div>
            <h1 className="mt-6 font-display font-semibold text-4xl md:text-5xl leading-[1.05]">
              Let&apos;s start a{" "}
              <span className="text-gradient">conversation.</span>
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Tell us about your IT challenge. A senior expert will get back to
              you within 24 business hours — no obligation, no pressure.
            </p>

            <div className="mt-10 space-y-3">
              {[
                { icon: MapPin, k: "Paris, France", v: "Btech Consulting Headquarters" },
                { icon: Mail, k: "contact@btech-consulting.fr", v: "We reply within 24 hours" },
                { icon: Phone, k: "+33 1 00 00 00 00", v: "Mon–Fri · 9am–7pm CET" },
              ].map((c) => (
                <div key={c.k} className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <c.icon size={16} />
                  </div>
                  <div>
                    <div className="text-sm text-foreground font-medium">{c.k}</div>
                    <div className="text-xs text-muted-foreground">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            className="glass-strong rounded-3xl p-8 md:p-10 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Full name</label>
                <input
                  type="text"
                  required
                  className="mt-2 w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Company</label>
                <input
                  type="text"
                  className="mt-2 w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your organisation"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  type="email"
                  required
                  className="mt-2 w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Service of interest</label>
                <select className="mt-2 w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors">
                  <option>IT Audit & Consulting</option>
                  <option>Cybersecurity Assessment</option>
                  <option>Digital Transformation</option>
                  <option>IT Offshoring</option>
                  <option>Managed IT Support</option>
                  <option>Not sure yet</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Tell us about your project</label>
              <textarea
                rows={5}
                className="mt-2 w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="A few lines about your context, goals, and timeline…"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:scale-[1.01] active:scale-[0.99] transition-transform glow-primary"
            >
              Request a Free Consultation
              <Send size={16} />
            </button>
            <p className="text-[11px] text-muted-foreground text-center">
              By submitting this form you agree to be contacted by Btech
              Consulting about your enquiry. We never share your data.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
