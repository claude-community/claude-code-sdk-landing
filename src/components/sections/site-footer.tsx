import { sdkOrder, sdks, siteCopy } from "@/lib/sdk-data";
import { sdkIconKey } from "@/lib/brand-icons";
import { useT } from "@/lib/i18n";
import { ExternalLink } from "@/components/primitives/external-link";
import { BrandIcon } from "@/components/primitives/brand-icon";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="font-sans text-[13px] text-muted-foreground">
            {t(siteCopy.footer.license.en, siteCopy.footer.license.zh)}
          </p>
          <nav className="flex flex-wrap gap-5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
            {sdkOrder.map((key) => (
              <ExternalLink key={key} href={sdks[key].repo} iconSize={12}>
                <BrandIcon icon={sdkIconKey[key]} size={13} color="currentColor" />
                {sdks[key].name}
              </ExternalLink>
            ))}
          </nav>
        </div>
        <p className="mt-5 font-sans text-[11px] leading-relaxed text-muted-foreground/70">
          © claude-community contributors. This is an independent community project, not affiliated with Anthropic PBC. Claude® is a registered trademark of Anthropic PBC.
        </p>
      </div>
    </footer>
  );
}
