import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[960px] px-6 py-20 space-y-10">
        <header>
          <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-orange-deep">
            Phase 2 · Infrastructure smoke test
          </div>
          <h1 className="mt-3 font-display text-[64px] leading-[0.95] tracking-[-0.02em]">
            Warm cream, terracotta accent.
          </h1>
          <p className="mt-4 max-w-[60ch] font-sans text-[17px] leading-relaxed text-ink-soft">
            Design system tokens are wired. Fraunces display font, Inter body,
            JetBrains Mono for eyebrow and code. All shadcn primitives route
            through the semantic aliases so nothing here uses a hex literal.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-[12px] uppercase tracking-[0.08em]">
                Primary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Install Claude Code SDK</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-[12px] uppercase tracking-[0.08em]">
                Outline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Read the docs</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-[12px] uppercase tracking-[0.08em]">
                Ghost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="ghost">View on GitHub</Button>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-md border border-border bg-terminal-bg p-5 font-mono text-[13px] leading-[1.7] text-terminal-fg shadow-cc-terminal">
          <div className="mb-3 flex items-center gap-2 text-terminal-dim text-[11px]">
            <span className="inline-block size-3 rounded-full bg-tl-red" />
            <span className="inline-block size-3 rounded-full bg-tl-yellow" />
            <span className="inline-block size-3 rounded-full bg-tl-green" />
            <span className="ml-auto mr-auto">claude · ansi palette</span>
          </div>
          <div>
            <span className="text-ansi-green">●</span> ANSI green — status OK
          </div>
          <div>
            <span className="text-ansi-red">✗</span> ANSI red — error
          </div>
          <div>
            <span className="text-ansi-yellow">⏵</span> ANSI yellow — warning
          </div>
          <div>
            <span className="text-ansi-blue">→</span> ANSI blue — info / links
          </div>
          <div>
            <span className="text-ansi-cyan">"string"</span> cyan — strings
          </div>
          <div>
            <span className="text-ansi-purple">const</span> purple — keywords
          </div>
        </section>
      </div>
    </main>
  );
}
