import { siteCopy } from "@/lib/sdk-data";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LANGS: { key: Lang; label: string }[] = [
  { key: "en", label: "EN" },
  { key: "zh", label: "中" },
];

export function SiteHeader() {
  const { lang, setLang } = useLang();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-baseline gap-2 font-display text-[22px] leading-none text-foreground">
          <span>{siteCopy.header.wordmark.brand}</span>
          <span className="text-primary">{siteCopy.header.wordmark.accent}</span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {siteCopy.header.wordmark.suffix}
          </span>
        </a>

        <div
          role="group"
          aria-label={lang === "zh" ? siteCopy.header.langLabel.zh : siteCopy.header.langLabel.en}
          className="flex items-center gap-1 rounded-md border border-border bg-card p-0.5"
        >
          {LANGS.map(({ key, label }) => {
            const active = lang === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setLang(key)}
                aria-pressed={active}
                className={cn(
                  "rounded-sm px-3 py-1 font-mono text-[12px] font-medium uppercase tracking-[0.1em] transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
