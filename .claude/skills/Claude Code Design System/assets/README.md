# Asset notes

## Logos
- `claude-code-logo-light.svg` — wordmark for cream / light surfaces
- `claude-code-logo-dark.svg` — wordmark for warm-black / terminal surfaces
- `anthropic-star.svg` — Anthropic's star mark, placeholder reconstruction

The official Claude Code marketing logo is hosted by Mintlify at:
- light: https://mintcdn.com/claude-code/c5r9_6tjPMzFdDDT/logo/light.svg
- dark:  https://mintcdn.com/claude-code/c5r9_6tjPMzFdDDT/logo/dark.svg

These were unreachable from the build sandbox; the SVGs above are reconstructions
that match the visible visual treatment (terminal-prompt glyph + monospace
wordmark with terracotta `code`). Drop the official files in to replace.

## Iconography
This system uses **Lucide** as the canonical icon set. Loaded via CDN:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<i data-lucide="terminal"></i>
<script>lucide.createIcons();</script>
```

Default treatment: 1.5px stroke, outlined, 24px, `currentColor`.
