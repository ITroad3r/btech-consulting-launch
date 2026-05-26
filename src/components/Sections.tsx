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
import logoFooter from "@/assets/btech-logo.png";
import { useT } from "@/i18n/LanguageProvider";

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
    <section id={id} className="relative py-14 md:py-20 px-6 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            {eyebrow}
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-5xl leading-tight">{title}</h2>
          {intro && (
            <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">{intro}</p>
          )}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

const pillarIcons = [ShieldCheck, Sparkles, HandshakeIcon];

export function About() {
  const t = useT();
  return (
    <Section
      id="about"
      eyebrow={t.about.eyebrow}
      title={
        <>
          {t.about.titleA}
          <span className="text-gradient">{t.about.titleHL}</span>
          {t.about.titleB}
        </>
      }
      intro={t.about.intro}
    >
      <div className="grid lg:grid-cols-5 gap-8 items-stretch">
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden glass">
          <img
            src={parisOffice}
            alt="Btech Consulting Paris"
            loading="lazy"
            width={1600}
            height={1200}
            className="w-full h-full object-cover min-h-[340px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-xs uppercase tracking-widest text-primary">{t.about.hqLabel}</div>
            <div className="mt-1 font-display text-xl text-foreground font-semibold">{t.about.hqValue}</div>
          </div>
        </div>

        <div className="lg:col-span-3 grid gap-4">
          {t.about.pillars.map((p, i) => {
            const Icon = pillarIcons[i] ?? ShieldCheck;
            return (
              <div key={p.title} className="glass rounded-2xl p-6 flex gap-5 hover:border-primary/40 transition-colors group">
                <div className="shrink-0 h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
                    <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all"
          >
            {t.about.learnMore} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Section>
  );
}

const auditIcons = [FileSearch, ShieldCheck, Cloud];

export function AuditConseil() {
  const t = useT();
  return (
    <Section
      id="audit-consulting"
      eyebrow={t.audit.eyebrow}
      title={
        <>
          {t.audit.titleA}
          <span className="text-gradient">{t.audit.titleHL}</span>
        </>
      }
      intro={t.audit.intro}
    >
      <div className="grid md:grid-cols-3 gap-5">
        {t.audit.cards.map((s, i) => {
          const Icon = auditIcons[i] ?? FileSearch;
          return (
            <article
              key={s.title}
              className="group relative glass rounded-2xl p-7 hover:border-primary/40 transition-all hover:-translate-y-1 duration-300"
            >
              <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 text-primary flex items-center justify-center">
                <Icon size={22} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-primary/5 text-muted-foreground border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-8">
        <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all">
          {t.audit.cta} <ArrowRight size={14} />
        </Link>
      </div>
    </Section>
  );
}

const offIcons = [Code2, Headphones, Globe2];

export function Offshoring() {
  const t = useT();
  return (
    <Section
      id="offshoring"
      eyebrow={t.offshoring.eyebrow}
      title={
        <>
          {t.offshoring.titleA}
          <span className="text-gradient">{t.offshoring.titleHL}</span>
        </>
      }
      intro={t.offshoring.intro}
    >
      <div className="grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden glass">
        {t.offshoring.cards.map((s, i) => {
          const Icon = offIcons[i] ?? Code2;
          return (
            <div key={s.title} className="group bg-background/60 p-8 hover:bg-primary/[0.04] transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-mint/15 text-mint flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {t.offshoring.learnMore} <ArrowRight size={12} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all">
          {t.offshoring.cta} <ArrowRight size={14} />
        </Link>
      </div>
    </Section>
  );
}

export function WhyBtech() {
  const t = useT();
  return (
    <Section
      id="why-btech"
      eyebrow={t.why.eyebrow}
      title={
        <>
          {t.why.titleA}
          <span className="text-gradient">{t.why.titleHL}</span>
        </>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.why.items.map((i) => (
          <div key={i.k} className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-2">
              <Target size={14} className="text-primary" />
              <div className="text-xs uppercase tracking-widest text-primary font-medium">{i.k}</div>
            </div>
            <p className="mt-4 text-sm text-foreground leading-relaxed">{i.v}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const indIcons = [Landmark, Heart, ShoppingBag, Factory, Building2, Radio, GraduationCap];

export function Industries() {
  const t = useT();
  return (
    <Section
      id="industries"
      eyebrow={t.industries.eyebrow}
      title={
        <>
          {t.industries.titleA}
          <span className="text-gradient">{t.industries.titleHL}</span>
        </>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {t.industries.items.map((label, i) => {
          const Icon = indIcons[i] ?? Building2;
          return (
            <div key={label} className="glass rounded-xl p-5 flex items-center gap-3 hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon size={18} />
              </div>
              <div className="text-sm font-medium text-foreground">{label}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function Testimonials() {
  const t = useT();
  return (
    <Section
      id="testimonials"
      eyebrow={t.testimonials.eyebrow}
      title={
        <>
          {t.testimonials.titleA}
          <span className="text-gradient">{t.testimonials.titleHL}</span>
        </>
      }
    >
      <div className="grid md:grid-cols-3 gap-5">
        {t.testimonials.items.map((tq, i) => (
          <figure key={i} className="glass rounded-2xl p-7 flex flex-col hover:border-primary/40 transition-colors">
            <Quote size={22} className="text-primary/60" />
            <blockquote className="mt-4 text-sm text-foreground leading-relaxed flex-1">{tq.q}</blockquote>
            <figcaption className="mt-6 pt-5 border-t border-border text-xs text-muted-foreground">{tq.a}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

const ctaIcons = [MapPin, Mail, Phone, Globe2];

export function Contact() {
  const t = useT();
  return (
    <section id="contact-cta" className="relative py-14 md:py-20 px-6 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/25 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-mint/15 blur-[120px]" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
                <span className="h-px w-8 bg-primary/60" />
                {t.contactCta.eyebrow}
              </div>
              <h2 className="mt-5 font-display text-3xl md:text-5xl leading-tight">
                {t.contactCta.titleA}
                <span className="text-gradient">{t.contactCta.titleHL}</span>
                {t.contactCta.titleB}
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">{t.contactCta.desc}</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:scale-[1.03] active:scale-[0.98] transition-transform glow-primary"
                >
                  {t.contactCta.primary}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass text-foreground font-medium text-sm hover:bg-primary/5 transition-colors"
                >
                  {t.contactCta.secondary}
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {t.contactCta.cards.map((c, i) => {
                const Icon = ctaIcons[i] ?? MapPin;
                return (
                  <div key={c.k} className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-foreground font-medium truncate">{c.k}</div>
                      <div className="text-xs text-muted-foreground truncate">{c.v}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border px-6 pt-20 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <img src={logoFooter} alt="Btech Consulting" className="h-14 w-auto" />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xs">{t.footer.tagline}</p>
          </div>
          {t.footer.cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-[0.2em] text-foreground font-semibold">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Btech Consulting. {t.footer.rights}
          </div>
          <div className="text-xs text-muted-foreground space-x-4">
            {t.footer.legal.map((l) => (
              <span key={l} className="hover:text-foreground cursor-pointer">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
