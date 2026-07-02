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
import { useSettings } from "@/lib/site-content";

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
    <section id={id} className="relative py-12 md:py-20 px-4 sm:px-6 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            {eyebrow}
          </div>
          <h2 className="mt-5 font-display text-2xl sm:text-3xl md:text-5xl leading-tight break-words">{title}</h2>
          {intro && (
            <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">{intro}</p>
          )}
        </div>
        <div className="mt-10 md:mt-14">{children}</div>

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

export function Faq() {
  const t = useT();
  return (
    <Section
      id="faq"
      eyebrow={t.faq.eyebrow}
      title={
        <>
          {t.faq.titleA}
          <span className="text-gradient">{t.faq.titleHL}</span>
        </>
      }
      intro={t.faq.intro}
    >
      <div className="grid md:grid-cols-2 gap-4" itemScope itemType="https://schema.org/FAQPage">
        {t.faq.items.map((item, i) => (
          <details
            key={i}
            className="glass rounded-2xl p-6 group open:border-primary/40 transition-colors"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
              <h3 className="text-base md:text-lg font-semibold text-foreground" itemProp="name">
                {item.q}
              </h3>
              <span className="text-primary text-xl leading-none transition-transform group-open:rotate-45 shrink-0">
                +
              </span>
            </summary>
            <div
              className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <p itemProp="text">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

const ctaIcons = [MapPin, Mail, Phone, Globe2];

export function Contact() {
  const t = useT();
  const { data: settings } = useSettings();
  const cards = t.contactCta.cards.map((c, i) => {
    if (i === 0 && settings?.contact_address) return { ...c, v: settings.contact_address };
    if (i === 1 && settings?.contact_email) return { ...c, v: settings.contact_email };
    if (i === 2 && settings?.contact_phone) return { ...c, v: settings.contact_phone };
    return c;
  });

  return (
    <section id="contact-cta" className="relative overflow-x-hidden py-10 px-3 scroll-mt-24 sm:px-6 md:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="relative w-full max-w-full overflow-hidden rounded-2xl glass-strong p-4 sm:rounded-3xl sm:p-10 md:p-16">
          <div className="absolute -top-32 -right-32 hidden h-80 w-80 rounded-full bg-primary/25 blur-[120px] sm:block" />
          <div className="absolute -bottom-32 -left-32 hidden h-80 w-80 rounded-full bg-mint/15 blur-[120px] sm:block" />

          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
                <span className="h-px w-8 bg-primary/60" />
                {t.contactCta.eyebrow}
              </div>
              <h2 className="mt-5 font-display text-2xl leading-tight break-words sm:text-3xl md:text-5xl">
                {t.contactCta.titleA}
                <span className="text-gradient">{t.contactCta.titleHL}</span>
                {t.contactCta.titleB}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground break-words sm:text-base">{t.contactCta.desc}</p>


              <div className="mt-8 grid gap-3 sm:flex sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-center text-sm font-medium leading-snug text-primary-foreground glow-primary transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto sm:px-6"
                >
                  <span className="min-w-0 break-words">{t.contactCta.primary}</span>
                  <ArrowRight size={16} className="shrink-0" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-xl glass px-4 py-3.5 text-center text-sm font-medium leading-snug text-foreground transition-colors hover:bg-primary/5 sm:w-auto sm:px-6"
                >
                  <span className="min-w-0 break-words">{t.contactCta.secondary}</span>
                </Link>
              </div>
            </div>

            <div className="grid min-w-0 gap-3">
              {cards.map((c, i) => {
                const Icon = ctaIcons[i] ?? MapPin;
                return (
                  <div key={`${c.k}-${i}`} className="glass flex min-w-0 items-start gap-3 rounded-xl p-3.5 sm:items-center sm:gap-4 sm:p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-10 sm:w-10">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <div className="text-sm font-medium leading-snug text-foreground break-words">{c.k}</div>
                      <div className="mt-1 text-xs leading-snug text-muted-foreground break-words">{c.v}</div>
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
  const { data: settings } = useSettings();
  const socials = [
    { url: settings?.social_x, label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
    { url: settings?.social_linkedin, label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { url: settings?.social_instagram, label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
    { url: settings?.social_facebook, label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { url: settings?.social_tiktok, label: "TikTok", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-.64 5.03-2.28 6.88-1.64 1.85-4.11 2.76-6.57 2.76-1.44 0-2.88-.36-4.15-1.07-1.27-.71-2.27-1.78-2.86-3.06-.59-1.28-.77-2.7-.51-4.08.26-1.38.91-2.64 1.86-3.6.95-.96 2.17-1.61 3.51-1.86 1.34-.25 2.73-.09 3.97.45v4.17c-.61-.33-1.3-.5-2-.5-1.34 0-2.57.67-3.29 1.79-.72 1.12-.83 2.53-.29 3.75.54 1.22 1.61 2.12 2.88 2.39 1.27.27 2.6-.06 3.58-.86.98-.8 1.55-1.99 1.55-3.25V0h4.02z" },
    { url: settings?.social_youtube, label: "YouTube", path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  ];
  return (
    <footer className="border-t border-border px-6 pt-20 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <img src={logoFooter} alt="Btech Consulting" className="h-14 w-auto" />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xs">{t.footer.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              {socials.filter((s) => s.url).map((s) => (
                <a key={s.label} href={s.url ?? "#"} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d={s.path}/></svg>
                </a>
              ))}
            </div>
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
