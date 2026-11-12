import {
  getWorldRegionPercent,
  getWorldRegionPercentRange,
} from "./informative-world-region-data";
import type { InformativeWorldRegionId } from "./informative-world-regions";

type Rgb = { r: number; g: number; b: number };

const MAP_RED: Rgb = { r: 201, g: 45, b: 69 };
const MAP_PINK: Rgb = { r: 242, g: 116, b: 116 };
const DEVKIAN_MAP_NAVY = "41, 64, 92";

/** Devkian: #29405C fill (opacity = regional %). */
const DEVKIAN_NAVY_OPACITY_REGIONS = new Set<InformativeWorldRegionId>([
  "eastern-europe-central-asia",
  "sub-saharan-africa",
]);

function otherWorldRegionFill(regionId: InformativeWorldRegionId): string {
  const percent = getWorldRegionPercent("other", regionId);
  if (percent <= 0) return "#ffffff";

  const { min, max } = getWorldRegionPercentRange("other");
  const span = Math.max(max - min, 0.001);
  const t = (percent - min) / span;

  return mixRgb(MAP_PINK, MAP_RED, t);
}

function devkianOpacityFill(rgb: string, percent: number): string {
  const alpha = Math.min(1, Math.max(0.06, percent / 100));
  return `rgba(${rgb}, ${alpha.toFixed(3)})`;
}

function devkianWorldRegionFill(regionId: InformativeWorldRegionId): string {
  const percent = getWorldRegionPercent("ian", regionId);

  if (regionId === "north-america") {
    return "#C92D45";
  }

  if (DEVKIAN_NAVY_OPACITY_REGIONS.has(regionId)) {
    return devkianOpacityFill(DEVKIAN_MAP_NAVY, percent);
  }

  return "#ffffff";
}

function mixChannel(low: number, high: number, t: number): number {
  return Math.round(low + (high - low) * t);
}

function mixRgb(from: Rgb, to: Rgb, t: number): string {
  const unit = Math.min(1, Math.max(0, t));
  return `rgb(${mixChannel(from.r, to.r, unit)}, ${mixChannel(from.g, to.g, unit)}, ${mixChannel(
    from.b,
    to.b,
    unit,
  )})`;
}

export function worldRegionFill(side: "ian" | "other", regionId: InformativeWorldRegionId): string {
  if (side === "ian") {
    return devkianWorldRegionFill(regionId);
  }
  return otherWorldRegionFill(regionId);
}
