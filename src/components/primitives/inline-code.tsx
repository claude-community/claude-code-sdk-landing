import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "chip" | "shell";

export function InlineCode({
  children,
  variant = "chip",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "inline-flex items-center gap-2 rounded-[3px] border border-border bg-muted px-2 py-1 font-mono text-[12px] leading-snug text-foreground sm:text-[13px]",
        className,
      )}
    >
      {variant === "shell" && (
        <span aria-hidden className="shrink-0 text-muted-foreground">
          $
        </span>
      )}
      <span className="break-all">{children}</span>
    </code>
  );
}
