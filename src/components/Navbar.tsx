import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À Propos" },
  { to: "/audit-conseil", label: "Audit & Conseil" },
  { to: "/offshoring", label: "Offshoring" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto max-w-6xl glass rounded-2xl transition-all duration-500 ${
          scrolled ? "shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]" : ""
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-mint flex items-center justify-center font-display font-bold text-background text-sm transition-transform group-hover:scale-105">
              B
              <span className="absolute -inset-1 rounded-lg bg-primary/30 blur-md -z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-foreground text-[15px] tracking-tight">
                Btech<span className="text-mint"> .</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Consulting
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-foreground bg-white/5" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="px-4 py-2 text-sm rounded-lg hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              to="/contact"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:scale-[1.03] active:scale-[0.98] transition-transform glow-primary"
            >
              Prendre rendez-vous
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-foreground"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border px-3 py-3 flex flex-col gap-1 animate-fade-up">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-3 py-2.5 text-sm text-center rounded-lg bg-primary text-primary-foreground"
            >
              Prendre rendez-vous
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
