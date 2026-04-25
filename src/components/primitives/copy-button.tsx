import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

async function writeClipboard(text: string): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    /* fall through to legacy path */
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "absolute";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
}

export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
  size = "sm",
  className,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  size?: "xs" | "sm" | "default";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      onClick={async () => {
        await writeClipboard(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }}
      aria-live="polite"
      className={cn("font-mono text-[12px]", className)}
    >
      {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      <span>{copied ? copiedLabel : label}</span>
    </Button>
  );
}
