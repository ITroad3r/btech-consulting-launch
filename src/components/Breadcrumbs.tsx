import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-28">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-primary transition-colors" aria-label="Home">
            <Home size={12} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              <ChevronRight size={12} aria-hidden="true" className="text-muted-foreground/60" />
              {c.to && !last ? (
                <Link to={c.to} className="hover:text-primary transition-colors">{c.label}</Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-foreground font-medium" : ""}>
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Build BreadcrumbList JSON-LD for head() scripts. */
export function breadcrumbJsonLd(base: string, items: { name: string; path: string }[]) {
  const list = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base}${it.path}`,
    })),
  };
}
