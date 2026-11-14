/** Continent id — edit paths and paints in this file. */
export type InformativeMapContinentId =
  | "africa"
  | "antarctica"
  | "asia"
  | "europe"
  | "north-america"
  | "oceania"
  | "south-america";

export type InformativeMapContinentOverlay = {
  deathsShare: string;
  fatalityRate: string;
  headline: string;
  note: string;
};

export type InformativeMapContinent = {
  fill: string;
  hoverFill: string;
  id: InformativeMapContinentId;
  label: string;
  /** Legend line, e.g. "Africa (52%)". */
  legendLabel: string;
  /** Countries whose combined outline centers the resting % label. */
  shareAnchors: string[];
  /** Resting label on the continent, e.g. "52%" or "N/A". */
  shareLabel: string;
  stroke: string;
  overlay: InformativeMapContinentOverlay;
};

/** Legend order on the expanded map. */
export const INFORMATIVE_MAP_LEGEND_ORDER: InformativeMapContinentId[] = [
  "africa",
  "south-america",
  "asia",
  "north-america",
  "oceania",
  "europe",
  "antarctica",
];

export const INFORMATIVE_MAP_VIEWBOX = { height: 500, width: 1000 } as const;

/** Other's comparison graphics: one light red ramp, darkest where the share is largest. */
export const INFORMATIVE_OTHER_FILL: Record<InformativeMapContinentId, string> = {
  africa: "#F19B9E",
  antarctica: "#FFFFFF",
  asia: "#FBE6E7",
  europe: "#FFFBFB",
  "north-america": "#FDF0F0",
  oceania: "#FEF6F6",
  "south-america": "#F8D1D2",
};

/** Continent paint and hover copy. Coastlines live in `informative-map-world-paths.json`. */
export const INFORMATIVE_MAP_CONTINENTS: InformativeMapContinent[] = [
  {
    id: "north-america",
    label: "North America",
    legendLabel: "North America (7%)",
    shareAnchors: ["United States of America", "Canada"],
    shareLabel: "7%",
    fill: "#34547C4A",
    hoverFill: "#34547C66",
    stroke: "#34547C80",
    overlay: {
      headline: "North America",
      fatalityRate: "12.4 per 100,000 population",
      deathsShare: "≈ 11% of WCO composite deaths",
      note: "Urban interstate corridors and rural undivided roads drive mixed trends (demo).",
    },
  },
  {
    id: "south-america",
    label: "South America",
    legendLabel: "South America (23%)",
    shareAnchors: ["Brazil"],
    shareLabel: "23%",
    fill: "#E31E243B",
    hoverFill: "#E31E2466",
    stroke: "#E31E2466",
    overlay: {
      headline: "South America",
      fatalityRate: "16.8 per 100,000 population",
      deathsShare: "≈ 9% of WCO composite deaths",
      note: "Motorcycle exposure on coastal arterials remains elevated in the demo series.",
    },
  },
  {
    id: "europe",
    label: "Europe",
    legendLabel: "Europe (2%)",
    shareAnchors: ["Russia"],
    shareLabel: "2%",
    fill: "#2E7D3214",
    hoverFill: "#2E7D3229",
    stroke: "#2E7D324D",
    overlay: {
      headline: "Europe",
      fatalityRate: "5.1 per 100,000 population",
      deathsShare: "≈ 8% of WCO composite deaths",
      note: "Lowest regional rate under harmonized WHO definitions in this atlas edition.",
    },
  },
  {
    id: "africa",
    label: "Africa",
    legendLabel: "Africa (52%)",
    shareAnchors: ["Dem. Rep. Congo"],
    shareLabel: "52%",
    fill: "#E31E2485",
    hoverFill: "#E31E24B3",
    stroke: "#E31E24AA",
    overlay: {
      headline: "Africa",
      fatalityRate: "26.6 per 100,000 population",
      deathsShare: "≈ 18% of WCO composite deaths",
      note: "Highest fatality rate in the series; mixed traffic on undivided rural roads.",
    },
  },
  {
    id: "asia",
    label: "Asia",
    legendLabel: "Asia (12%)",
    shareAnchors: ["China"],
    shareLabel: "12%",
    fill: "#34547C80",
    hoverFill: "#34547C99",
    stroke: "#34547C",
    overlay: {
      headline: "Asia",
      fatalityRate: "17.2 per 100,000 population",
      deathsShare: "≈ 48% of WCO composite deaths",
      note: "Largest absolute share as motorcycle density outpaces protected corridor investment.",
    },
  },
  {
    id: "oceania",
    label: "Oceania",
    legendLabel: "Oceania (4%)",
    shareAnchors: ["Australia"],
    shareLabel: "4%",
    fill: "#2E7D3229",
    hoverFill: "#2E7D3247",
    stroke: "#2E7D3266",
    overlay: {
      headline: "Oceania",
      fatalityRate: "9.7 per 100,000 population",
      deathsShare: "≈ 2% of WCO composite deaths",
      note: "Stable totals with outsized remote-highway single-vehicle run-off fatalities.",
    },
  },
  {
    id: "antarctica",
    label: "Antarctica",
    legendLabel: "Antarctica (N/A)",
    shareAnchors: ["Antarctica"],
    shareLabel: "N/A",
    fill: "transparent",
    hoverFill: "#E2E8F0",
    stroke: "#94A3B8",
    overlay: {
      headline: "Antarctica",
      fatalityRate: "N/A",
      deathsShare: "N/A",
      note: "N/A",
    },
  },
];

export function findInformativeMapContinent(
  id: InformativeMapContinentId | null,
): InformativeMapContinent | undefined {
  if (!id) return undefined;
  return INFORMATIVE_MAP_CONTINENTS.find((continent) => continent.id === id);
}