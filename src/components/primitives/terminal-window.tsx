import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { AnsiLine, type AnsiLineTokens } from "@/components/primitives/ansi-line";
import { cn } from "@/lib/utils";

export type TerminalVariant = "code" | "terminal";

function extractPlainText(lines: AnsiLineTokens[]): string {
  return lines.map((line) => line.map((tok) => tok.text).join("")).join("\n");
}

export function TerminalWindow({
  variant,
  title,
  lines,
  copyText,
  children,
  className,
}: {
  variant: TerminalVariant;
  title: string;
  lines?: AnsiLineTokens[];
  copyText?: string;
  children?: ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const textToCopy = copyText ?? (lines ? extractPlainText(lines) : undefined);

  const handleCopy = async () => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = textToCopy;
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

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
      <div className="relative">
        {textToCopy && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="absolute top-2.5 right-2.5 z-10 inline-flex size-7 items-center justify-center rounded-[3px] border border-terminal-rule bg-terminal-bg-2 text-ansi-dim transition-colors hover:text-terminal-fg sm:top-3 sm:right-3"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        )}
        <pre className="overflow-x-auto px-3 py-3 font-mono text-[11px] leading-[1.7] tracking-[0.04em] text-terminal-fg sm:px-5 sm:py-4 sm:text-[13px]">
          {body}
        </pre>
      </div>
    </div>
  );
}
