import type { InformativeContinentId } from "./informative-continent-fatality-data";

export const INFORMATIVE_MAP_VIEWBOX = { width: 360, height: 180 } as const;

export type InformativeContinentShape = {
  id: InformativeContinentId;
  label: string;
  path: string;
};

/** Simplified world regions for the in-card choropleth (not a street map). */
export const INFORMATIVE_CONTINENT_SHAPES: InformativeContinentShape[] = [
  {
    id: "north-america",
    label: "North America",
    path: "M48 46 C62 28 104 24 126 38 C136 54 124 76 100 86 C78 92 56 80 48 62 Z",
  },
  {
    id: "south-america",
    label: "South America",
    path: "M108 92 C122 86 132 104 128 132 C122 148 104 152 94 138 C88 118 96 98 108 92 Z",
  },
  {
    id: "europe",
    label: "Europe",
    path: "M168 42 C182 36 198 40 204 52 C202 62 186 68 172 64 C164 56 162 48 168 42 Z",
  },
  {
    id: "africa",
    label: "Africa",
    path: "M172 68 C188 62 208 72 212 98 C210 126 194 142 178 138 C164 124 160 92 172 68 Z",
  },
  {
    id: "asia",
    label: "Asia",
    path: "M204 36 C244 28 296 40 312 62 C322 88 298 110 252 108 C220 104 196 78 204 52 Z",
  },
  {
    id: "oceania",
    label: "Oceania",
    path: "M268 118 C286 112 308 118 316 132 C312 146 292 152 270 144 C260 134 262 124 268 118 Z",
  },
  {
    id: "antarctica",
    label: "Antarctica",
    path: "M52 158 C120 150 248 150 312 158 C298 168 210 174 120 172 C72 170 58 166 52 158 Z",
  },
];
