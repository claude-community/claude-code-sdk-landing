import { sdkOrder, sdks, siteCopy } from "@/lib/sdk-data";
import { useT } from "@/lib/i18n";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SectionShell } from "@/components/primitives/section-shell";
import { ExternalLink } from "@/components/primitives/external-link";
import { CopyButton } from "@/components/primitives/copy-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function curlCommand(rawUrl: string) {
  return `curl -fsSL ${rawUrl}`;
}

export function LlmsSection() {
  const t = useT();
  return (
    <SectionShell
      id="llms"
      eyebrow={<Eyebrow>{t(siteCopy.llms.eyebrow.en, siteCopy.llms.eyebrow.zh)}</Eyebrow>}
      title={t(siteCopy.llms.title.en, siteCopy.llms.title.zh)}
      lead={t(siteCopy.llms.lead.en, siteCopy.llms.lead.zh)}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {sdkOrder.map((key) => {
          const sdk = sdks[key];
          const curl = curlCommand(sdk.llms.raw);
          return (
            <Card key={key} className="flex flex-col">
              <CardHeader>
                <div className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-orange-deep">
                  {sdk.displayName}
                </div>
                <CardTitle className="font-mono text-[15px] font-medium text-foreground">
                  llms.txt
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="font-sans text-[13px] leading-relaxed text-ink-soft">
                  {t(
                    `Complete API reference for ${sdk.displayName}, formatted per llmstxt.org.`,
                    `面向 AI agent 的 ${sdk.displayName} SDK 完整 API 参考（llmstxt.org 格式）。`,
                  )}
                </p>
                <pre className="overflow-x-auto rounded-md border border-terminal-rule bg-terminal-bg px-3 py-2 font-mono text-[11.5px] leading-[1.6] text-terminal-fg">
                  {curl}
                </pre>
                <div className="mt-auto flex items-center justify-between gap-3">
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
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionShell>
  );
}
