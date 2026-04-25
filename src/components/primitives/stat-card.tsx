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
        "border border-border bg-card px-3 py-3 sm:px-5 sm:py-4",
        className,
      )}
    >
      <div className="font-display text-[24px] font-normal leading-none text-foreground sm:text-[32px]">
        {value}
      </div>
      <div className="mt-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground sm:mt-3">
        {label}
      </div>
    </div>
  );
}
