import { sdkOrder, sdks, siteCopy, type SdkKey } from "@/lib/sdk-data";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { InlineCode } from "@/components/primitives/inline-code";
import { StatCard } from "@/components/primitives/stat-card";
import { TerminalWindow } from "@/components/primitives/terminal-window";
import { ExternalLink } from "@/components/primitives/external-link";
import { Button } from "@/components/ui/button";

function SdkPickerCard({
  sdkKey,
  active,
  onSelect,
}: {
  sdkKey: SdkKey;
  active: boolean;
  onSelect: () => void;
}) {
  const sdk = sdks[sdkKey];
  const t = useT();
  return (
    <button
      type="button"
      onClick={onSelect}
      role="tab"
      aria-selected={active}
      className={cn(
        "group flex flex-col gap-2 rounded-md border p-5 text-left transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "border-primary bg-card ring-1 ring-primary"
          : "border-border bg-card hover:border-rule-strong",
      )}
    >
      <span
        className={cn(
          "font-mono text-[11px] font-medium uppercase tracking-[0.1em]",
          active ? "text-orange-deep" : "text-muted-foreground",
        )}
      >
        {sdk.displayName}
      </span>
      <span className="font-display text-[22px] leading-tight text-foreground">
        {t(sdk.description.en, sdk.description.zh).split(/[.。]/)[0]}
      </span>
      <span className="mt-1 flex flex-wrap gap-3 font-mono text-[11.5px] text-muted-foreground">
        {sdk.stats.slice(0, 3).map((s) => (
          <span key={s.value + s.label.en}>
            <span className="text-foreground">{s.value}</span>{" "}
            {t(s.label.en, s.label.zh)}
          </span>
        ))}
      </span>
    </button>
  );
}

export function Hero({
  activeSdk,
  onSelectSdk,
}: {
  activeSdk: SdkKey;
  onSelectSdk: (next: SdkKey) => void;
}) {
  const t = useT();
  const sdk = sdks[activeSdk];

  return (
    <section id="top" className="px-6 pt-20 pb-20">
      <div className="mx-auto max-w-[1200px]">
        <Eyebrow as="div">
          {t(siteCopy.hero.eyebrow.en, siteCopy.hero.eyebrow.zh)}
        </Eyebrow>

        <h1 className="mt-5 font-display font-normal tracking-[-0.025em] text-[clamp(42px,7.5vw,78px)] leading-[0.96] text-foreground">
          {t(siteCopy.hero.title.en, siteCopy.hero.title.zh)}
        </h1>

        <p className="mt-6 max-w-[64ch] font-sans text-[17px] leading-relaxed text-ink-soft">
          {t(siteCopy.hero.lead.en, siteCopy.hero.lead.zh)}
        </p>

        <p className="mt-10 font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {t(siteCopy.hero.tabHint.en, siteCopy.hero.tabHint.zh)}
        </p>

        <div role="tablist" className="mt-4 grid gap-4 md:grid-cols-3">
          {sdkOrder.map((key) => (
            <SdkPickerCard
              key={key}
              sdkKey={key}
              active={key === activeSdk}
              onSelect={() => onSelectSdk(key)}
            />
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[6fr_4fr]">
          {/* Left: install + quickstart */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-orange-deep">
                01 · {t("Install", "安装")}
              </div>
              <InlineCode variant="shell">{sdk.install}</InlineCode>
            </div>

            <div>
              <div className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-orange-deep">
                02 · {t("Quick start", "快速开始")}
              </div>
              <TerminalWindow
                variant="code"
                title={sdk.quickstart.filename}
                lines={sdk.quickstart.code}
              />
            </div>
          </div>

          {/* Right: stats + CTA */}
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-3">
              {sdk.stats.map((s) => (
                <StatCard
                  key={s.value + s.label.en}
                  value={s.value}
                  label={t(s.label.en, s.label.zh)}
                />
              ))}
            </div>

            <div className="border border-border bg-card p-5">
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-orange-deep">
                {t("Language specifics", "语言特色")}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {sdk.features.map((f) => (
                  <span
                    key={f.en}
                    className="rounded-[3px] border border-border bg-muted px-2 py-1 font-mono text-[12px] text-foreground"
                  >
                    {t(f.en, f.zh)}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={sdk.repo} target="_blank" rel="noopener noreferrer">
                  <span className="font-mono text-[13px] font-medium">&gt;_</span>
                  {t(siteCopy.hero.cta.github.en, siteCopy.hero.cta.github.zh)}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={sdk.llms.blob} target="_blank" rel="noopener noreferrer">
                  {t(siteCopy.hero.cta.llms.en, siteCopy.hero.cta.llms.zh)}
                </a>
              </Button>
            </div>

            <div className="text-[12px]">
              <ExternalLink
                href={sdk.llms.raw}
                className="font-mono uppercase tracking-[0.08em] text-muted-foreground"
              >
                {t("Raw llms.txt", "原始 llms.txt")}
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
