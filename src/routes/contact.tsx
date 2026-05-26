import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Btech Consulting | IT Audit & Offshoring — Paris" },
      { name: "description", content: "Get in touch with Btech Consulting in Paris. Request a free consultation for IT audit, consulting, or offshoring services." },
    ],
  }),
  component: ContactPage,
});

const icons = [MapPin, Mail, Phone];

function ContactPage() {
  const t = useT();
  const cp = t.contactPage;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary/60" />
              {cp.eyebrow}
            </div>
            <h1 className="mt-6 font-display font-semibold text-4xl md:text-5xl leading-[1.05]">
              {cp.titleA}<span className="text-gradient">{cp.titleHL}</span>
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed">{cp.sub}</p>

            <div className="mt-10 space-y-3">
              {cp.cards.map((c, i) => {
                const Icon = icons[i] ?? MapPin;
                return (
                  <div key={c.k} className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-sm text-foreground font-medium">{c.k}</div>
                      <div className="text-xs text-muted-foreground">{c.v}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            className="glass-strong rounded-3xl p-8 md:p-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget as HTMLFormElement;
              const name = (f.elements.namedItem("name") as HTMLInputElement)?.value || "";
              const company = (f.elements.namedItem("company") as HTMLInputElement)?.value || "";
              const email = (f.elements.namedItem("email") as HTMLInputElement)?.value || "";
              const service = (f.elements.namedItem("service") as HTMLSelectElement)?.value || "";
              const message = (f.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
              const subject = encodeURIComponent(`Contact request — ${service || "General"} — ${name}`);
              const body = encodeURIComponent(
                `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`
              );
              window.location.href = `mailto:contact@btech-consulting.com?subject=${subject}&body=${body}`;
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">{cp.fullName}</label>
                <input type="text" required className="mt-2 w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder={cp.fullNamePh} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">{cp.company}</label>
                <input type="text" className="mt-2 w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder={cp.companyPh} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">{cp.email}</label>
                <input type="email" required className="mt-2 w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder={cp.emailPh} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">{cp.service}</label>
                <select className="mt-2 w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors">
                  {cp.services.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">{cp.message}</label>
              <textarea rows={5} className="mt-2 w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder={cp.messagePh} />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:scale-[1.01] active:scale-[0.99] transition-transform glow-primary">
              {cp.submit}
              <Send size={16} />
            </button>
            <p className="text-[11px] text-muted-foreground text-center">{cp.disclaimer}</p>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
