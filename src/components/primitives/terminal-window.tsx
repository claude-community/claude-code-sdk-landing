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
      <div className="flex items-center gap-2 border-b border-terminal-rule bg-terminal-bg-2 px-4 py-2.5">
        <span aria-hidden className="size-[11px] rounded-full bg-tl-red" />
        <span aria-hidden className="size-[11px] rounded-full bg-tl-yellow" />
        <span aria-hidden className="size-[11px] rounded-full bg-tl-green" />
        <span className="mx-auto font-mono text-[11.5px] text-ansi-dim">
          {title}
        </span>
        <span aria-hidden className="w-[46px]" />
      </div>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-[1.6] text-terminal-fg">
        {body}
      </pre>
    </div>
  );
}
