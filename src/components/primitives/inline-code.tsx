import type { ReactNode } from "react";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "chip" | "shell";

export function InlineCode({
  children,
  variant = "chip",
  copyText,
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  copyText?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = copyText;
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

  return (
    <span className="inline-flex items-center gap-2">
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
      {copyText && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy"}
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-[3px] border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      )}
    </span>
  );
}
