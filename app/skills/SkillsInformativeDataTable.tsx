"use client";

import { useMemo, useState, type PointerEvent } from "react";
import {
  INFORMATIVE_MAP_CONTINENTS,
  INFORMATIVE_MAP_LEGEND_ORDER,
  INFORMATIVE_OTHER_FILL,
  type InformativeMapContinent,
} from "./informative-map-continents-data";

type SortKey = "continent" | "share" | "fatalityRate" | "note";
type SortDirection = "asc" | "desc";

type TableRow = {
  continent: InformativeMapContinent;
  fatalityRate: string;
  note: string;
  shareLabel: string;
  shareValue: number | null;
};

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "continent", label: "Continent" },
  { key: "share", label: "Share" },
  { key: "fatalityRate", label: "Fatality rate" },
  { key: "note", label: "Note" },
];

function stopCardFlip(event: PointerEvent) {
  event.stopPropagation();
}

function shareValue(label: string): number | null {
  const match = label.match(/^(\d+(?:\.\d+)?)%$/);
  return match ? Number(match[1]) : null;
}

function compareRows(left: TableRow, right: TableRow, key: SortKey, direction: SortDirection): number {
  const factor = direction === "asc" ? 1 : -1;

  if (key === "share") {
    const leftValue = left.shareValue ?? (direction === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
    const rightValue = right.shareValue ?? (direction === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
    return (leftValue - rightValue) * factor;
  }

  const leftText =
    key === "continent" ? left.continent.label : key === "fatalityRate" ? left.fatalityRate : left.note;
  const rightText =
    key === "continent" ? right.continent.label : key === "fatalityRate" ? right.fatalityRate : right.note;
  return leftText.localeCompare(rightText, undefined, { numeric: true, sensitivity: "base" }) * factor;
}

/** Sortable, filterable table of the same continental atlas figures as the map and charts. */
export function SkillsInformativeDataTable({ variant = "ian" }: { variant?: "ian" | "other" }) {
  const isOther = variant === "other";
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const rows = useMemo<TableRow[]>(() => {
    return INFORMATIVE_MAP_LEGEND_ORDER.flatMap((id) => {
      const continent = INFORMATIVE_MAP_CONTINENTS.find((entry) => entry.id === id);
      if (!continent) return [];
      return [
        {
          continent,
          shareLabel: continent.shareLabel,
          shareValue: shareValue(continent.shareLabel),
          fatalityRate: continent.overlay.fatalityRate,
          note: continent.overlay.note,
        },
      ];
    });
  }, []);

  const visibleRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = needle
      ? rows.filter((row) =>
          [row.continent.label, row.shareLabel, row.fatalityRate, row.note].join(" ").toLowerCase().includes(needle),
        )
      : rows;

    if (!sortKey) return filtered;
    return [...filtered].sort((left, right) => compareRows(left, right, sortKey, sortDirection));
  }, [query, rows, sortDirection, sortKey]);

  const onSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection(key === "continent" || key === "note" ? "asc" : "desc");
  };

  return (
    <div
      className={`skills-informative-table${isOther ? " skills-informative-table--other" : ""}`}
      onPointerDown={stopCardFlip}
    >
      <div className="skills-informative-table-toolbar">
        <label className="skills-informative-table-search">
          <span className="skills-informative-table-search-label">Search</span>
          <input
            type="search"
            value={query}
            placeholder="Continent, share, or note"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <p className="skills-informative-table-count">
          {visibleRows.length} of {rows.length}
        </p>
      </div>

      <div className="skills-informative-table-scroll">
        <table className="skills-informative-table-grid">
          <caption className="sr-only">2025 Continental Road Fatality Atlas</caption>
          <thead>
            <tr>
              {COLUMNS.map((column) => {
                const isActive = sortKey === column.key;
                const ariaSort = isActive ? (sortDirection === "asc" ? "ascending" : "descending") : "none";
                return (
                  <th key={column.key} aria-sort={ariaSort} scope="col">
                    <button type="button" onClick={() => onSort(column.key)}>
                      {column.label}
                      <span aria-hidden className="skills-informative-table-sort">
                        {isActive ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td className="skills-informative-table-empty" colSpan={COLUMNS.length}>
                  No continents match that search.
                </td>
              </tr>
            ) : (
              visibleRows.map((row) => (
                <tr key={row.continent.id}>
                  <th scope="row">
                    <span className="skills-informative-table-continent">
                      <span
                        aria-hidden
                        className="skills-informative-table-swatch"
                        style={{
                          backgroundColor:
                            row.shareValue === null
                              ? isOther
                                ? INFORMATIVE_OTHER_FILL[row.continent.id]
                                : "transparent"
                              : isOther
                                ? INFORMATIVE_OTHER_FILL[row.continent.id]
                                : row.continent.fill,
                          borderColor: isOther ? "#000" : row.continent.stroke,
                        }}
                      />
                      {row.continent.label}
                    </span>
                  </th>
                  <td>{row.shareLabel}</td>
                  <td>{row.fatalityRate}</td>
                  <td>{row.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
