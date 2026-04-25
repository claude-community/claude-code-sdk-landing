import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionShell({
  id,
  eyebrow,
  title,
  lead,
  children,
  bordered = true,
  className,
}: {
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  bordered?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 py-10 sm:px-6 sm:py-14 md:py-16",
        bordered && "border-t border-border",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px]">
        {eyebrow && <div className="mb-4">{eyebrow}</div>}
        {title && (
          <h2 className="font-display text-[clamp(28px,4vw,40px)] font-normal leading-[1.1] tracking-[-0.02em] text-foreground">
            {title}
          </h2>
        )}
        {lead && (
          <p className="mt-4 max-w-[60ch] font-sans text-[15px] leading-relaxed text-ink-soft sm:text-[17px]">
            {lead}
          </p>
        )}
        <div className={cn((eyebrow || title || lead) && "mt-10")}>
          {children}
        </div>
      </div>
    </section>
  );
}
