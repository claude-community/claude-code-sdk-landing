import { brandIcons, type BrandIconKey } from "@/lib/brand-icons";

export function BrandIcon({
  icon,
  size = 16,
  color,
  className,
}: {
  icon: BrandIconKey;
  size?: number;
  color?: string;
  className?: string;
}) {
  const def = brandIcons[icon];
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-label={def.title}
      className={className}
      style={{ fill: color ?? `#${def.hex}` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={def.path} />
    </svg>
  );
}
