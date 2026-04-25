import type { AnsiLineTokens } from "@/components/primitives/ansi-line";

export type SdkKey = "node" | "go" | "python";

export type BilingualText = { en: string; zh: string };

export type SdkMeta = {
  key: SdkKey;
  name: string; // display handle e.g. "Node.js"
  displayName: string; // short tab/label display e.g. "Node.js"
  repo: string;
  npm?: string;
  llms: {
    raw: string;
    blob: string;
  };
  install: string;
  quickstart: {
    filename: string;
    code: AnsiLineTokens[];
  };
  stats: Array<{
    value: string;
    label: BilingualText;
  }>;
  testOutput: {
    command: string;
    lines: AnsiLineTokens[];
  };
  description: BilingualText;
  features: BilingualText[];
};

/* =============================================================
   Node.js
   ============================================================= */

const nodeQuickstart: AnsiLineTokens[] = [
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
    { text: " ClaudeCode({" },
  ],
  [
    { text: "  apiKey: " },
    { color: "cyan", text: '"sk-ant-..."' },
    { text: "," },
  ],
  [
    { text: "  baseUrl: " },
    { color: "cyan", text: '"https://api.anthropic.com"' },
    { text: "," },
  ],
  [{ text: "});" }],
  [
    { color: "purple", text: "const" },
    { text: " session = claude.startSession({" },
  ],
  [
    { text: "  model: " },
    { color: "cyan", text: '"sonnet"' },
    { text: "," },
  ],
  [{ text: "});" }],
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

const nodeTestOutput: AnsiLineTokens[] = [
  [
    { color: "dim", text: "$ " },
    { text: "bun test" },
  ],
  [{ color: "dim", text: "bun test v1.1.38 (Bun 1.1.38)" }],
  [],
  [
    { color: "green", text: "✓ " },
    { text: "ClaudeCode › startSession creates session " },
    { color: "dim", text: "[12ms]" },
  ],
  [
    { color: "green", text: "✓ " },
    { text: "Session › run() auto-resumes across turns " },
    { color: "dim", text: "[34ms]" },
  ],
  [
    { color: "green", text: "✓ " },
    { text: "Streaming › AsyncIterable yields 7 event kinds " },
    { color: "dim", text: "[8ms]" },
  ],
  [
    { color: "green", text: "✓ " },
    { text: "Abort › AbortSignal cancels in-flight turn " },
    { color: "dim", text: "[41ms]" },
  ],
  [
    { color: "green", text: "✓ " },
    { text: "E2E › real CLI round-trip with sonnet " },
    { color: "dim", text: "[2.1s]" },
  ],
  [{ color: "dim", text: "…" }],
  [],
  [
    { color: "green", text: "40 pass" },
    { color: "dim", text: "  ·  " },
    { text: "0 fail" },
    { color: "dim", text: "  ·  183 expect() calls" },
  ],
  [
    { color: "dim", text: "Ran 40 tests across 3 files. [823ms]" },
  ],
];

/* =============================================================
   Go
   ============================================================= */

const goQuickstart: AnsiLineTokens[] = [
  [
    { color: "purple", text: "package" },
    { text: " main" },
  ],
  [],
  [
    { color: "purple", text: "import" },
    { text: " (" },
  ],
  [
    { text: "  " },
    { color: "cyan", text: '"context"' },
  ],
  [
    { text: "  " },
    { color: "cyan", text: '"fmt"' },
  ],
  [
    { text: "  claude " },
    { color: "cyan", text: '"github.com/oceanz0312/claude-code-go"' },
  ],
  [{ text: ")" }],
  [],
  [
    { color: "purple", text: "func" },
    { text: " main() {" },
  ],
  [
    { text: "  cc := claude.NewClaudeCode(claude.ClaudeCodeOptions{})" },
  ],
  [
    { text: "  session := cc.StartSession(claude.SessionOptions{" },
  ],
  [
    { text: "    Model: " },
    { color: "cyan", text: '"sonnet"' },
    { text: "," },
  ],
  [{ text: "  })" }],
  [],
  [
    { text: "  turn, _ := session.Run(context.Background(), " },
    { color: "cyan", text: '"Fix the failing tests in src/"' },
    { text: ")" },
  ],
  [{ text: "  fmt.Println(turn.FinalResponse)" }],
  [{ text: "}" }],
];

const goTestOutput: AnsiLineTokens[] = [
  [
    { color: "dim", text: "$ " },
    { text: "go test -v ./..." },
  ],
  [],
  [
    { color: "yellow", text: "=== RUN" },
    { text: "   TestClient_StartSession" },
  ],
  [
    { text: "--- " },
    { color: "green", text: "PASS" },
    { text: ": TestClient_StartSession " },
    { color: "dim", text: "(0.01s)" },
  ],
  [
    { color: "yellow", text: "=== RUN" },
    { text: "   TestSession_Run_ResumesAcrossTurns" },
  ],
  [
    { text: "--- " },
    { color: "green", text: "PASS" },
    { text: ": TestSession_Run_ResumesAcrossTurns " },
    { color: "dim", text: "(0.03s)" },
  ],
  [
    { color: "yellow", text: "=== RUN" },
    { text: "   TestSession_RunStreamed_NextIterator" },
  ],
  [
    { text: "--- " },
    { color: "green", text: "PASS" },
    { text: ": TestSession_RunStreamed_NextIterator " },
    { color: "dim", text: "(0.02s)" },
  ],
  [{ color: "dim", text: "…" }],
  [],
  [{ color: "green", text: "PASS" }],
  [
    { text: "ok  \t" },
    { color: "cyan", text: "github.com/oceanz0312/claude-code-go" },
    { color: "dim", text: "\t1.234s" },
  ],
];

/* =============================================================
   Python
   ============================================================= */

const pythonQuickstart: AnsiLineTokens[] = [
  [
    { color: "purple", text: "import" },
    { text: " asyncio" },
  ],
  [
    { color: "purple", text: "from" },
    { text: " claude_code " },
    { color: "purple", text: "import" },
    { text: " ClaudeCode, ClaudeCodeOptions" },
  ],
  [],
  [
    { color: "purple", text: "async def" },
    { text: " main():" },
  ],
  [
    { text: "    claude = ClaudeCode(ClaudeCodeOptions())" },
  ],
  [
    { text: "    session = claude.start_session(model=" },
    { color: "cyan", text: '"sonnet"' },
    { text: ")" },
  ],
  [],
  [
    { text: "    turn = " },
    { color: "purple", text: "await" },
    { text: " session.run(" },
    { color: "cyan", text: '"Fix the failing tests in src/"' },
    { text: ")" },
  ],
  [
    { text: "    " },
    { color: "purple", text: "print" },
    { text: "(turn.final_response)" },
  ],
  [],
  [{ text: "asyncio.run(main())" }],
];

const pythonTestOutput: AnsiLineTokens[] = [
  [
    { color: "dim", text: "$ " },
    { text: "pytest" },
  ],
  [
    { color: "dim", text: "================ test session starts ================" },
  ],
  [{ text: "collected 70 items" }],
  [],
  [
    { text: "tests/test_client.py " },
    { color: "green", text: ".........." },
    { color: "dim", text: "                 [ 14%]" },
  ],
  [
    { text: "tests/test_session.py " },
    { color: "green", text: "............" },
    { color: "dim", text: "              [ 31%]" },
  ],
  [
    { text: "tests/test_streaming.py " },
    { color: "green", text: "........" },
    { color: "dim", text: "                [ 42%]" },
  ],
  [
    { text: "tests/test_e2e.py " },
    { color: "green", text: "...........  " },
    { color: "dim", text: "               [100%]" },
  ],
  [],
  [
    { color: "dim", text: "================ " },
    { color: "green", text: "70 passed" },
    { color: "dim", text: " in 4.23s ================" },
  ],
];

/* ============================================================= */

export const sdks: Record<SdkKey, SdkMeta> = {
  node: {
    key: "node",
    name: "Node.js",
    displayName: "Node.js",
    repo: "https://github.com/oceanz0312/claude-code-node",
    npm: "https://www.npmjs.com/package/claude-code-node",
    llms: {
      raw: "https://raw.githubusercontent.com/oceanz0312/claude-code-node/master/llms.txt",
      blob: "https://github.com/oceanz0312/claude-code-node/blob/master/llms.txt",
    },
    install: "npm install claude-code-node",
    quickstart: { filename: "quickstart.ts", code: nodeQuickstart },
    stats: [
      { value: "39", label: { en: "tests", zh: "测试用例" } },
      { value: "99.71%", label: { en: "line coverage", zh: "行覆盖率" } },
      { value: "183", label: { en: "expect() calls", zh: "断言调用" } },
    ],
    testOutput: { command: "bun test", lines: nodeTestOutput },
    description: {
      en: "Drop into a Node.js or Bun project to control Claude Code from code. Fully typed, streaming output via AsyncIterable, ESM and CJS both supported.",
      zh: "嵌入 Node.js 或 Bun 项目，用代码控制 Claude Code。完整 TypeScript 类型、AsyncIterable 流式输出、ESM 和 CJS 均可用。",
    },
    features: [
      { en: "AsyncIterable streaming", zh: "AsyncIterable 流式" },
      { en: "AbortSignal cancellation", zh: "AbortSignal 取消" },
      { en: "ESM + CJS dual output", zh: "ESM + CJS 双格式" },
      { en: "CLI simulator for tests", zh: "CLI 模拟器（测试用）" },
    ],
  },

  go: {
    key: "go",
    name: "Go",
    displayName: "Go",
    repo: "https://github.com/oceanz0312/claude-code-go",
    llms: {
      raw: "https://raw.githubusercontent.com/oceanz0312/claude-code-go/master/llms.txt",
      blob: "https://github.com/oceanz0312/claude-code-go/blob/master/llms.txt",
    },
    install: "go get github.com/oceanz0312/claude-code-go",
    quickstart: { filename: "main.go", code: goQuickstart },
    stats: [
      { value: "30+", label: { en: "tests", zh: "测试用例" } },
      { value: "0", label: { en: "runtime deps", zh: "运行时依赖" } },
      { value: "11", label: { en: "E2E tests", zh: "E2E 测试" } },
    ],
    testOutput: { command: "go test", lines: goTestOutput },
    description: {
      en: "Pure standard library — no external dependencies. Iterate results with a simple Next() loop, cancel any time with context.Context.",
      zh: "纯标准库，无外部依赖。用 Next() 逐条处理结果，context.Context 随时取消。",
    },
    features: [
      { en: "Next() iterator", zh: "Next() 迭代器" },
      { en: "context.Context", zh: "context.Context" },
      { en: "Sealed interface", zh: "密封接口" },
      { en: "Zero dependencies", zh: "零外部依赖" },
    ],
  },

  python: {
    key: "python",
    name: "Python",
    displayName: "Python",
    repo: "https://github.com/oceanz0312/claude-code-python",
    llms: {
      raw: "https://raw.githubusercontent.com/oceanz0312/claude-code-python/master/llms.txt",
      blob: "https://github.com/oceanz0312/claude-code-python/blob/master/llms.txt",
    },
    install: "pip install claude-code-python",
    quickstart: { filename: "quickstart.py", code: pythonQuickstart },
    stats: [
      { value: "70+", label: { en: "tests", zh: "测试用例" } },
      { value: "0", label: { en: "runtime deps", zh: "运行时依赖" } },
      { value: "11", label: { en: "E2E tests", zh: "E2E 测试" } },
    ],
    testOutput: { command: "pytest", lines: pythonTestOutput },
    description: {
      en: "Fully async with asyncio — no external dependencies. Stream results with an AsyncIterator, get typed output via dataclasses. Python 3.9+.",
      zh: "基于 asyncio 全异步，无外部依赖。AsyncIterator 流式输出，dataclass 类型化结果。支持 Python 3.9+。",
    },
    features: [
      { en: "AsyncIterator stream", zh: "AsyncIterator 流式" },
      { en: "asyncio native", zh: "asyncio 原生" },
      { en: "dataclass types", zh: "dataclass 类型" },
      { en: "Python 3.9+", zh: "Python 3.9+" },
    ],
  },
};

export const sdkOrder: SdkKey[] = ["node", "go", "python"];

/* =============================================================
   Cross-SDK comparison
   ============================================================= */

export type ComparisonRow = {
  feature: BilingualText;
  node: string;
  go: string;
  python: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    feature: { en: "Streaming", zh: "流式输出" },
    node: "AsyncIterable",
    go: "Next() iterator",
    python: "AsyncIterator",
  },
  {
    feature: { en: "Cancellation", zh: "取消机制" },
    node: "AbortSignal",
    go: "context.Context",
    python: "asyncio.Event",
  },
  {
    feature: { en: "Concurrency", zh: "并发模型" },
    node: "Event loop",
    go: "Goroutines",
    python: "asyncio",
  },
  {
    feature: { en: "Parser", zh: "解析器" },
    node: "External npm",
    go: "Built-in pkg",
    python: "Built-in pkg",
  },
  {
    feature: { en: "Runtime deps", zh: "运行时依赖" },
    node: "2",
    go: "0",
    python: "0",
  },
  {
    feature: { en: "Unit tests", zh: "单元测试" },
    node: "28",
    go: "30+",
    python: "70+",
  },
  {
    feature: { en: "E2E tests", zh: "E2E 测试" },
    node: "11",
    go: "11",
    python: "11",
  },
];

/* =============================================================
   Shared features (appear across all 3 SDKs)
   ============================================================= */

export const sharedFeatures: BilingualText[] = [
  { en: "35+ CLI arguments", zh: "35+ CLI 参数" },
  { en: "Session management", zh: "会话管理" },
  { en: "Structured output", zh: "结构化输出" },
  { en: "Image input", zh: "图片输入" },
  { en: "FailFast errors", zh: "FailFast 错误" },
  { en: "Raw event log", zh: "原始事件日志" },
  { en: "Stream dedup", zh: "流式去重" },
  { en: "Multi-turn", zh: "多轮对话" },
];

/* =============================================================
   Site-wide copy
   ============================================================= */

export const siteCopy = {
  brand: {
    title: "Claude Code SDK",
  },
  hero: {
    eyebrow: {
      en: "CLAUDE CODE SDK · NODE / GO / PYTHON",
      zh: "CLAUDE CODE SDK · NODE / GO / PYTHON",
    },
    title: {
      en: "One SDK, three languages.",
      zh: "一套 SDK，三种语言。",
    },
    lead: {
      en: "A library you embed in your Node.js, Go, or Python program to control Claude Code from code. The same capabilities across all three — streaming, session management, 35+ options — with APIs that feel natural in each language.",
      zh: "嵌入到 Node.js、Go 或 Python 程序里，用代码控制 Claude Code。三种语言能力一致——流式输出、会话管理、35+ 参数——各自遵循本语言的惯用风格。",
    },
    cta: {
      github: { en: "View on GitHub", zh: "查看 GitHub" },
      npm: { en: "View on npm", zh: "查看 npm" },
      llms: { en: "Read llms.txt", zh: "查看 llms.txt" },
    },
    tabHint: {
      en: "Pick a language to see the install command, an example, and test numbers.",
      zh: "选择语言，查看安装方式、示例代码和测试覆盖。",
    },
  },
  tested: {
    eyebrow: { en: "TESTS", zh: "测试覆盖" },
    title: {
      en: "Tested against the real thing.",
      zh: "针对真实环境的测试。",
    },
    lead: {
      en: "Each SDK runs its tests against the actual Claude Code CLI — not a mock. The output below is from a real run.",
      zh: "每个 SDK 直接跑在 Claude Code CLI 上，不是 mock。下面是真实运行输出。",
    },
  },
  comparison: {
    eyebrow: { en: "COMPARISON", zh: "横向对比" },
    title: {
      en: "Different languages, same job.",
      zh: "语言不同，但做的事一样。",
    },
    lead: {
      en: "All three SDKs cover the same feature set. The only difference is how each one fits into its language.",
      zh: "三个 SDK 覆盖同一套功能，区别只在于各自遵循本语言的惯用写法。",
    },
    headers: {
      feature: { en: "Feature", zh: "特性" },
    },
  },
  llms: {
    eyebrow: { en: "FOR AI AGENTS", zh: "面向 AI Agent" },
    title: {
      en: "Give it to your agent.",
      zh: "直接喂给你的 Agent。",
    },
    lead: {
      en: "Each SDK ships an llms.txt at the repo root — a plain-text API reference your agent or LLM can read directly. Updated whenever the API changes.",
      zh: "每个 SDK 仓库根目录都有一个 llms.txt——纯文本 API 参考，Agent 或 LLM 可以直接读取。随 API 变更同步更新。",
    },
    curl: {
      en: "Copy curl",
      zh: "复制 curl",
    },
    viewSource: {
      en: "View on GitHub",
      zh: "GitHub 浏览",
    },
  },
  footer: {
    license: {
      en: "MIT License · Built for the Claude Code ecosystem",
      zh: "MIT License · 为 Claude Code 生态构建",
    },
  },
  header: {
    wordmark: {
      brand: "Claude",
      accent: "code",
      suffix: "/ SDK",
    },
    langLabel: {
      en: "Language",
      zh: "语言",
    },
  },
};
