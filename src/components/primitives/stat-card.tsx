import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StatCard({
  value,
  label,
  className,
}: {
  value: ReactNode;
  label: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-border bg-card px-5 py-4",
        className,
      )}
    >
      <div className="font-display text-[32px] font-normal leading-none text-foreground">
        {value}
      </div>
      <div className="mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
