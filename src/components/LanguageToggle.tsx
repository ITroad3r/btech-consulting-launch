import { useLang } from "@/i18n/LanguageProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const Btn = ({ code, label }: { code: "en" | "fr"; label: string }) => (
    <button
      type="button"
      onClick={() => setLang(code)}
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
