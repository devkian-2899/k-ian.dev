import type { InformativeWorldRegionId } from "./informative-world-regions";

/** Devkian — default sample % per region. */
export const INFORMATIVE_WORLD_REGION_PERCENT_IAN: Record<InformativeWorldRegionId, number> = {
  "north-america": 42.5,
  "latin-america": 36.2,
  "western-europe": 28.4,
  "eastern-europe-central-asia": 31.8,
  "middle-east-north-africa": 0,
  "sub-saharan-africa": 22.1,
  "south-asia": 18.6,
  "east-asia": 15.3,
  "southeast-asia-oceania": 12.4,
  antarctica: 0,
};

/** Other's Development — regional fatality share (%). */
export const INFORMATIVE_WORLD_REGION_PERCENT_OTHER: Record<InformativeWorldRegionId, number> = {
  "north-america": 87,
  "latin-america": 68.5,
  "western-europe": 52.3,
  "eastern-europe-central-asia": 45,
  "middle-east-north-africa": 0,
  "sub-saharan-africa": 24.1,
  "south-asia": 19.6,
  "east-asia": 12.4,
  "southeast-asia-oceania": 5.8,
  antarctica: 0,
};

function regionPercentTable(side: "ian" | "other"): Record<InformativeWorldRegionId, number> {
  return side === "ian"
    ? INFORMATIVE_WORLD_REGION_PERCENT_IAN
    : INFORMATIVE_WORLD_REGION_PERCENT_OTHER;
}

function regionPercentRange(side: "ian" | "other"): { min: number; max: number } {
  const values = Object.values(regionPercentTable(side)).filter((value) => value > 0);
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

export function getWorldRegionPercent(
  side: "ian" | "other",
  regionId: InformativeWorldRegionId,
): number {
  return regionPercentTable(side)[regionId];
}

export function getWorldRegionPercentRange(side: "ian" | "other"): { min: number; max: number } {
  return regionPercentRange(side);
}

export function formatWorldRegionPercent(percent: number): string {
  if (percent === 0) return "0%";
  const digits = Number.isInteger(percent) ? 0 : percent % 0.1 === 0 ? 1 : 2;
  return `${percent.toFixed(digits)}%`;
}
