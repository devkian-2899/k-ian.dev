/** Seven continents — manual fatality % (0–100) until Excel import is wired. */
export const INFORMATIVE_CONTINENT_IDS = [
  "africa",
  "antarctica",
  "asia",
  "europe",
  "north-america",
  "oceania",
  "south-america",
] as const;

export type InformativeContinentId = (typeof INFORMATIVE_CONTINENT_IDS)[number];

/**
 * Sample vehicle-accident fatality rates (%). Edit these values directly when you
 * want to preview map shading; future sheet import can replace this object.
 */
export const INFORMATIVE_CONTINENT_FATALITY_PERCENT: Record<InformativeContinentId, number> = {
  africa: 68,
  antarctica: 8,
  asia: 76,
  europe: 41,
  "north-america": 54,
  oceania: 29,
  "south-america": 62,
};

export function clampFatalityPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

/** Higher % → stronger fill (darker); lower % → paler wash on the base brand color. */
export function continentFatalityFill(side: "ian" | "other", percent: number): string {
  const t = clampFatalityPercent(percent) / 100;
  const alpha = 0.1 + t * 0.82;

  if (side === "ian") {
    return `rgba(41, 64, 92, ${alpha.toFixed(3)})`;
  }

  return `rgba(201, 45, 69, ${alpha.toFixed(3)})`;
}
