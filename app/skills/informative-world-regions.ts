/** Ten macro regions for the interactive world map. */
export const INFORMATIVE_WORLD_REGION_IDS = [
  "north-america",
  "latin-america",
  "western-europe",
  "eastern-europe-central-asia",
  "middle-east-north-africa",
  "sub-saharan-africa",
  "south-asia",
  "east-asia",
  "southeast-asia-oceania",
  "antarctica",
] as const;

export type InformativeWorldRegionId = (typeof INFORMATIVE_WORLD_REGION_IDS)[number];

export type InformativeWorldRegionMeta = {
  id: InformativeWorldRegionId;
  label: string;
};

export const INFORMATIVE_WORLD_REGIONS: InformativeWorldRegionMeta[] = [
  { id: "north-america", label: "North America" },
  { id: "latin-america", label: "Latin America & Caribbean" },
  { id: "western-europe", label: "Western Europe" },
  { id: "eastern-europe-central-asia", label: "Eastern Europe & Central Asia" },
  { id: "middle-east-north-africa", label: "Middle East & North Africa" },
  { id: "sub-saharan-africa", label: "Sub-Saharan Africa" },
  { id: "south-asia", label: "South Asia" },
  { id: "east-asia", label: "East Asia" },
  { id: "southeast-asia-oceania", label: "Southeast Asia & Oceania" },
  { id: "antarctica", label: "Antarctica" },
];
