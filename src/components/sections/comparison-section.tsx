import { comparisonRows, siteCopy } from "@/lib/sdk-data";
import { useT } from "@/lib/i18n";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SectionShell } from "@/components/primitives/section-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ComparisonSection() {
  const t = useT();
  return (
    <SectionShell
      id="comparison"
      eyebrow={
        <Eyebrow>{t(siteCopy.comparison.eyebrow.en, siteCopy.comparison.eyebrow.zh)}</Eyebrow>
      }
      title={t(siteCopy.comparison.title.en, siteCopy.comparison.title.zh)}
      lead={t(siteCopy.comparison.lead.en, siteCopy.comparison.lead.zh)}
    >
      <div className="overflow-x-auto rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-orange-deep">
                {t(siteCopy.comparison.headers.feature.en, siteCopy.comparison.headers.feature.zh)}
              </TableHead>
              <TableHead className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-orange-deep">
                Node.js
              </TableHead>
              <TableHead className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-orange-deep">
                Go
              </TableHead>
              <TableHead className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-orange-deep">
                Python
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonRows.map((row) => (
              <TableRow
                key={row.feature.en}
                className="border-b border-border last:border-b-0 hover:bg-transparent"
              >
                <TableCell className="font-sans text-[14px] text-muted-foreground">
                  {t(row.feature.en, row.feature.zh)}
                </TableCell>
                <TableCell className="font-mono text-[13px] text-foreground">
                  {row.node}
                </TableCell>
                <TableCell className="font-mono text-[13px] text-foreground">
                  {row.go}
                </TableCell>
                <TableCell className="font-mono text-[13px] text-foreground">
                  {row.python}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SectionShell>
  );
}
