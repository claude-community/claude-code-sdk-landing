import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "zh";

const STORAGE_KEY = "claude-code-sdk-landing.lang";

type LangContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "zh") return stored;
  } catch {
    /* localStorage blocked (private mode, iframe, ...) */
  }
  const nav =
    typeof navigator !== "undefined" ? navigator.language ?? "" : "";
  return nav.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang());

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* memory-only fallback */
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used inside <LangProvider>");
  }
  return ctx;
}

export function useT() {
  const { lang } = useLang();
  return useCallback(
    (en: string, zh: string) => (lang === "zh" ? zh : en),
    [lang],
  );
}
