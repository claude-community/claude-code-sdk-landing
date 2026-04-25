# SDK Landing 重构实施计划

- Date: 2026-04-25
- Design doc: `./2026-04-25-sdk-landing-redesign-design.md`
- 工作目录: `/Users/bytedance/Documents/ttls_repo/claude-code-sdk-landing`

## 总览

共 7 个阶段，单人串行执行。每个阶段结束都有可验证的交付物，便于中途暂停 / 回滚 / 评审。预计总工作量：1-2 个工作日。

```
阶段 1  llms.txt 迁移到三个 SDK 仓库         [先完成，前置]
阶段 2  基础设施：token + 字体 + ESLint 规则
阶段 3  复用原语 8 个
阶段 4  数据层：sdk-data.ts + i18n.tsx
阶段 5  Section 组件 6 个
阶段 6  组装 App.tsx + 清理旧文件
阶段 7  浏览器验收 + 构建三绿
```

## 阶段 1 — llms.txt 迁移（前置）

**目标**：把现有 `public/llms-{node,go,python}.txt` 迁移到各 SDK 仓库根目录，让 landing 上的 raw URL 可用。

**步骤**
1. `cp claude-code-sdk-landing/public/llms-node.txt claude-code-node/llms.txt`
2. `cp claude-code-sdk-landing/public/llms-go.txt   claude-code-go/llms.txt`
3. `cp claude-code-sdk-landing/public/llms-python.txt claude-code-python/llms.txt`
4. 三个仓库各自 `git add llms.txt && git commit -m "docs: add llms.txt for agent consumption" && git push`
5. 从 landing 删除：`rm public/llms-{node,go,python}.txt`
6. Landing commit：`git add -u && git commit -m "chore: remove llms.txt from public, migrated to SDK repos"`

**验证**
- `curl -fsSL https://raw.githubusercontent.com/oceanz0312/claude-code-node/main/llms.txt | head -5` 返回 200 + 首行 `# claude-code-node`
- 另两个 raw URL 同样 200
- 三个 GitHub blob 页面可在浏览器打开

**风险**：用户 push 权限、分支名（可能是 `master` 而非 `main`）— 执行前先 `cd <repo> && git branch --show-current` 确认实际分支名，常量与实际对齐。

## 阶段 2 — 基础设施

**目标**：`index.css` 完成两层 CSS 变量映射；字体加载；ESLint 禁 hex 规则；`html lang` 占位。

**步骤**
1. 重写 `src/index.css`：
   - 顶部 `@import` Fraunces / Inter / JetBrains Mono（Google Fonts `display=swap`）
   - `@layer base { :root { --cc-*: ...; --background: var(--cc-pampas); ... } }`
   - `@theme inline { --color-background: var(--background); --color-ansi-green: var(--cc-ansi-green); --font-display: var(--cc-font-display); ... }`
   - `body { @apply bg-background text-foreground font-sans antialiased; }`
2. 更新 `eslint.config.js`：添加 `no-restricted-syntax` 规则禁组件内 hex 字面量
3. `index.html` 的 `<html lang>` 初始化为 `en`（`i18n.tsx` 运行时再同步）

**验证**
- `npm run dev`，打开页面背景是 warm cream（肉眼）
- `document.fonts.ready` 后 Fraunces / Inter / JetBrains Mono 都加载
- 故意在某组件写 `color: "#fff"`，`npm run lint` 报错
- `tsc --noEmit` 绿

## 阶段 3 — 复用原语 8 个

**目标**：`src/components/primitives/` 下完成 8 个原语，Storybook 或 test page 可展示。

**顺序**（依赖从小到大）
1. `eyebrow.tsx`
2. `inline-code.tsx`
3. `stat-card.tsx`
4. `external-link.tsx`
5. `copy-button.tsx`（含 clipboard fallback）
6. `ansi-line.tsx`（含 AnsiToken 类型定义）
7. `terminal-window.tsx`（variant: code / terminal，内部调用 AnsiLine）
8. `section-shell.tsx`

**验证**
- 每个文件导出组件和 props 类型 都有 TypeScript 完整类型
- 临时在 `App.tsx` 里依次挂载每个原语，`npm run dev` 下目视确认渲染正常（完成后清掉）
- `grep -nE "#[0-9a-fA-F]{3,8}" src/components/primitives/` 为空

## 阶段 4 — 数据层

**目标**：`sdk-data.ts` + `i18n.tsx` 两个文件成为所有文案的单一源头。

**步骤**
1. 定义 `SdkMeta` 类型（description, install, quickstart, stats, repo, llms, testOutput, comparisonValues）
2. 三条 SDK 元数据完整填入（Node / Go / Python），quickstart 代码用模板字符串
3. `testOutput.lines` 以 `AnsiToken[][]` 结构填入真实测试输出（从 README / 实际跑一次获取）
4. `comparisonRows` 7 行
5. `i18n.tsx`：`LangProvider` + `useT()` + `useLang()`；初始化策略（localStorage → navigator.language → en）

**验证**
- `tsc --noEmit` 绿
- `import { sdks, comparisonRows } from "@/lib/sdk-data"` 在测试组件里可正常使用
- 切换 lang state，hook 返回的 t 函数返回对应语言

## 阶段 5 — Section 组件 6 个

**目标**：`src/components/sections/` 下完成 6 个 section，每个独立可预览。

**顺序**
1. `site-header.tsx`（logo + lang toggle，sticky + backdrop-blur）
2. `site-footer.tsx`（最简单，先搞定）
3. `hero.tsx` + `sdk-tabs.tsx`（shadcn Tabs + 三语言 TabsTrigger Card + TabsContent 详情）
4. `tested-section.tsx`（TerminalWindow + 右栏 4 个 StatCard）
5. `comparison-section.tsx`（shadcn Table + 7 行对比）
6. `llms-section.tsx`（三张 Card + CopyButton + ExternalLink）

**验证（每个组件完成后）**
- 单独 import 到 `App.tsx` 顶部预览
- 点击所有交互点：tab 切换、copy 按钮、外链新开页
- 中英切换：所有文案切换，无"undefined"或缺失
- 响应式：resize 到 375px 无横向滚动

## 阶段 6 — 组装 + 清理

**目标**：`App.tsx` 按 6 段顺序组装；清除旧代码。

**步骤**
1. `App.tsx`：`<LangProvider>` 包裹 + 6 个 section 纵向排列 + `activeSdk` state 用 Context 下传（两状态都在 App 顶层）
2. 删除旧文件：
   - `src/components/comparison-table.tsx`
   - `src/components/footer.tsx`
   - `src/components/hero.tsx`
   - `src/components/nav.tsx`
   - `src/components/sdk-tabs.tsx`
3. 保留：`src/components/ui/*`（shadcn）+ `src/lib/utils.ts`

**验证**
- `npm run dev` 页面从头到尾完整渲染
- `npm run build` 0 warning 0 error
- 打包产物 `dist/` 尺寸合理（预期 < 200KB gz 的 JS + CSS，不含字体）

## 阶段 7 — 浏览器验收 + 三绿

**目标**：DoD 8 条全部通过。

**步骤**
1. `npm run build && npm run preview`
2. 用 chrome-devtools MCP：
   - `navigate_page localhost:4173`
   - Desktop 截图
   - `resize_page 768x1024` 截图
   - `resize_page 375x812` 截图
   - 每张截图过一遍视觉 checklist（见设计文档 §5.3）
3. 交互验证：
   - 切 EN/中 两次、刷新验证 localStorage
   - 切三次语言 tab、验证 TestedSection 联动
   - 点 Copy curl、`evaluate_script` 读 clipboard 验证
   - Tab 键遍历整页、Enter 激活
4. 控制台无 warning / error：`list_console_messages`
5. 运行三绿：
   ```
   npm run lint
   npx tsc --noEmit
   npm run build
   ```
6. 空扫描：
   ```
   git grep -nE "#[0-9a-fA-F]{3,8}" src/components src/App.tsx
   grep -rP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" src/
   ```
   两条都必须为空

**产出**
- 三档截图附在交付消息里
- 最终 commit：`feat: redesign landing page per Claude Code Design System`

## 风险 / 回滚

| 风险 | 缓解 |
|---|---|
| shadcn 某个组件经 token 覆盖后视觉出错 | 每个 section 组件完成后立即目视，早发现早调 |
| 三个 SDK repo 的 main 分支名其实是 master | 阶段 1 开始前 `git branch --show-current` 确认，data file 里 raw URL 参数化语言 key 但不参数化分支名（由常量控制）|
| 字体加载慢导致 FOUT 明显 | 已用 `display=swap` + fallback 栈；如果不可忍受，后续 preload 关键字体 |
| 用户希望最终还加暗色模式 | 当前不做，设计允许未来只改 `:root` 映射；组件零改动 |
| 设计文档未覆盖 404 / 空态 | landing 是纯静态展示，不存在运行时 404；所有 URL 是常量 |

## 阶段间的 commit 节奏

- 阶段 1：3 个 SDK 各 1 commit + landing 1 commit 删除
- 阶段 2：1 commit — "chore: wire design system tokens + fonts + eslint no-hex"
- 阶段 3：1 commit — "feat(ui): add 8 shared primitives"
- 阶段 4：1 commit — "feat(lib): sdk-data + i18n context"
- 阶段 5：每个 section 1 commit（6 个），便于回溯视觉调整
- 阶段 6：1 commit — "refactor: assemble landing + remove legacy components"
- 阶段 7：1 commit — "test: DoD verification artifacts (screenshots / lint / build)"

共约 13 个 commit。
