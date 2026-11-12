import type { InformativeWorldRegionId } from "./informative-world-regions";

type CountryRegionHints = {
  iso: string;
  continent?: string;
  subregion?: string;
};

/** Map Natural Earth country metadata → one of 10 world regions. */
export function resolveWorldRegionId(country: CountryRegionHints): InformativeWorldRegionId {
  const { iso, continent = "", subregion = "" } = country;

  if (iso === "ATA" || subregion === "Antarctica") {
    return "antarctica";
  }
  if (subregion === "Northern America") {
    return "north-america";
  }
  if (
    subregion === "Caribbean" ||
    subregion === "Central America" ||
    subregion === "South America"
  ) {
    return "latin-america";
  }
  if (subregion === "Western Europe" || subregion === "Northern Europe" || subregion === "Southern Europe") {
    return "western-europe";
  }
  if (subregion === "Eastern Europe" || subregion === "Central Asia" || iso === "RUS") {
    return "eastern-europe-central-asia";
  }
  if (subregion === "Northern Africa" || subregion === "Western Asia") {
    return "middle-east-north-africa";
  }
  if (
    subregion === "Eastern Africa" ||
    subregion === "Middle Africa" ||
    subregion === "Southern Africa" ||
    subregion === "Western Africa" ||
    continent === "Africa"
  ) {
    return "sub-saharan-africa";
  }
  if (subregion === "Southern Asia") {
    return "south-asia";
  }
  if (subregion === "Eastern Asia") {
    return "east-asia";
  }
  if (
    subregion === "South-Eastern Asia" ||
    subregion === "Australia and New Zealand" ||
    subregion === "Melanesia" ||
    subregion === "Micronesia" ||
    subregion === "Polynesia" ||
    subregion === "Seven seas (open ocean)" ||
    continent === "Oceania"
  ) {
    return "southeast-asia-oceania";
  }

  return "southeast-asia-oceania";
}
