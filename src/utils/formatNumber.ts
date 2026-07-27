export function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(value);
}

export function formatCompactNumber(label: string | number): string {
  const val = typeof label === "string" ? Number(label) : label;
  if (isNaN(val) || val === 0) return String(label);

  if (Math.abs(val) >= 1_000_000_000) {
    const formatted = (val / 1_000_000_000).toFixed(val % 1_000_000_000 === 0 ? 0 : 1);
    return `${formatted}B`;
  }
  if (Math.abs(val) >= 1_000_000) {
    const formatted = (val / 1_000_000).toFixed(val % 1_000_000 === 0 ? 0 : 1);
    return `${formatted}M`;
  }
  if (Math.abs(val) >= 1_000) {
    const formatted = (val / 1_000).toFixed(val % 1_000 === 0 ? 0 : 1);
    return `${formatted}k`;
  }
  return val.toString();
}

