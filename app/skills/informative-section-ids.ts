import type { InformativeNavItem } from "./informative-nav-items";

const INFORMATIVE_SECTION_ID: Record<InformativeNavItem, string> = {
  Reports: "informative-reports",
  "Interactive Map": "informative-interactive-map",
  "Graphs & Charts": "informative-graphs-charts",
  "Data Analysis": "informative-data-analysis",
  "Font & Color": "informative-font-color",
};

export function getInformativeSectionId(item: InformativeNavItem): string {
  return INFORMATIVE_SECTION_ID[item];
}
