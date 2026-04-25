import { sdkOrder, sdks, siteCopy, type SdkKey } from "@/lib/sdk-data";
import { useT } from "@/lib/i18n";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SectionShell } from "@/components/primitives/section-shell";
import { ExternalLink } from "@/components/primitives/external-link";
import { CopyButton } from "@/components/primitives/copy-button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

function curlCommand(rawUrl: string) {
  return `curl -fsSL ${rawUrl}`;
}

export function LlmsSection({
  activeSdk,
  onSelectSdk,
}: {
  activeSdk: SdkKey;
  onSelectSdk: (next: SdkKey) => void;
}) {
  const t = useT();
  return (
    <SectionShell
      id="llms"
      eyebrow={<Eyebrow>{t(siteCopy.llms.eyebrow.en, siteCopy.llms.eyebrow.zh)}</Eyebrow>}
      title={t(siteCopy.llms.title.en, siteCopy.llms.title.zh)}
      lead={t(siteCopy.llms.lead.en, siteCopy.llms.lead.zh)}
    >
      <Tabs
        value={activeSdk}
        onValueChange={(v) => onSelectSdk(v as SdkKey)}
        className="gap-6"
      >
        <TabsList>
          {sdkOrder.map((key) => (
            <TabsTrigger
              key={key}
              value={key}
              className="font-mono text-[12px] font-medium uppercase tracking-[0.1em]"
            >
              {sdks[key].displayName}
            </TabsTrigger>
          ))}
        </TabsList>

        {sdkOrder.map((key) => {
          const sdk = sdks[key];
          const curl = curlCommand(sdk.llms.raw);
          return (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="rounded-md border border-border bg-card p-6">
                <div className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-orange-deep">
                  {sdk.displayName}
                </div>
                <div className="mt-2 font-mono text-[18px] font-medium text-foreground">
                  llms.txt
                </div>
                <p className="mt-3 max-w-[70ch] font-sans text-[14px] leading-relaxed text-ink-soft">
                  {t(
                    `Complete API reference for ${sdk.displayName}, formatted per llmstxt.org.`,
                    `面向 AI agent 的 ${sdk.displayName} SDK 完整 API 参考（llmstxt.org 格式）。`,
                  )}
                </p>

                <pre className="mt-5 overflow-x-auto rounded-md border border-terminal-rule bg-terminal-bg px-4 py-3 font-mono text-[13px] leading-[1.6] text-terminal-fg">
                  {curl}
                </pre>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <CopyButton
                    text={curl}
                    label={t(siteCopy.llms.curl.en, siteCopy.llms.curl.zh)}
                    copiedLabel={t("Copied", "已复制")}
                  />
                  <ExternalLink
                    href={sdk.llms.blob}
                    className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground"
                  >
                    {t(siteCopy.llms.viewSource.en, siteCopy.llms.viewSource.zh)}
                  </ExternalLink>
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </SectionShell>
  );
}
