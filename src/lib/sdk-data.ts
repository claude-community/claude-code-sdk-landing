import type { AnsiLineTokens } from "@/components/primitives/ansi-line";

export type SdkKey = "node" | "go" | "python";

export type BilingualText = { en: string; zh: string };

export type SdkMeta = {
  key: SdkKey;
  name: string; // display handle e.g. "Node.js"
  displayName: string; // full display e.g. "Node.js / TypeScript"
  repo: string;
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
   Node.js / TypeScript
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
    { text: " ClaudeCode();" },
  ],
  [
    { color: "purple", text: "const" },
    { text: " session = claude.startSession({" },
  ],
  [
    { text: "  model: " },
    { color: "cyan", text: '"sonnet"' },
    { text: "," },
  ],
  [
    { text: "  dangerouslySkipPermissions: " },
    { color: "purple", text: "true" },
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
    displayName: "Node.js / TypeScript",
    repo: "https://github.com/oceanz0312/claude-code-node",
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
      en: "TypeScript SDK for driving Claude Code from Node.js or Bun. Clean async API, typed session management, AsyncIterable streaming, dual ESM + CJS output.",
      zh: "在 Node.js / Bun 中驱动 Claude Code 的 TypeScript SDK。简洁的异步 API、类型化会话管理、AsyncIterable 流式输出、ESM + CJS 双格式产物。",
    },
    features: [
      { en: "AsyncIterable streaming", zh: "AsyncIterable 流式" },
      { en: "AbortSignal cancellation", zh: "AbortSignal 取消" },
      { en: "ESM + CJS dual output", zh: "ESM + CJS 双格式" },
      { en: "Fake CLI simulator", zh: "Fake CLI 模拟器" },
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
      en: "Zero-dependency Go SDK — pure standard library. context.Context for cancellation, goroutines for concurrent I/O, sealed RelayEvent interface via an unexported method.",
      zh: "零依赖 Go SDK — 纯标准库实现。使用 context.Context 取消、goroutine 并发 I/O、通过未导出方法实现密封 RelayEvent 接口。",
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
      en: "Zero-dependency Python SDK — fully async with asyncio. Dataclass types, AsyncIterator streaming, background thread for non-blocking log writes. Python 3.9+.",
      zh: "零依赖 Python SDK — 基于 asyncio 全异步。dataclass 类型、AsyncIterator 流式输出、后台线程非阻塞日志写入。支持 Python 3.9+。",
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
      en: "One SDK shape, three languages.",
      zh: "一套 SDK 形态，三种语言。",
    },
    lead: {
      en: "A library you embed in your Node.js, Go, or Python program to drive Claude Code programmatically. Same architecture across three languages, language-idiomatic APIs, 35+ CLI flags mapped, E2E + unit tests across all three.",
      zh: "嵌入到 Node.js / Go / Python 程序中，以编程方式驱动 Claude Code 的库。三种语言架构一致、API 遵循语言惯例、完整映射 35+ CLI 参数、三者皆有完整的 E2E 与单元测试覆盖。",
    },
    cta: {
      github: { en: "View on GitHub", zh: "查看 GitHub" },
      llms: { en: "Read llms.txt", zh: "查看 llms.txt" },
    },
    tabHint: {
      en: "Pick a language to see its install command, quickstart, and test footprint.",
      zh: "选择一种语言，查看其安装命令、快速开始代码和测试覆盖。",
    },
  },
  tested: {
    eyebrow: { en: "TESTED & RELIABLE", zh: "测试与稳定性" },
    title: {
      en: "Real tests, real outputs.",
      zh: "真实测试、真实输出。",
    },
    lead: {
      en: "Each SDK ships its own test suite — unit plus live E2E against the Claude Code CLI. These are snapshots of the actual runs, not decorative screenshots.",
      zh: "每个 SDK 都有独立的测试套件 — 单元测试加针对 Claude Code CLI 的实机 E2E。下面是真实运行输出，不是装饰截图。",
    },
  },
  comparison: {
    eyebrow: { en: "CROSS-LANGUAGE PARITY", zh: "跨语言对标" },
    title: {
      en: "Same architecture, idiomatic surface.",
      zh: "相同的架构，地道的 API。",
    },
    lead: {
      en: "Every SDK maps the same set of CLI flags and ships the same capability surface. The only thing that changes is the language-native primitive used to express each pattern.",
      zh: "三个 SDK 映射同一组 CLI 参数，提供同一套能力。不同之处仅在于每种模式所用的语言原生原语。",
    },
    headers: {
      feature: { en: "Feature", zh: "特性" },
    },
  },
  llms: {
    eyebrow: { en: "FOR AGENTS", zh: "面向智能体" },
    title: {
      en: "curl it, pipe it, feed it to your LLM.",
      zh: "curl 它、管道传输、喂给你的 LLM。",
    },
    lead: {
      en: "Each SDK ships an llms.txt at the repo root — a complete API reference formatted for AI agents. Versioned alongside the code, so agents always read the right surface for the version you have installed.",
      zh: "每个 SDK 在仓库根目录提供 llms.txt — 为 AI agent 设计的完整 API 参考。与源码同版本，agent 读到的永远是你所装版本对应的 API。",
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
