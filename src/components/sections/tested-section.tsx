import { sdks, siteCopy, type SdkKey } from "@/lib/sdk-data";
import { useT } from "@/lib/i18n";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SectionShell } from "@/components/primitives/section-shell";
import { StatCard } from "@/components/primitives/stat-card";
import { TerminalWindow } from "@/components/primitives/terminal-window";

export function TestedSection({ activeSdk }: { activeSdk: SdkKey }) {
  const t = useT();
  const sdk = sdks[activeSdk];

  return (
    <SectionShell
      id="tested"
      eyebrow={<Eyebrow>{t(siteCopy.tested.eyebrow.en, siteCopy.tested.eyebrow.zh)}</Eyebrow>}
      title={t(siteCopy.tested.title.en, siteCopy.tested.title.zh)}
      lead={t(siteCopy.tested.lead.en, siteCopy.tested.lead.zh)}
    >
      <div className="grid gap-8 lg:grid-cols-[7fr_5fr]">
        <TerminalWindow
          variant="terminal"
          title={sdk.testOutput.command}
          lines={sdk.testOutput.lines}
        />
        <div className="grid gap-3">
          {sdk.stats.map((stat) => (
            <StatCard
              key={stat.value + stat.label.en}
              value={stat.value}
              label={t(stat.label.en, stat.label.zh)}
            />
          ))}
          <div className="border border-border bg-card p-5">
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-orange-deep">
              {t("What we test", "测试覆盖")}
            </div>
            <ul className="mt-3 space-y-1.5 font-sans text-[13.5px] leading-relaxed text-ink-soft">
              <li>{t("Session lifecycle + auto-resume", "会话生命周期与自动续接")}</li>
              <li>{t("Streaming events + abort mid-turn", "流式事件与中途取消")}</li>
              <li>{t("Structured output via JSON Schema", "基于 JSON Schema 的结构化输出")}</li>
              <li>{t("Live E2E against real Claude CLI", "对真实 Claude CLI 的实机 E2E")}</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
