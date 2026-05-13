import { ArrowRight, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-network.jpg";

export function Hero() {
  return (
    <section className="relative pt-40 pb-28 md:pt-52 md:pb-40 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
        }}
      />
      <div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-primary/30 blur-[120px] animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-mint/20 blur-[120px] animate-pulse-soft pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 glass rounded-full pl-2 pr-4 py-1.5 text-xs text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-mint/15 text-mint">
              <Sparkles size={12} />
              <span className="font-medium">2026</span>
            </span>
            <span>IT Audit · Conseil · Offshoring · Paris</span>
          </div>

          {/* H1 */}
          <h1
            className="mt-7 font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-5xl animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Excellence en{" "}
            <span className="text-gradient">Audit, Conseil IT</span>
            <br className="hidden sm:block" /> et Offshoring à Paris.
          </h1>

          {/* Subhead */}
          <p
            className="mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Votre partenaire stratégique pour la transformation digitale,
            la conformité GRC et l&apos;infogérance sur mesure.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center gap-3 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:scale-[1.03] active:scale-[0.98] transition-transform glow-primary"
            >
              Démarrer un projet
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              to="/audit-conseil"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass text-foreground font-medium text-sm hover:bg-white/5 transition-colors"
            >
              <ShieldCheck size={16} className="text-mint" />
              Découvrir nos audits
            </Link>
          </div>

          {/* Locations / GEO */}
          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            {[
              "Paris 8ᵉ — QCA",
              "La Défense",
              "Boulogne-Billancourt",
            ].map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5"
              >
                <MapPin size={11} className="text-mint" />
                {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px glass rounded-2xl overflow-hidden animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          {[
            { k: "15+", v: "Années d'expertise" },
            { k: "120+", v: "Missions livrées" },
            { k: "24/7", v: "Supervision N1/N2/N3" },
            { k: "ISO 27001", v: "Conformité & GRC" },
          ].map((s) => (
            <div
              key={s.v}
              className="bg-background/40 px-6 py-7 text-center hover:bg-white/[0.02] transition-colors"
            >
              <div className="font-display text-2xl md:text-3xl text-foreground">
                {s.k}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
