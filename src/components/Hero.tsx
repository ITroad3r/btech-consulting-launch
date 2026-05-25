import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-network.jpg";

export function Hero() {
  return (
    <section className="relative pt-40 pb-28 md:pt-52 md:pb-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
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
      <div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-[120px] animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-mint/15 blur-[120px] animate-pulse-soft pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <div
            className="inline-flex items-center gap-2 glass rounded-full pl-2 pr-4 py-1.5 text-xs text-muted-foreground animate-fade-up"
          >
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              <Sparkles size={12} />
              <span className="font-medium">Paris</span>
            </span>
            <span>IT Audit · Consulting · Offshoring</span>
          </div>

          <h1
            className="mt-7 font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-5xl animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Bridging Technology Gaps.{" "}
            <span className="text-gradient">Delivering Real Results.</span>
          </h1>

          <p
            className="mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Btech Consulting is your trusted partner for IT Audit, Strategic
            Consulting, and IT Offshoring — headquartered in the heart of
            Paris, serving businesses across Europe and beyond.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center gap-3 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:scale-[1.03] active:scale-[0.98] transition-transform glow-primary"
            >
              Discover Our Services
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass text-foreground font-medium text-sm hover:bg-primary/5 transition-colors"
            >
              <MessageCircle size={16} className="text-primary" />
              Talk to an Expert
            </Link>
          </div>
        </div>

        {/* Trust bar */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-px glass rounded-2xl overflow-hidden animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          {[
            { k: "10+", v: "Years of IT Expertise" },
            { k: "50+", v: "Audit & Consulting Engagements" },
            { k: "SMEs", v: "& Large Enterprises" },
            { k: "Paris", v: "HQ — Global Delivery" },
            { k: "ISO", v: "Aligned Methodologies" },
          ].map((s) => (
            <div
              key={s.v}
              className="bg-background/60 px-6 py-7 text-center hover:bg-primary/[0.04] transition-colors"
            >
              <div className="font-display text-2xl md:text-3xl text-foreground font-semibold">
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
