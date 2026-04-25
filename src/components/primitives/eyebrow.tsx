import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "div" | "p";
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-orange-deep",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
