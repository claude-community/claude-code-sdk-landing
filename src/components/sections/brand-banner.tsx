export function BrandBanner() {
  return (
    <div className="relative overflow-hidden border-b border-rule bg-gradient-to-r from-primary via-orange-soft to-orange-tint">
      <div className="mx-auto flex max-w-[1200px] items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        <p className="font-mono text-[13px] font-medium tracking-[0.18em] text-white sm:text-[15px]">
          CLAUDE CODE SDK
          <span className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[1px] animate-blink bg-white" />
        </p>
      </div>

      {/* subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
