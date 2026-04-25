import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import { cn } from '@/lib/utils';

/** Claude Code–style thinking spinner (Unicode cycle). */
const SPINNER_CHARS = ['·', '✻', '✽', '✶', '✳', '✢'] as const;

const VERBS = [
  'Perambulating',
  'Pondering',
  'Concocting',
  'Thinking',
  'Marinating',
  'Sketching',
  'Crafting',
  'Synthesizing',
  'Ideating',
  'Envisioning',
  'Manifesting',
  'Baking',
  'Cooking',
  'Finagling',
  'Pontificating',
  'Spelunking',
  'Smooshing',
  'Schlepping',
  'Sparkling',
  'Actualizing',
  'Philosophising',
  'Enchanting',
  'Computing',
  'Elucidating',
  'Perusing',
  'Actioning',
  'Imagining',
  'Weaving',
  'Scheming',
  'Ruminating',
  'Contemplating',
  'Tinkering',
  'Orchestrating',
  'Noodling',
  'Finessing',
  'Calibrating',
  'Honking',
  'Blooping',
  'Blipping',
  'Hypothesizing',
  'Daydreaming',
] as const;

/** Time for one highlight pass (all frames in a cycle). */
const SWEEP_MS = 2200;
/** Idle gap before the next pass starts. */
const PAUSE_BETWEEN_MS = 1000;

const CHAR_BASE =
  'inline-block bg-linear-to-r from-[#d96a48] via-[#f09b7d] to-[#e88d67] bg-clip-text font-medium text-transparent tabular-nums transition-[filter] duration-[220ms] ease-out dark:from-[#f0a080] dark:via-[#f5b090] dark:to-[#e88d67]';
const CHAR_LIT =
  'brightness-[1.22] contrast-[1.03] saturate-[1.08] drop-shadow-[0_0_9px_rgba(255,218,190,0.9)]';

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

type Pattern = 'lr' | 'lr_rl' | 'rl' | 'mid_right' | 'mid_left';

function linearFrames(from: number, to: number, step: 1 | -1): number[][] {
  const out: number[][] = [];
  if (step === 1) {
    for (let i = from; i <= to; i++) out.push([i]);
  } else {
    for (let i = from; i >= to; i--) out.push([i]);
  }
  return out;
}

function withOptionalDoubles(frames: number[][], doubleChance: number): number[][] {
  if (frames.length <= 1) return frames;
  const out: number[][] = [];
  let i = 0;
  while (i < frames.length) {
    const a = frames[i]?.[0]!;
    const next = frames[i + 1];
    const b = next?.[0];
    if (b !== undefined && Math.abs(a - b) === 1 && Math.random() < doubleChance) {
      out.push([Math.min(a, b), Math.max(a, b)]);
      i += 2;
    } else {
      out.push(frames[i]!);
      i += 1;
    }
  }
  return out;
}

function pickPattern(): Pattern {
  const r = Math.random();
  if (r < 0.42) return 'lr_rl';
  if (r < 0.68) return 'lr';
  if (r < 0.82) return 'mid_right';
  if (r < 0.92) return 'mid_left';
  return 'rl';
}

function buildFrames(n: number, pattern: Pattern): number[][] {
  if (n <= 1) return [[0]];

  const dbl = 0.11;

  switch (pattern) {
    case 'lr':
      return withOptionalDoubles(linearFrames(0, n - 1, 1), dbl);
    case 'rl':
      return withOptionalDoubles(linearFrames(n - 1, 0, -1), dbl);
    case 'mid_right': {
      const mid = Math.floor((n - 1) / 2);
      return withOptionalDoubles(linearFrames(mid, n - 1, 1), dbl);
    }
    case 'mid_left': {
      const mid = Math.floor((n - 1) / 2);
      return withOptionalDoubles(linearFrames(mid, 0, -1), dbl);
    }
    case 'lr_rl': {
      const up = withOptionalDoubles(linearFrames(0, n - 1, 1), dbl);
      const down = withOptionalDoubles(linearFrames(n - 2, 0, -1), dbl);
      return [...up, ...down];
    }
    default:
      return withOptionalDoubles(linearFrames(0, n - 1, 1), dbl);
  }
}

function ThinkingStripBody({
  spinnerGlyph,
  verb,
  reduceMotion,
  verbIndex,
}: {
  spinnerGlyph: string;
  verb: string;
  reduceMotion: boolean;
  verbIndex: number;
}) {
  const verbText = `${verb}...`;
  const segmentCount = 1 + verbText.length;

  const [activeLit, setActiveLit] = useState<Set<number>>(() => new Set([0]));
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reduceMotion || segmentCount <= 1) return;

    let cancelled = false;

    const clearTimer = () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };

    const runCycle = () => {
      if (cancelled) return;
      const pattern = pickPattern();
      const frames = buildFrames(segmentCount, pattern);
      const stepMs = SWEEP_MS / Math.max(1, frames.length);

      let idx = 0;
      const step = () => {
        if (cancelled) return;
        const cell = frames[idx]!;
        setActiveLit(new Set(cell));
        idx += 1;
        if (idx < frames.length) {
          timeoutRef.current = window.setTimeout(step, stepMs);
        } else {
          timeoutRef.current = window.setTimeout(runCycle, PAUSE_BETWEEN_MS);
        }
      };

      step();
    };

    runCycle();

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [reduceMotion, segmentCount]);

  return (
    <span className="inline-flex items-baseline gap-[2px] font-mono text-xs leading-none tracking-tight">
      <span className="inline-flex w-4 shrink-0 justify-center">
        <span className={cn(CHAR_BASE, !reduceMotion && activeLit.has(0) && CHAR_LIT)}>
          {spinnerGlyph}
        </span>
      </span>
      <span className="inline-flex">
        {verbText.split('').map((ch, i) => (
          <span
            key={`${verbIndex}-${i}-${ch}`}
            className={cn(CHAR_BASE, !reduceMotion && activeLit.has(i + 1) && CHAR_LIT)}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
    </span>
  );
}

const emptySubscribe = () => () => {};

export function ClaudeThinkingStrip({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const verbs = useMemo(() => shuffle(VERBS), []);
  const [charIndex, setCharIndex] = useState(0);
  const [verbIndex, setVerbIndex] = useState(0);

  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const spin = window.setInterval(() => {
      setCharIndex((i) => (i + 1) % SPINNER_CHARS.length);
    }, 220);
    const words = window.setInterval(() => {
      setVerbIndex((i) => (i + 1) % verbs.length);
    }, 4200);
    return () => {
      window.clearInterval(spin);
      window.clearInterval(words);
    };
  }, [verbs.length]);

  if (!mounted) {
    return <span className={cn('min-w-0', className)} aria-hidden />;
  }

  const verbText = `${verbs[verbIndex]}...`;

  return (
    <span className={cn('min-w-0', className)} aria-hidden title={verbText}>
      <ThinkingStripBody
        key={verbIndex}
        verbIndex={verbIndex}
        spinnerGlyph={SPINNER_CHARS[charIndex]}
        verb={verbs[verbIndex]}
        reduceMotion={reduceMotion}
      />
    </span>
  );
}
