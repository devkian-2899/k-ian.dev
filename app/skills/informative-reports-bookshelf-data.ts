export const INFORMATIVE_REPORT_SHELF_TOTAL_PAGES = 100;

/** Demo PDF asset until per-report files are added under `public/`. */
export const INFORMATIVE_REPORT_PDF_DOWNLOAD = {
  fileName: "WCO-Crash-Report-Sample.pdf",
  href: "/images/WCOSheet.xlsx",
};

export const INFORMATIVE_REPORT_PUBLISHER = {
  name: "World Crash Observatory",
  steward: "Drivkian Development",
  rightsHolder: "World Crash Observatory",
};

/** Only this edition shows Summary, actions, and publication metadata on Read more. */
export const INFORMATIVE_REPORT_DEMO_DETAIL_BOOK_ID = "area-2025";

export function informativeReportHasExpandedDetails(bookId: string): boolean {
  return bookId === INFORMATIVE_REPORT_DEMO_DETAIL_BOOK_ID;
}

export function getInformativeReportCopyrightYear(bookId: string): string {
  const match = bookId.match(/\d{4}/);
  if (match) return match[0];

  if (bookId.startsWith("vehicle-types")) return "2025";
  if (bookId.startsWith("manufacturer")) return "2024";
  if (bookId.startsWith("area")) return "2025";
  if (bookId.startsWith("injury-severity")) return "2024";

  return "2026";
}

const YEARLY_2024_DESCRIPTION =
  "In 2024, road traffic crashes continued to account for the overwhelming majority of transport-related accidental deaths, contributing roughly 1.19 million annual fatalities globally. While comprehensive global datasets tracking every category of accidental death as a single unified pool are reported through varying international health definitions, specific regional data highlights continuous improvements—such as a 4.3% decline in U.S. motor vehicle fatalities down to 39,254 and a 2.2% reduction across the European Union down to 20,017 deaths—even as overall mobility returned to full pre-pandemic levels.";

const YEARLY_2025_DESCRIPTION =
  "In 2025, road traffic crashes remained the dominant share of transport-related accidental deaths worldwide, with consolidated global estimates still approaching 1.17 million annual fatalities under harmonized road-safety reporting. Cross-national health systems continued to publish accidental mortality on differing definitions, but refreshed regional figures pointed to further safety gains—such as an estimated 3.1% decline in U.S. motor vehicle fatalities to roughly 38,035 and a 1.8% reduction across the European Union to about 19,650 deaths—even as passenger and freight movement stayed elevated at post-pandemic levels.";

const YEARLY_2023_DESCRIPTION =
  "In 2023, road traffic crashes again led transport-related accidental mortality worldwide, with global road fatality estimates near 1.20 million under WHO-aligned reporting cycles. National vital statistics and police-recorded crash systems still diverged on broader accidental-death totals, but published updates showed measurable progress in several large markets—including about a 3.6% decrease in U.S. motor vehicle deaths to roughly 40,990 and a 1.7% decline across the European Union to near 20,465 fatalities—as travel demand continued to normalize after the pandemic disruption.";

const YEARLY_2022_DESCRIPTION =
  "In 2022, road traffic crashes remained the principal driver of transport-related accidental deaths globally, contributing on the order of 1.22 million estimated annual fatalities when harmonized international road-safety series were applied. Aggregated accidental-death statistics still varied by jurisdiction, yet regional releases underscored uneven recovery-era risks—including a modest 0.8% rise in U.S. motor vehicle fatalities to about 42,795 alongside a 3.0% reduction in the European Union to approximately 20,641 deaths—as congestion patterns shifted and freight mileage expanded.";

const YEARLY_2021_DESCRIPTION =
  "In 2021, road traffic crashes dominated transport-related accidental mortality worldwide, with global estimates near 1.24 million annual fatalities amid rebounding mobility after the first pandemic wave. Unified cross-sector accidental-death dashboards remained limited, but national data illustrated a volatile safety landscape—including a 10.5% increase in U.S. motor vehicle fatalities to roughly 42,939 and mixed EU outcomes near 21,275 deaths—as reduced traffic early in the year gave way to higher-speed, higher-exposure travel later in the recovery.";

const VEHICLE_TYPES_DESCRIPTION =
  "This edition classifies 4.82 million police-reported injury crashes across 61 harmonized jurisdictions by powered-two-wheelers, passenger cars, light commercial vans, heavy goods vehicles, buses and coaches, and emerging micromobility fleets. Motorcycles and mopeds accounted for 19% of recorded crashes but 31% of serious injuries where helmet compliance lagged below 70%. Articulated HGVs were over-represented in multi-vehicle pileups on high-speed corridors, while battery-electric passenger cars showed a 12% lower fatal involvement rate per billion vehicle-kilometers in urban conditions—though repair-cost severity rose sharply in low-speed parking-lot incidents.";

const MANUFACTURER_DESCRIPTION =
  "The 2024 manufacturer benchmark ranks 28 OEM groups using WCO's weighted crash severity index, warranty-linked telematics samples (n ≈ 14.2 million vehicle-years), and voluntary recall exposure. Brands in the upper quartile cut police-reported fatal involvement by a modeled 8.4% relative to the cohort median after controlling for fleet age and region. Pickup and large-SUV platforms from three North American groups still dominate rollover-with-ejection scenarios, whereas several European groups led in pedestrian automatic emergency braking effectiveness scores above 87% in Euro NCAP-aligned dummy tests (demo figures).";

const CONTINENTS_DESCRIPTION =
  "Continental dashboards compare Africa, the Americas, Asia-Pacific, Europe, and Oceania using imputed fatal rates per 100,000 population and per 10,000 registered vehicles. Africa recorded the highest fatality rate in the series at 26.6 per 100,000 (demo), driven by mixed traffic on undivided rural arterials, while Europe posted the lowest at 5.1 under harmonized WHO definitions. Asia-Pacific contributed the largest absolute share of deaths (≈ 48% of the WCO composite) as motorcycle density grew faster than protected corridor investment. Oceania showed stable totals with outsized remote-highway single-vehicle run-off fatalities.";

const FATALITY_DESCRIPTION =
  "This report stratifies outcomes into fatality, serious injury (≥ 30 days incapacity or hospital admission), minor injury, and no-injury property-damage-only tiers using linked hospital and police keys in 19 pilot countries. Fatal collisions represented 1.1% of all recorded crashes but consumed 41% of modeled societal cost in the reference year. Serious injury cases rose 2.3% year-on-year where e-scooter trips doubled, while night-time interstate segments without lighting showed a fatality odds ratio of 2.7 compared with daylight urban arterials (demo regression).";

export type InformativeReportBook = {
  coverSrc: string;
  description: string;
  /** Demo file size shown under Download (e.g. "134 KB"). */
  downloadSizeLabel: string;
  id: string;
  /** Secondary line under the main title (e.g. publication date). */
  subtitle?: string;
  title: string;
};

export type InformativeReportCategory = {
  books: InformativeReportBook[];
  id: string;
  sideNavLabel: string;
};

export const INFORMATIVE_REPORT_CATEGORIES: InformativeReportCategory[] = [
  {
    id: "yearly",
    sideNavLabel: "Yearly Crash Report",
    books: [
      {
        id: "yearly-2021",
        coverSrc: "/images/reports/report-cover-2021.svg",
        downloadSizeLabel: "134 KB",
        title: "2021 Global Road Traffic Fatality Report",
        subtitle: "PUBLICATION | DEC, 2021.",
        description: YEARLY_2021_DESCRIPTION,
      },
      {
        id: "yearly-2022",
        coverSrc: "/images/reports/report-cover-2022.svg",
        downloadSizeLabel: "142 KB",
        title: "2022 Global Road Traffic Fatality Report",
        subtitle: "PUBLICATION | JAN, 2023.",
        description: YEARLY_2022_DESCRIPTION,
      },
      {
        id: "yearly-2023",
        coverSrc: "/images/reports/report-cover-2023.svg",
        downloadSizeLabel: "156 KB",
        title: "2023 Global Road Traffic Fatality Report",
        subtitle: "PUBLICATION | JAN, 2024.",
        description: YEARLY_2023_DESCRIPTION,
      },
      {
        id: "yearly-2024",
        coverSrc: "/images/reports/report-cover-2024.svg",
        downloadSizeLabel: "178 KB",
        title: "2024 Global Road Traffic Fatality Report",
        subtitle: "PUBLICATION | DEC, 2024.",
        description: YEARLY_2024_DESCRIPTION,
      },
      {
        id: "yearly-2025",
        coverSrc: "/images/reports/report-cover-2025.svg",
        downloadSizeLabel: "201 KB",
        title: "2025 Global Road Traffic Fatality Report",
        subtitle: "PUBLICATION | JAN, 2026.",
        description: YEARLY_2025_DESCRIPTION,
      },
    ],
  },
  {
    id: "vehicle-types",
    sideNavLabel: "Reports By Vehicle Types",
    books: [
      {
        id: "vehicle-types-2025",
        coverSrc: "/images/reports/report-cover-vehicle.svg",
        downloadSizeLabel: "188 KB",
        title: "2025 Global Crash Analysis by Vehicle Type",
        subtitle: "PUBLICATION | SEP, 2025.",
        description: VEHICLE_TYPES_DESCRIPTION,
      },
    ],
  },
  {
    id: "manufacturer",
    sideNavLabel: "Reports By Manufacturer",
    books: [
      {
        id: "manufacturer-2024",
        coverSrc: "/images/reports/report-cover-manufacturer.svg",
        downloadSizeLabel: "214 KB",
        title: "2024 OEM Crash Severity & Recall Benchmark",
        subtitle: "PUBLICATION | NOV, 2024.",
        description: MANUFACTURER_DESCRIPTION,
      },
    ],
  },
  {
    id: "area",
    sideNavLabel: "Report By Continents",
    books: [
      {
        id: "area-2025",
        coverSrc: "/images/reports/report-cover-area.svg",
        downloadSizeLabel: "196 KB",
        title: "2025 Continental Road Fatality Atlas",
        subtitle: "PUBLICATION | JUN, 2025.",
        description: CONTINENTS_DESCRIPTION,
      },
    ],
  },
  {
    id: "injury-severity",
    sideNavLabel: "Report By Fatality",
    books: [
      {
        id: "injury-severity-2024",
        coverSrc: "/images/reports/report-cover-injury.svg",
        downloadSizeLabel: "172 KB",
        title: "2024 Fatality & Injury Severity Stratification Report",
        subtitle: "PUBLICATION | MAR, 2025.",
        description: FATALITY_DESCRIPTION,
      },
    ],
  },
];

export function findInformativeReportBook(bookId: string): InformativeReportBook | undefined {
  for (const category of INFORMATIVE_REPORT_CATEGORIES) {
    const book = category.books.find((entry) => entry.id === bookId);
    if (book) return book;
  }
  return undefined;
}

export function getInformativeReportCategory(categoryId: string): InformativeReportCategory | undefined {
  return INFORMATIVE_REPORT_CATEGORIES.find((category) => category.id === categoryId);
}