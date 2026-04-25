---
name: claude-code-design-system
description: Design system tokens, components, and copywriting voice for Claude Code, Anthropic's agentic coding tool. Use this when creating any Claude Code marketing surface, product UI, documentation, or in-product collateral so output matches the warm-cream + terracotta + terminal aesthetic.
---

# Claude Code Design System Skill

When designing **anything that represents Claude Code** — landing pages, docs, in-product UI, slides, social images, blog posts — apply this system.

## TL;DR rules

1. **Background = warm cream `#F4F3EE` (Pampas)**, not white. Surfaces are warm; never blue-tinted.
2. **One accent = terracotta `#C15F3C` (Crail / "Claude Orange")**. Use sparingly: primary buttons, focus rings, the `code` half of the wordmark, the prompt glyph.
3. **Three-family type system**: Fraunces (display) · Inter (UI) · JetBrains Mono (terminal/code/eyebrow).
4. **Mono is structural**, not decorative. Terminal output, slash-commands, eyebrow labels, status pills — all monospace.
5. **No emoji**, no gradient backgrounds, no glassmorphism (one exception: marketing nav backdrop-blur).
6. **Code is content**, not chrome. Real `claude "…"` invocations belong in heroes, with ANSI-colored output.
7. **Warm-black `#161513`** for terminal surfaces, with ANSI accents (green `#5A8E5A`, red `#C44141`, yellow `#C99B2C`, blue `#3F7CAC`, cyan `#4F9A99`).
8. **Sentence case** for everything. Slash-commands stay verbatim (`/rewind`, `/model`, `CLAUDE.md`).
9. **Capsules for status only.** Left-rule accents for selected nav only. Don't decorate.
10. **Voice**: direct, terminal-fluent, confident. Never cute or "AI-magical".

## Files in this system

- `colors_and_type.css` — all tokens (CSS custom properties prefixed `--cc-`)
- `README.md` — full spec including content + visual fundamentals
- `assets/claude-code-logo-light.svg`, `claude-code-logo-dark.svg` — wordmarks
- `ui_kits/marketing/` — landing page recreation
- `ui_kits/web/` — `claude.ai/code` browser surface recreation
- `preview/` — Design System review cards (colors, type, spacing, components, brand)

## Quick component vocabulary

- **Terminal window** — 12px radius, warm-black bg, traffic-light dots, monospace title centered. Used as hero illustration in marketing and as the canonical code-display surface in product. Ship it whenever you'd otherwise use a generic `<pre>` or screenshot.
- **Card** — Bone bg (`#FAF9F5`) on Pampas canvas, 1px Rule border, 8px radius, 24px padding. Either border or shadow, not both.
- **Primary button** — terracotta fill, white text, 6px radius, 12px×20px padding. Often prefixed with `>_` glyph in mono.
- **Eyebrow label** — JetBrains Mono, 12px, `0.08em` tracking, uppercase, `--cc-orange-deep` color.
- **Slash-command tag** — inline mono in a pill: `--cc-bg-inset` bg, `--cc-border` border, 3px radius, 1px×6px padding.

## Copy patterns

**Hero headlines** are short, declarative, two beats max:
- "Code at the speed of thought."
- "The terminal is where real work happens."
- "One agent, every surface."

**Body copy** is concrete, second-person, action-oriented:
- "Describe what you need, and Claude handles the rest."
- "Pipe logs into it, run it in CI, or chain it with other tools."

**CLI status microcopy** uses ANSI conventions: `●` working, `✓` succeeded, `✗` failed, `⏵` running, `–` skipped.

## Guardrails — when in doubt, fail toward editorial

- If you reach for a gradient → use a flat warm neutral instead.
- If you reach for emoji → use a Lucide icon or an ANSI status glyph in mono.
- If you reach for blue/purple → use terracotta `#C15F3C` or warm grey.
- If you reach for a frosted card → use a flat Bone card with a 1px Rule border.
- If you reach for a long marketing paragraph → cut to two short sentences.
- If you reach for a stock photograph → use a terminal screenshot instead.

## Anti-patterns that AI design tools love and Claude Code does not

- Cyan-ish "default AI accent" (`#16d5e6`-adjacent) — replace with `#C15F3C`.
- Inter-as-display at huge sizes — Inter is body/UI only; display is **Fraunces**.
- Generic left-border accent strips on cards — reserve left-rule for "selected nav".
- Round-cornered chunky 16px-radius cards — keep cards crisp at 8px.
- "Claude purple" gradient hero — Claude Code's hero is cream paper, not gradient.

When you finish, read your output back and ask: *Does this look like it could sit next to `anthropic.com` and `claude.ai/code` without looking out of place?* If not, the most common fix is **less color, more whitespace, more monospace**.
