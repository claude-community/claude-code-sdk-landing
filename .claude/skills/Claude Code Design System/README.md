# Claude Code Design System

A design system for **Claude Code**, Anthropic's agentic coding tool that lives in the terminal, IDE, desktop app, and browser. The brand sits at the intersection of two visual languages: **Anthropic's editorial / paper aesthetic** (warm cream backgrounds, terracotta accent, serif display) and **first-class terminal/IDE chrome** (warm-black surfaces, ANSI-flavored syntax accents, monospace).

Live entry: <https://claude.com/product/claude-code> · Docs: <https://code.claude.com/docs/en/overview>

## Sources

This system was assembled from:

- **Marketing site** — `https://claude.com/product/claude-code` (brand voice, hero language, color, type)
- **Docs site** — `https://code.claude.com/docs/en/overview` (Mintlify chrome adapted to Anthropic palette; quickstart language; CLI command examples)
- **Product surfaces** documented by Anthropic:
  - Terminal CLI (`claude` command, refreshed v2.0 interface, `Ctrl+R` history, `/rewind`, `/model`)
  - VS Code extension (inline diffs, sidebar panel)
  - JetBrains plugin
  - Desktop app (visual diff review, parallel sessions, schedules)
  - Claude Code on the web (`claude.ai/code`)
  - Claude Agent SDK (Python + TypeScript)
  - Slack integration (`@Claude` bug-report → PR)
  - GitHub Actions / GitLab CI/CD
- **Anthropic news posts** — *Enabling Claude Code to work more autonomously* (Sep 29, 2025), *Introducing Claude Design by Anthropic Labs*
- **Community references** for Anthropic palette confirmation: Mobbin (Crail `#C15F3C`, Cloudy `#B1ADA1`, Pampas `#F4F3EE`)

> **Note for the reader:** the marketing site and docs CDN images were not directly downloadable in this build environment. Logo SVGs are provided as flagged substitutes — see *Caveats* at the bottom.

## Products / Surfaces Represented

| Surface | Where it lives | What it looks like |
| --- | --- | --- |
| **Terminal CLI** | macOS / Linux / Windows / WSL terminal | `claude` REPL, ANSI colors on warm-black, status line, prompt history |
| **VS Code extension** | Inside VS Code (and Cursor / Windsurf forks) | Sidebar panel, inline diffs, `@`-mentions, plan-review |
| **Claude Code on the Web** | `claude.ai/code` (browser + iOS app) | Anthropic web chrome — cream canvas, sidebar, code-rendering pane, task list |
| **Desktop app** | Standalone macOS/Windows app | Multi-session manager, visual diffs, recurring task scheduler |
| **Docs site** | `code.claude.com/docs` | Mintlify shell themed with Anthropic palette |
| **Marketing page** | `claude.com/product/claude-code` | Editorial — Fraunces/Tiempos display headlines on Pampas cream |

This design system covers two UI kits: **`web` (claude.ai/code browser surface)** and **`marketing` (product landing page)**. The terminal aesthetic shows up as a recurring component (`<TerminalWindow />`) used in both kits.

## Index

| File / Folder | What's in it |
| --- | --- |
| `README.md` | This file — context, content + visual fundamentals, iconography |
| `colors_and_type.css` | All design tokens: colors, type, spacing, radii, shadow, motion |
| `SKILL.md` | Cross-compatible skill manifest (works in Claude Code as an Agent Skill) |
| `assets/` | Logos (Anthropic + Claude Code wordmark), icons, brand marks |
| `preview/` | Design System tab cards — colors, type, spacing, components, brand |
| `ui_kits/web/` | Click-thru recreation of `claude.ai/code` browser surface |
| `ui_kits/marketing/` | Recreation of `claude.com/product/claude-code` landing page |

## Content Fundamentals

**Voice.** Direct, terminal-fluent, confident without bravado. Sentences favor active verbs and concrete nouns. Marketing copy speaks **to "you" the developer** ("Describe what you need, and Claude handles the rest"); product UI is mostly **declarative** — labels name objects (`Sessions`, `Plan`, `Diff`), buttons name actions (`Resume`, `Rewind`, `Continue task`).

**Casing.** **Sentence case** for buttons, nav, page titles, and headings ("Get started", "What you can do", "Continue task", "Run on the web"). Slash-commands and code identifiers stay verbatim (`/rewind`, `claude --teleport`, `CLAUDE.md`). Eyebrow labels in caps with monospace tracking ("GETTING STARTED").

**Density.** Mid. Marketing pages have generous whitespace and editorial line-length. Docs pages are denser but still air-y. The terminal interface is dense by physical constraint; UI choices respect it (no wasted lines, ANSI compactness).

**Headline pattern.** Marketing headlines are **short, declarative, often two beats**:
- "Code at the speed of thought."
- "Your terminal is where real work happens."
- "Work from anywhere."

**Body pattern.** Concrete, second-person, action-oriented:
- "Describe the bug, the feature, or the refactor."
- "Pipe logs into it, run it in CI, or chain it with other tools."
- "Step away from your desk and keep working from your phone."

**Code-as-content.** Code blocks aren't decoration — they're the demo. Marketing surfaces include **real terminal sessions** (`claude "write tests for the auth module..."`) styled exactly like the CLI, with prompt glyph and ANSI colors intact.

**Emoji.** **Never** in product UI or docs body copy. The brand identity is editorial + technical, not playful. Status uses semantic ANSI-style indicators (●, ✓, ✗) when needed, in colored monospace.

**Tone words.** Capable. Composable. Terminal-fluent. Editorial. Warm-but-precise. **Not**: cute, jokey, gradient-y, "AI-magical".

**Example strings (lifted from product / docs):**
- Hero pattern: "Work with Claude directly in your codebase. Build, debug, and ship from your terminal, IDE, Slack, or the web."
- Doc microcopy: "Choose your environment to get started." / "You'll be prompted to log in on first use. That's it!"
- CLI status: `● Working...`, `✓ Wrote 3 files`, `✗ Test failed (2 of 14)`
- Slash commands referenced: `/rewind`, `/model`, `/loop`, `/schedule`, `/desktop`, `/clear`, `/bug`
- Buttons: "Get started", "Install for VS Code", "Download", "Continue task", "Open PR"

## Visual Foundations

**Color vibe.** **Warm + editorial + terminal.** The default canvas is `#F4F3EE` Pampas cream — the same paper-toned background Anthropic uses across `anthropic.com` and `claude.ai`. The single brand accent is a terracotta `#C15F3C` (Anthropic's "Crail" / "Claude Orange"), used **sparingly** — primary buttons, focus rings, the brand wordmark, one-or-two key accent moments per page. Neutrals are **warm-grey**, not cool-grey (`#1F1E1B` near-black has a brown undertone). Terminal surfaces flip to a warm-black `#161513` with ANSI-flavored syntax accents.

**Typography.** A three-family system:
- **Display: Fraunces** (substitute for Anthropic's licensed Tiempos / Copernicus). Editorial serif used for hero headlines and long-form titles. Optical sizing on. Weight 400 default.
- **UI / body: Inter** (substitute for Anthropic's Styrene B). Used for buttons, nav, forms, body copy.
- **Mono: JetBrains Mono.** Used for terminal output, code blocks, slash-commands, eyebrow labels, status badges.

Default body is **16px / 1.6 line-height**. Marketing display tops out at 72–96px; UI headings rarely exceed 28–40px.

**Spacing.** 4pt grid. Marketing uses generous vertical rhythm (sections 96–128px apart). Product UI tightens to 16–24px between blocks. Inside cards: 24px padding default.

**Backgrounds.** **No gradient backgrounds**, **no AI slop blue/purple washes.** Surfaces are flat warm neutrals. The contrast comes from material — paper (Pampas) sits next to terminal (warm-black) sits next to elevated card (Bone). The marketing site occasionally uses a **full-bleed terminal window** as a hero illustration. No stock photography. No emoji-as-illustration.

**Imagery.** Two kinds appear in the system:
1. **Terminal screenshots** — full-bleed, real CLI output, the actual visual workhorse.
2. **Anthropic editorial photography** — when shown, it's warm, slightly grainy, neutral-saturated (cream/sand/terracotta tones). Never blue-tinted, never "tech stock".

**Animation.** Restrained. **200ms standard ease** (`cubic-bezier(0.2, 0, 0, 1)`) for most state changes. Hover states fade, never pop. Terminal cursor blinks at 1Hz square. No bounces, no parallax, no scroll-jacking. The one "delight" moment is a **typing-in animation** in marketing terminals (characters appear at ~30ms intervals).

**Hover states.** Soft. Buttons darken accent (`--cc-orange` → `--cc-orange-deep`). Nav items get a 6% accent-tint background. Cards lift with `--cc-shadow-md` instead of changing color.

**Press / active states.** Press = darker fill, no scale animation. Selected nav items use the accent tint background plus accent-colored text + a 2px left rule (used **only** for "selected", never as decoration).

**Borders.** Hairline `1px solid var(--cc-border)` (warm rule color `#DCD9CF`). Cards usually have **either** a border **or** a shadow, rarely both. Terminal window has a 1px inner highlight border for the "lifted glass" effect.

**Shadows.** Warm-tinted (`rgba(31, 30, 27, ...)`), never neutral grey, never bluish. Terminal-window shadow is the most pronounced (`0 24px 60px -12px rgba(31, 30, 27, 0.25)`); UI cards much softer.

**Radii.** `3px` for tags / inline code. `6px` for buttons + form fields. `8px` for cards + popovers + terminal title-bar buttons. `12px` for the terminal window itself and large hero cards. `999px` for status pills.

**Layout rules.** Marketing pages center on a **1200px max content width** with 24px gutters. Doc pages have a fixed left sidebar (240px), a content column (max 760px), and a right TOC (200px). Web app uses a 60px collapsed-icon sidebar that expands to 240px on hover.

**Transparency & blur.** **Used sparingly.** The marketing nav has `backdrop-filter: blur(12px) saturate(160%)` over an 80% white. Modals use 60% black scrim. **Otherwise everything is opaque** — no glassmorphism panels, no frosted cards.

**Color vibe of imagery.** Warm. Slightly desaturated. Cream/sand/terracotta tones if the image is of a workspace; high-contrast warm-black if it's a terminal screenshot. **Not** cool, not blue, not neon, not gradient.

**Cards.** Bone background (`#FAF9F5`) on Pampas canvas. 8px radius. Hairline border `#DCD9CF`. No shadow at rest, soft `--cc-shadow-md` on hover/elevated. 24px internal padding.

**Capsules vs left-rule accents.** **Capsules** (rounded pills) are reserved for **status** (`Running`, `Succeeded`, `Beta`). **Left-rule accents** are reserved for **selected nav items**. Never mix.

## Iconography

**System.** **Lucide** (https://lucide.dev) is used as the canonical icon set throughout this design system. The Mintlify-driven docs site, the marketing site, and the product surfaces all use icons in the same general style — outlined, 1.5px stroke, square-cap, 24px default. Lucide is the closest open CDN match.

**Loading via CDN.** Icons are loaded with the official Lucide web component:
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<i data-lucide="terminal"></i>
```

**Style rules.**
- 1.5px stroke, outlined (filled variants almost never used)
- 16px (inline w/ text), 20px (buttons), 24px (nav, default)
- Color inherits `currentColor`. Default `var(--cc-fg-2)`; selected nav flips to `var(--cc-accent)`
- Square line-caps, square corners (matches the terminal-aesthetic kinship)

**Common icons used in this system:** `terminal`, `code-2`, `command`, `file-code`, `git-branch`, `git-pull-request`, `play`, `square`, `chevron-right`, `chevron-down`, `chevrons-right`, `arrow-up-right`, `slash`, `sparkles`, `zap`, `check`, `x`, `circle`, `external-link`, `book-open`, `package`, `webhook`.

**Logos.** Two formal lockups:
1. **Claude Code wordmark** — terminal-prompt glyph (`>_`) followed by "claude code" set in a monospace face. SVG provided in `assets/claude-code-logo-light.svg` and `assets/claude-code-logo-dark.svg`.
2. **Anthropic / Claude star** — the geometric star mark used as the favicon and small brand touch.

**Emoji / unicode.** **Never.** The terminal interface uses ANSI status glyphs (`●`, `✓`, `✗`, `⏵`) rendered in the mono face — these are unicode characters but they're acting as **terminal output**, not as decorative emoji.

## Font Substitution — FLAGGED

Anthropic's brand uses **Tiempos** (or its successor "Copernicus") for editorial display and **Styrene B** for UI. Both are licensed and not redistributable.

**Substitutions in this system:**
- **Fraunces** ≈ Tiempos / Copernicus (open-source, optical-sizing variable, similar editorial proportions). Loaded from Google Fonts.
- **Inter** ≈ Styrene B (close-but-not-identical x-height and grotesque feel). Loaded from Google Fonts.
- **JetBrains Mono** for terminal — this is genuinely close to Anthropic's documentation mono and is the recommended substitute.

**Ask:** if pixel-perfect parity is required, please provide WOFF2 files for Tiempos Headline and Styrene B and update `colors_and_type.css`'s `@font-face` block. The CSS variables (`--cc-font-display`, `--cc-font-sans`) make this a one-line swap.

## Caveats

- **Logo SVGs are placeholder reconstructions** built from the visible mark, not direct downloads of Anthropic's source files. The Mintlify CDN URL is documented in `assets/logo-source-note.txt` so a fresh logo can be dropped in.
- **Color hexes** are reconstructed from public references (Mobbin, anthropic.com inspection) and tuned for the warm-cream/terracotta system. They are very close to brand but may differ a few percent from internal Anthropic Figma sources.
- **Tiempos / Styrene** substituted with **Fraunces / Inter** — flagged above.
- **UI kits** cover the marketing landing and the Claude Code on the Web surface. The native Terminal CLI is represented as a **`<TerminalWindow />` component** used inside both kits (a real OS terminal can't be recreated in the browser; the component captures the visual treatment). The Desktop app and JetBrains plugin are not separate kits — they share visual tokens with the Web kit.
