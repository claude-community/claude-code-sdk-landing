import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExternalLink({
  href,
  children,
  className,
  iconSize = 14,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  iconSize?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-ring",
        className,
      )}
    >
      {children}
      <ArrowUpRight size={iconSize} aria-hidden />
    </a>
  );
}
