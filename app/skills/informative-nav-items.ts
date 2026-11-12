export const INFORMATIVE_NAV_ITEMS = [
  "Reports",
  "Interactive Map",
  "Graphs & Charts",
  "Data Analysis",
  "Font & Color",
] as const;

export type InformativeNavItem = (typeof INFORMATIVE_NAV_ITEMS)[number];
