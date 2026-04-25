import { sdkOrder, sdks, siteCopy } from "@/lib/sdk-data";
import { useT } from "@/lib/i18n";
import { ExternalLink } from "@/components/primitives/external-link";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-10">
        <p className="font-sans text-[13px] text-muted-foreground">
          {t(siteCopy.footer.license.en, siteCopy.footer.license.zh)}
        </p>
        <nav className="flex flex-wrap gap-5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
          {sdkOrder.map((key) => (
            <ExternalLink key={key} href={sdks[key].repo} iconSize={12}>
              {sdks[key].name}
            </ExternalLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}
