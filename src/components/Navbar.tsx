import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/btech-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
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
        className={`mx-auto max-w-7xl glass rounded-2xl transition-all duration-500 ${
          scrolled ? "shadow-[0_8px_40px_-12px_rgba(20,40,80,0.15)]" : ""
        }`}
      >
        <div className="flex items-center justify-between px-5 py-2 gap-4">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={logo}
              alt="Btech Consulting"
              className="h-16 md:h-20 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-foreground bg-primary/10" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="px-4 py-2 text-sm rounded-lg hover:text-foreground hover:bg-primary/5 transition-colors"
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
              Book a Consultation
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/5 text-foreground"
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
                className="px-3 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-3 py-2.5 text-sm text-center rounded-lg bg-primary text-primary-foreground"
            >
              Book a Consultation
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
