import { useState, useEffect } from "react";

function useTypewriter(text: string, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayed;
}

const INTRO = "Introducing";
const SDK_NAME = "CLAUDE CODE SDK";
const FULL_TEXT = `${INTRO} ${SDK_NAME}`;

export function BrandBanner() {
  const typed = useTypewriter(FULL_TEXT, 35);

  const introPart = typed.slice(0, INTRO.length);
  const rest = typed.slice(INTRO.length + 1);

  return (
    <div className="relative overflow-hidden border-b border-rule bg-gradient-to-r from-[#cc6b48] via-orange-soft to-orange-tint">
      <div className="mx-auto flex max-w-[1200px] items-center justify-center px-4 py-3 sm:px-6 sm:py-4">
        <p className="font-mono text-[13px] font-medium tracking-[0.18em] text-white/90 sm:text-[15px]">
          <span className="font-normal italic tracking-[0.08em] text-white/65">{introPart}</span>
          {rest && <>{" "}{rest}</>}
          <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[1px] animate-blink bg-white/90" />
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
