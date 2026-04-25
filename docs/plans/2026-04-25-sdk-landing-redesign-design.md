# SDK Landing 重构设计文档

- Date: 2026-04-25
- Repo: `claude-code-sdk-landing`
- Topic: 基于 Claude Code Design System 用 shadcn 彻底重写三语言 SDK 落地页

## 背景

`claude-code-node` / `claude-code-go` / `claude-code-python` 三个仓库是 Claude Code CLI 的语言封装 SDK：用户在自己的 Node.js / Go / Python 程序里 import / require / import 该 SDK，在底层 spawn 官方的 `@anthropic-ai/claude-code` CLI 作为子进程。**它们是库，不是命令行工具。**

`claude-code-sdk-landing` 现有一版 `App.tsx` 使用 8-bit 像素复古风（纯 inline style + `--gold` / `--mint` / `--coral` 三色调色板 + `steps(10)` 动画），与仓库里已搭好的 shadcn / Tailwind v4 / design system 方向完全不符。`public/` 下已有三份 `llms-{node,go,python}.txt`，质量过关但放错位置（应跟 SDK 源码走版本）。

## 目标

1. 按 Claude Code Design System 彻底重写 UI — warm cream 背景 + 赤陶单色 accent + Fraunces/Inter/JetBrains Mono 三家族字体，禁 emoji / 禁渐变 / 禁 glassmorphism（nav 除外）。
2. 首屏 Hero 是三语言 Tabs 入口，选中即展开一屏详情（install + quickstart + stats + GitHub/llms.txt CTA）。
3. 中英双文通过右上角 toggle 一键切换，localStorage 记忆。
4. 三份 llms.txt 迁移到各 SDK 仓库根目录，landing 上通过 raw.githubusercontent.com URL 引用 — 文档跟随 SDK 版本迭代，landing 保持稳定。
5. 严守 CSS 变量纪律：组件代码里 0 处 hex 字面量，全部走 Tailwind 类或 `var(--cc-*)`。

## 非目标

- 不做暗色模式（design system 本就以 cream canvas 为主调）。
- 不引 i18n 库、测试框架、syntax highlighter、动效库。
- 不重新生成 llms.txt 内容，复用现有文本。
- 不做深链路由 / URL 同步 tab 状态 / SEO meta 优化（landing 单页介绍，无此需求）。

## 架构概要

**技术栈（沿用）**：Vite 8 · React 19 · TypeScript 5.7 · Tailwind v4 · shadcn `new-york` · Lucide Icons

**核心思路**：两层 CSS 变量映射
- 第一层：`:root` 里完整引入 design system 的 `--cc-*` tokens（pampas, bone, ink, orange, rule, ansi-*, terminal-*, fonts, spacing）
- 第二层：shadcn 语义名（`--background / --primary / --border / --muted / --ring`）通过别名指向第一层
- Tailwind v4 `@theme inline` 块把第二层暴露成 `bg-background / text-primary / border-border / text-ansi-green` 等原子类

结果：shadcn 所有组件天然符合 design system，同时允许直接使用 `text-ansi-cyan` 这类场景色。

## 页面纵向节奏（6 段）

1. **SiteHeader** — wordmark + `EN | 中` 切换；sticky top-0；`backdrop-blur-sm` 唯一例外
2. **Hero** — Fraunces H1 + Inter lead + 三语言 Card-as-Tabs + 选中后 TabsContent（install chip + `<TerminalWindow variant="code">` quickstart + 3 个 StatCard + GitHub & llms CTA）
3. **TestedSection** — `<TerminalWindow variant="terminal">` 展示 `bun test` / `go test` / `pytest` 真实 ANSI 着色输出；右栏 4 个指标 StatCard
4. **ComparisonSection** — shadcn Table，7 行 × 4 列特性对比（Streaming / Cancellation / Concurrency / Parser / Runtime deps / Unit tests / E2E tests）
5. **LlmsSection** — 三张 Card：curl mini-terminal + Copy 按钮 + "View on GitHub" 外链，指向 `raw.githubusercontent.com/oceanz0312/claude-code-{node,go,python}/main/llms.txt`
6. **SiteFooter** — MIT · 三 repo 链接

## 组件目录

```
src/
├── App.tsx
├── main.tsx
├── index.css                         两层 CSS 变量映射 + @theme inline
├── lib/
│   ├── utils.ts                      cn()
│   ├── sdk-data.ts                   三语言元数据（单一数据源）
│   └── i18n.tsx                      LangProvider + useT()
├── components/
│   ├── ui/                           shadcn 原语（button/card/tabs/table/badge）
│   ├── primitives/
│   │   ├── eyebrow.tsx
│   │   ├── section-shell.tsx
│   │   ├── inline-code.tsx
│   │   ├── stat-card.tsx
│   │   ├── ansi-line.tsx
│   │   ├── terminal-window.tsx       variant: "code" | "terminal"
│   │   ├── copy-button.tsx
│   │   └── external-link.tsx
│   └── sections/
│       ├── site-header.tsx
│       ├── hero.tsx
│       ├── sdk-tabs.tsx
│       ├── tested-section.tsx
│       ├── comparison-section.tsx
│       ├── llms-section.tsx
│       └── site-footer.tsx
```

**删除**：`src/components/{hero,nav,sdk-tabs,comparison-table,footer}.tsx`（已存在的旧版本）、`public/llms-{node,go,python}.txt`。

## TerminalWindow 关键区分

```tsx
<TerminalWindow variant="code" title="quickstart.ts" />     // 纯文件名，不画 >_，内容是地道源代码
<TerminalWindow variant="terminal" title="bun test" />      // 命令行场景，允许 ● ✓ ✗ 状态 glyph 和 ANSI 输出
```

**关键**：code variant 里绝不画 shell 提示符 `>_`，内容必须是对应语言的地道代码（Node 用 ESM `import`；Go `package main` + 正确 import；Python `async def` + `asyncio.run()`）。这是 SDK 而非 CLI 的视觉保证。

## 数据流

两个全局状态走 React Context：
- `lang: "en" | "zh"` — 初始化：`localStorage.lang` → `navigator.language` → `"en"`；变更写回 localStorage 并同步 `<html lang>`
- `activeSdk: "node" | "go" | "python"` — 默认 `"node"`；由 Hero SdkTabs 驱动；TestedSection 订阅同一状态

所有文案集中在 `sdk-data.ts` 和 `i18n.tsx`。组件只消费、不藏字符串。ANSI 着色内容用 `AnsiToken[]` 结构存储，`<AnsiLine>` 原语是唯一出口。

## CSS 变量纪律

- 组件代码 0 处 hex 字面量（ESLint `no-restricted-syntax` 规则强制）
- 字体只走 `font-display / font-sans / font-mono` 三个 Tailwind 类
- ANSI 颜色只走 `text-ansi-{green,red,yellow,blue,cyan,purple,dim}`
- 暗色模式 / 其他 theme：未来只改 `:root` 映射，组件不动

## llms.txt 迁移

1. 把 `claude-code-sdk-landing/public/llms-node.txt` 复制到 `claude-code-node/llms.txt`；其余两份同理
2. 从 `public/` 删除三份旧文件
3. Landing 上的链接常量指向 `https://raw.githubusercontent.com/oceanz0312/claude-code-{key}/main/llms.txt`（Copy curl 用）和 `https://github.com/oceanz0312/claude-code-{key}/blob/main/llms.txt`（View on GitHub 用）
4. 三个 SDK 仓库各自 commit & push 新文件（这部分由用户执行或确认后再进行）

## 错误处理 / 边界

| 场景 | 处理 |
|---|---|
| 剪贴板 API 不可用 | textarea + execCommand('copy') fallback |
| localStorage 不可写 | try/catch，降级为内存持有 |
| 字体加载慢 | `&display=swap` + fallback 字体栈 |
| prefers-reduced-motion | 禁用 TerminalWindow 的 step-in 动画 |
| 小屏响应式 | Hero 三卡 `md:grid-cols-3`；Comparison table `overflow-x-auto`；TerminalWindow body `overflow-x-auto` |
| 键盘 a11y | shadcn Tabs 默认 arrow key；toggle `aria-pressed`；Copy `aria-live="polite"` |

## 验收标准（DoD）

1. `npm run build` / `npm run lint` / `tsc --noEmit` 全绿
2. Desktop / tablet / mobile 三档视觉无溢出无空白
3. 中英切换 + localStorage 记忆 · 三语言 tab 切换 + 联动 TestedSection · Copy curl 三个交互通过
4. 三份 llms.txt 已迁移到各 SDK 仓库根目录并可通过 raw URL 200 访问
5. `git grep -nE "#[0-9a-fA-F]{3,8}" src/components src/App.tsx` 输出为空
6. `grep -rP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" src/` 输出为空
7. 所有 section 使用 `SectionShell`，所有 ANSI 走 `AnsiLine`，所有外链走 `ExternalLink`
8. 本设计文档入库

## 开放事项

- landing 仓库尚未 `git init`，设计文档和后续改动是否要初始化版本控制、由用户决定
- llms.txt 推送到三个 SDK 仓库的时间点（立即 vs 本次 landing 落地后再推）由用户确认
