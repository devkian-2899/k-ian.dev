import type { InformativeReportBook } from "./informative-reports-bookshelf-data";
import { getInformativeReportCopyrightYear } from "./informative-reports-bookshelf-data";

export type InformativeReportAuthor = {
  affiliation: string;
  name: string;
  orcid?: string;
  role?: string;
};

export type InformativeReportPublicationMeta = {
  authors: InformativeReportAuthor[];
  citationApa: string;
  citationBibTeX: string;
  citationHarvard: string;
  doi: string;
  funding: string;
  keywords: string[];
  license: string;
  permalink: string;
};

const BASE_KEYWORDS = [
  "road traffic fatalities",
  "crash observatory",
  "global mobility risk",
  "transport safety analytics",
  "vital statistics harmonization",
];

type CategoryMetaTemplate = {
  authors: InformativeReportAuthor[];
  extraKeywords: string[];
  funding: string;
};

const YEARLY_AUTHORS: InformativeReportAuthor[] = [
  {
    name: "Dr. Mei-Lin Hsu",
    affiliation: "World Crash Observatory — Transport Risk Analytics Division",
    role: "Lead epidemiologist",
    orcid: "0000-0002-7148-9031",
  },
  {
    name: "Kaung Htet",
    affiliation: "Drivkian Development — Informative Systems & Data Engineering",
    role: "Principal data steward",
    orcid: "0000-0003-4821-2290",
  },
  {
    name: "James Okafor, Ph.D.",
    affiliation: "Independent Road Safety Research Consultancy",
    role: "Regional fatality modeling reviewer",
    orcid: "0000-0001-8824-4417",
  },
];

const CATEGORY_META: Record<string, CategoryMetaTemplate> = {
  yearly: {
    authors: YEARLY_AUTHORS,
    extraKeywords: ["annual mortality estimates", "motor vehicle deaths", "WHO-aligned harmonization"],
    funding:
      "Supported by the World Crash Observatory annual statistics program, Drivkian Development platform analytics fund, and in-kind police crash extracts from 41 partner agencies (demo acknowledgment).",
  },
  "vehicle-types": {
    authors: [
      {
        name: "Elena Kostova, Ph.D.",
        affiliation: "World Crash Observatory — Vehicle Classification Lab",
        role: "Fleet taxonomy lead",
        orcid: "0000-0002-3319-7740",
      },
      {
        name: "Marcus Delgado",
        affiliation: "Drivkian Development — Telematics Pipelines",
        role: "Senior analytics engineer",
        orcid: "0000-0003-9044-1182",
      },
      {
        name: "Priya Nair",
        affiliation: "Nordic Micromobility Safety Council (advisor)",
        role: "Powered two-wheeler reviewer",
        orcid: "0000-0001-5520-6673",
      },
    ],
    extraKeywords: [
      "vehicle class taxonomy",
      "motorcycle crash risk",
      "heavy goods vehicle",
      "micromobility injury",
      "fleet composition",
    ],
    funding:
      "Funded under WCO Special Study SS-VT-2025, with vehicle registration microdata contributed by nine national motor registers (synthetic/demo cohorts).",
  },
  manufacturer: {
    authors: [
      {
        name: "Tomás Iglesias",
        affiliation: "World Crash Observatory — OEM Benchmarking Unit",
        role: "Program director",
        orcid: "0000-0002-8841-0038",
      },
      {
        name: "Aisha Rahman",
        affiliation: "Drivkian Development — Recall Graph & Severity Models",
        role: "Principal researcher",
        orcid: "0000-0003-6610-4499",
      },
      {
        name: "Dr. Chen Wei",
        affiliation: "Pacific Automotive Safety Institute",
        role: "Telematics validation reviewer",
        orcid: "0000-0001-7742-9024",
      },
    ],
    extraKeywords: [
      "OEM safety ranking",
      "crash severity index",
      "voluntary recall linkage",
      "telematics cohort",
      "active safety systems",
    ],
    funding:
      "Manufacturers participated voluntarily; analysis supported by WCO OEM Transparency Grant OMG-2024 and Devkian synthetic telematics sandboxes (no real OEM endorsement implied).",
  },
  area: {
    authors: [
      {
        name: "Dr. Hnin Sandar",
        affiliation: "World Crash Observatory — Geospatial Mortality Desk",
        role: "Continental mapping lead",
        orcid: "0000-0002-1188-5541",
      },
      {
        name: "Ian Khant",
        affiliation: "Drivkian Development — Geo-Statistical Services",
        role: "GIS harmonization architect",
        orcid: "0000-0003-2290-8817",
      },
      {
        name: "Yadana Tun",
        affiliation: "Asia-Pacific Transport Safety Forum",
        role: "Regional indicator reviewer",
        orcid: "0000-0001-9934-2205",
      },
    ],
    extraKeywords: [
      "continental fatality rates",
      "population exposure",
      "rural undivided highways",
      "motorcycle density",
      "WHO regional definitions",
    ],
    funding:
      "WCO Continental Atlas CA-2025 with UN regional commission desk reviews and population priors from public demographic open data.",
  },
  "injury-severity": {
    authors: [
      {
        name: "Dr. Hannah Vu",
        affiliation: "World Crash Observatory — Injury Surveillance Branch",
        role: "Severity stratification lead",
        orcid: "0000-0002-6644-7712",
      },
      {
        name: "Oliver Kent",
        affiliation: "Drivkian Development — Hospital–Police Linkage",
        role: "Record linkage engineer",
        orcid: "0000-0003-1044-5590",
      },
      {
        name: "Isabelle Moreau",
        affiliation: "European Trauma Registry Collaborative (guest)",
        role: "Clinical coding reviewer",
        orcid: "0000-0001-4477-8801",
      },
    ],
    extraKeywords: [
      "fatality stratification",
      "serious injury threshold",
      "societal cost modeling",
      "night-time interstate risk",
      "linked hospital records",
    ],
    funding:
      "Pilot linkage sites funded by WCO Injury Gradient Program IG-2024 and Devkian privacy-preserving match tooling (synthetic patient keys in this demo).",
  },
};

function categoryKeyFromBookId(bookId: string): string {
  if (bookId.startsWith("yearly-")) return "yearly";
  if (bookId.startsWith("vehicle-types")) return "vehicle-types";
  if (bookId.startsWith("manufacturer")) return "manufacturer";
  if (bookId.startsWith("area")) return "area";
  if (bookId.startsWith("injury-severity")) return "injury-severity";
  return "yearly";
}

function reportYearFromBook(book: InformativeReportBook): string {
  return getInformativeReportCopyrightYear(book.id);
}

function slugFromBookId(bookId: string): string {
  return bookId.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
}

function apaAuthorList(authors: InformativeReportAuthor[]): string {
  const labels = authors.map((author) => {
    const parts = author.name.replace(/,?\s*Ph\.D\.?$/i, "").trim().split(/\s+/);
    const family = parts.length > 1 ? parts[parts.length - 1] : parts[0] ?? "Author";
    const given = parts.slice(0, -1).join(" ");
    const initials = given
      .split(/\s+/)
      .filter(Boolean)
      .map((segment) => `${segment.charAt(0)}.`)
      .join(" ");
    return initials ? `${family}, ${initials}` : family;
  });

  if (labels.length <= 1) return labels[0] ?? "World Crash Observatory";
  if (labels.length === 2) return `${labels[0]} & ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, & ${labels[labels.length - 1]}`;
}

function bibtexAuthors(authors: InformativeReportAuthor[]): string {
  return authors
    .map((author) => {
      const parts = author.name.replace(/,?\s*Ph\.D\.?$/i, "").trim().split(/\s+/);
      const family = parts.length > 1 ? parts[parts.length - 1] : parts[0] ?? "Author";
      const given = parts.slice(0, -1).join(" ");
      return `${family}, ${given}`;
    })
    .join(" and ");
}

const BOOK_IDENTIFIER_OVERRIDES: Record<string, { doi: string; permalink: string }> = {
  "area-2025": {
    doi: "https://www.wco.com/reports/2025-Continental-Road-Fatality-Atlas",
    permalink: "https://www.wco.com/reports/2025-Continental-Road-Fatality-Atlas",
  },
};

/** Demo publication metadata for the expanded report reader. */
export function getInformativeReportPublicationMeta(book: InformativeReportBook): InformativeReportPublicationMeta {
  const year = reportYearFromBook(book);
  const categoryKey = categoryKeyFromBookId(book.id);
  const template = CATEGORY_META[categoryKey] ?? CATEGORY_META.yearly;
  const slug = slugFromBookId(book.id);
  const identifierOverride = BOOK_IDENTIFIER_OVERRIDES[book.id];

  const keywords = [...BASE_KEYWORDS, ...template.extraKeywords, `${year} edition`];

  const doiRegistry = `10.47388/wco.${year}.${slug}`;
  const doi = identifierOverride?.doi ?? doiRegistry;
  const permalink = identifierOverride?.permalink ?? `https://k-ian.dev/reports/${book.id}`;
  const citationLink = identifierOverride?.permalink ?? `https://doi.org/${doiRegistry}`;

  return {
    authors: template.authors,
    keywords,
    doi,
    permalink,
    license:
      "Creative Commons Attribution 4.0 International (CC BY 4.0). You may share and adapt this material with appropriate credit.",
    citationApa: `${apaAuthorList(template.authors)} (${year}). ${book.title}. World Crash Observatory. ${citationLink}`,
    citationHarvard: `${template.authors[0]?.name.split(/\s+/).pop() ?? "WCO"}, et al. (${year}) '${book.title}', World Crash Observatory, viewed ${new Date().getFullYear()}, <${permalink}>.`,
    citationBibTeX: `@report{wco_${book.id.replace(/[^a-z0-9]+/gi, "_")},
  author = {${bibtexAuthors(template.authors)}},
  title = {${book.title}},
  year = {${year}},
  publisher = {World Crash Observatory},
  url = {${permalink}}
}`,
    funding: template.funding,
  };
}