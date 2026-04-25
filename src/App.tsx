import { Eyebrow } from "@/components/primitives/eyebrow";
import { InlineCode } from "@/components/primitives/inline-code";
import { StatCard } from "@/components/primitives/stat-card";
import { ExternalLink } from "@/components/primitives/external-link";
import { CopyButton } from "@/components/primitives/copy-button";
import { AnsiLine, type AnsiLineTokens } from "@/components/primitives/ansi-line";
import { TerminalWindow } from "@/components/primitives/terminal-window";
import { SectionShell } from "@/components/primitives/section-shell";

const bunTestLines: AnsiLineTokens[] = [
  [
    { color: "dim", text: "$ " },
    { text: "bun test" },
  ],
  [{ color: "dim", text: "bun test v1.1.38" }],
  [],
  [
    { color: "green", text: "✓ " },
    { text: "ClaudeCode › startSession creates session " },
    { color: "dim", text: "[12ms]" },
  ],
  [
    { color: "green", text: "✓ " },
    { text: "Session › run() resumes automatically " },
    { color: "dim", text: "[34ms]" },
  ],
  [
    { color: "green", text: "✓ " },
    { text: "Streaming › AsyncIterable yields events " },
    { color: "dim", text: "[8ms]" },
  ],
  [],
  [
    { color: "green", text: "40 pass" },
    { color: "dim", text: " · " },
    { text: "0 fail" },
    { color: "dim", text: " · 183 expect() calls" },
  ],
];

const codeLines: AnsiLineTokens[] = [
  [
    { color: "purple", text: "import" },
    { text: " { ClaudeCode } " },
    { color: "purple", text: "from" },
    { text: " " },
    { color: "cyan", text: '"claude-code-node"' },
    { text: ";" },
  ],
  [],
  [
    { color: "purple", text: "const" },
    { text: " claude = " },
    { color: "purple", text: "new" },
    { text: " ClaudeCode();" },
  ],
  [
    { color: "purple", text: "const" },
    { text: " session = claude.startSession({ model: " },
    { color: "cyan", text: '"sonnet"' },
    { text: " });" },
  ],
  [],
  [
    { color: "purple", text: "const" },
    { text: " turn = " },
    { color: "purple", text: "await" },
    { text: " session.run(" },
    { color: "cyan", text: '"Fix the failing tests in src/"' },
    { text: ");" },
  ],
  [{ text: "console.log(turn.finalResponse);" }],
];

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <div className="font-display text-[22px] leading-none">
            Claude <span className="text-primary">code</span>
            <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              / SDK primitives gallery
            </span>
          </div>
          <ExternalLink
            href="https://github.com/oceanz0312"
            className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground"
          >
            oceanz0312
          </ExternalLink>
        </div>
      </header>

      <SectionShell
        eyebrow={<Eyebrow>01 · Eyebrow &amp; InlineCode</Eyebrow>}
        title="Small labels, correct type."
        lead="Eyebrow sits above every section in mono uppercase. InlineCode is the chip for install commands and short slash-command references."
        bordered={false}
      >
        <div className="flex flex-wrap items-center gap-3">
          <InlineCode variant="shell">npm install claude-code-node</InlineCode>
          <InlineCode>go get github.com/oceanz0312/claude-code-go</InlineCode>
          <InlineCode>pip install claude-code-python</InlineCode>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={<Eyebrow>02 · StatCard</Eyebrow>}
        title="Numbers that earn trust."
        lead="Display font for the number, mono tracker for the label. No extra decoration — the typography pairing does the work."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard value="39" label="tests" />
          <StatCard value="99.71%" label="line coverage" />
          <StatCard value="183" label="expect() calls" />
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={<Eyebrow>03 · ExternalLink &amp; CopyButton</Eyebrow>}
        title="Take action."
        lead="External links always open in a new tab and carry the up-right arrow. CopyButton is used for curl commands in the llms.txt section."
      >
        <div className="flex flex-wrap items-center gap-6">
          <ExternalLink href="https://github.com/oceanz0312/claude-code-node">
            View on GitHub
          </ExternalLink>
          <ExternalLink href="https://raw.githubusercontent.com/oceanz0312/claude-code-node/master/llms.txt">
            Raw llms.txt
          </ExternalLink>
          <CopyButton text="curl -s https://raw.githubusercontent.com/oceanz0312/claude-code-node/master/llms.txt" />
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={<Eyebrow>04 · AnsiLine (standalone)</Eyebrow>}
        title="ANSI is the only source of color in terminals."
        lead="AnsiLine renders a typed AnsiToken[] — the only way components are allowed to emit ANSI colors."
      >
        <div className="rounded-md border border-terminal-rule bg-terminal-bg px-5 py-4 font-mono text-[13px] leading-[1.7] text-terminal-fg">
          <AnsiLine tokens={[{ color: "green", text: "✓ " }, { text: "Success" }]} />
          <AnsiLine tokens={[{ color: "red", text: "✗ " }, { text: "Error" }]} />
          <AnsiLine tokens={[{ color: "yellow", text: "⏵ " }, { text: "Running" }]} />
          <AnsiLine tokens={[{ color: "blue", text: "→ " }, { text: "Info" }]} />
          <AnsiLine tokens={[{ color: "cyan", text: '"string path"' }]} />
          <AnsiLine tokens={[{ color: "purple", text: "keyword" }]} />
          <AnsiLine tokens={[{ color: "dim", text: "muted timing [12ms]" }]} />
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={<Eyebrow>05 · TerminalWindow — terminal variant</Eyebrow>}
        title="Real outputs, not screenshots."
        lead="The terminal variant is used in the Tested & reliable section: command title, ANSI output, status glyphs."
      >
        <TerminalWindow variant="terminal" title="bun test" lines={bunTestLines} />
      </SectionShell>

      <SectionShell
        eyebrow={<Eyebrow>06 · TerminalWindow — code variant</Eyebrow>}
        title="Source, not a shell session."
        lead="The code variant uses a plain filename as the title — no >_ prompt — so the SDK is presented as a library, not a CLI."
      >
        <TerminalWindow variant="code" title="quickstart.ts" lines={codeLines} />
      </SectionShell>

      <SectionShell
        eyebrow={<Eyebrow>07 · SectionShell</Eyebrow>}
        title="You are reading it."
        lead="Every section in the real landing page lives inside a SectionShell — same eyebrow rhythm, same max-width, same top rule."
      >
        <p className="font-sans text-[15px] text-ink-soft">
          Nothing to demo here — this entire gallery already proves the shell
          works. Next phase wires the real data model and section components.
        </p>
      </SectionShell>
    </main>
  );
}
