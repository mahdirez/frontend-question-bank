interface FilterChipProps {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
  dotClassName?: string;
}

export default function FilterChip({
  label,
  count,
  active,
  onClick,
  dotClassName,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted hover:border-accent hover:text-foreground"
      }`}
    >
      {dotClassName && (
        <span className={`h-1.5 w-1.5 rounded-full ${dotClassName}`} />
      )}
      {label}
      {count !== undefined && (
        <span className={active ? "opacity-70" : "opacity-60"}>{count}</span>
      )}
    </button>
  );
}
