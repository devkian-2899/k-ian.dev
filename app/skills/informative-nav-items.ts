export const INFORMATIVE_NAV_ITEMS = [
  "Font & Color",
  "Interactive Map",
  "Graphs & Charts",
  "Data Analysis",
  "Reports",
] as const;

export type InformativeNavItem = (typeof INFORMATIVE_NAV_ITEMS)[number];
