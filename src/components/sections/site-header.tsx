import { siteCopy } from "@/lib/sdk-data";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BrandIcon } from "@/components/primitives/brand-icon";

const LANGS: { key: Lang; label: string }[] = [
  { key: "en", label: "EN" },
  { key: "zh", label: "中" },
];

export function SiteHeader() {
  const { lang, setLang } = useLang();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-[18px] leading-none text-foreground sm:text-[22px] sm:gap-2.5">
          <img src="/favicon.png" alt="" className="h-7 w-7 sm:h-8 sm:w-8" />
          <span>{siteCopy.header.wordmark.brand}</span>
          <span className="text-primary">{siteCopy.header.wordmark.accent}</span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {siteCopy.header.wordmark.suffix}
          </span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/claude-community"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center rounded-sm p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <BrandIcon icon="github" size={18} color="currentColor" />
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
                    "rounded-sm px-3 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.1em] transition-colors",
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
      </div>
    </header>
  );
}
