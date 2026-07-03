import { useLang } from "@/i18n/LanguageProvider";
import { useNavigate, useMatches } from "@tanstack/react-router";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const matches = useMatches();
  const blogMatch = matches.find((m) => m.routeId === "/blog/$lang/$slug");

  const handleClick = (code: "en" | "fr") => {
    if (blogMatch) {
      const slug = (blogMatch.params as any).slug as string;
      navigate({ to: "/blog/$lang/$slug", params: { lang: code, slug } });
    }
    setLang(code);
  };

  const Btn = ({ code, label }: { code: "en" | "fr"; label: string }) => (
    <button
      type="button"
      onClick={() => handleClick(code)}
      className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
        lang === code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
      aria-pressed={lang === code}
    >
      {label}
    </button>
  );
  return (
    <div className={`inline-flex items-center gap-0.5 glass rounded-lg p-0.5 ${className}`}>
      <Btn code="en" label="EN" />
      <Btn code="fr" label="FR" />
    </div>
  );
}
