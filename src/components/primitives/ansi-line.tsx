import { cn } from "@/lib/utils";

export type AnsiColor =
  | "green"
  | "red"
  | "yellow"
  | "blue"
  | "cyan"
  | "purple"
  | "dim";

export type AnsiToken = {
  text: string;
  color?: AnsiColor;
  bold?: boolean;
};

export type AnsiLineTokens = AnsiToken[];

const colorClass: Record<AnsiColor, string> = {
  green: "text-ansi-green",
  red: "text-ansi-red",
  yellow: "text-ansi-yellow",
  blue: "text-ansi-blue",
  cyan: "text-ansi-cyan",
  purple: "text-ansi-purple",
  dim: "text-ansi-dim",
};

export function AnsiLine({ tokens }: { tokens: AnsiLineTokens }) {
  if (tokens.length === 0) {
    return <div>&nbsp;</div>;
  }
  return (
    <div>
      {tokens.map((tok, i) => (
        <span
          key={i}
          className={cn(tok.color && colorClass[tok.color], tok.bold && "font-bold")}
        >
          {tok.text}
        </span>
      ))}
    </div>
  );
}
