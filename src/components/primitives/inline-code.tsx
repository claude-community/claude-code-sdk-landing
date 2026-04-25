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
        "inline-flex items-center gap-2 rounded-[3px] border border-border bg-muted px-2 py-1 font-mono text-[13px] leading-none text-foreground",
        className,
      )}
    >
      {variant === "shell" && (
        <span aria-hidden className="text-muted-foreground">
          $
        </span>
      )}
      <span className="truncate">{children}</span>
    </code>
  );
}
