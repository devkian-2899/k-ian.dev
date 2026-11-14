export const INFORMATIVE_NAV_ITEMS = [
  "Reports",
  "Interactive Map",
  "Graphs & Charts",
  "Data Analysis",
  "Documentation",
] as const;

export type InformativeNavItem = (typeof INFORMATIVE_NAV_ITEMS)[number];

const INFORMATIVE_NAV_LABEL_IAN: Partial<Record<InformativeNavItem, string>> = {
  "Interactive Map": "Map",
  "Graphs & Charts": "Visual Data",
};

/** Visible nav/section title (Devkian overrides; Other's uses default). */
export function getInformativeNavLabel(side: "ian" | "other", item: InformativeNavItem): string {
  if (side === "ian") {
    return INFORMATIVE_NAV_LABEL_IAN[item] ?? item;
  }
  return item;
}
