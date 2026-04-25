import type { ReactNode } from "react";
import { AnsiLine, type AnsiLineTokens } from "@/components/primitives/ansi-line";
import { cn } from "@/lib/utils";

export type TerminalVariant = "code" | "terminal";

export function TerminalWindow({
  variant,
  title,
  lines,
  children,
  className,
}: {
  variant: TerminalVariant;
  title: string;
  lines?: AnsiLineTokens[];
  children?: ReactNode;
  className?: string;
}) {
  const body =
    lines && lines.length > 0 ? (
      lines.map((line, i) => <AnsiLine key={i} tokens={line} />)
    ) : (
      children
    );

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-terminal-rule bg-terminal-bg shadow-cc-terminal",
        className,
      )}
      data-variant={variant}
    >
      <div className="flex items-center gap-2 border-b border-terminal-rule bg-terminal-bg-2 px-3 py-2.5 sm:px-4">
        <span aria-hidden className="size-[11px] shrink-0 rounded-full bg-tl-red" />
        <span aria-hidden className="size-[11px] shrink-0 rounded-full bg-tl-yellow" />
        <span aria-hidden className="size-[11px] shrink-0 rounded-full bg-tl-green" />
        <span className="mx-auto truncate font-mono text-[11.5px] text-ansi-dim">
          {title}
        </span>
        <span aria-hidden className="hidden w-[33px] shrink-0 sm:block" />
      </div>
      <pre className="overflow-x-auto px-3 py-3 font-mono text-[11px] leading-[1.7] tracking-[0.04em] text-terminal-fg sm:px-5 sm:py-4 sm:text-[13px]">
        {body}
      </pre>
    </div>
  );
}
