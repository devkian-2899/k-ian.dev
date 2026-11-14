"use client";

import type { PointerEvent } from "react";
import {
  INFORMATIVE_MAP_LEGEND_ORDER,
  INFORMATIVE_OTHER_FILL,
  findInformativeMapContinent,
} from "./informative-map-continents-data";
import { SkillsInformativeDonutChart } from "./SkillsInformativeDonutChart";

function stopCardFlip(event: PointerEvent) {
  event.stopPropagation();
}

function sharePercent(label: string): number | null {
  const match = label.match(/^(\d+(?:\.\d+)?)%$/);
  if (!match) return null;
  return Number(match[1]);
}

function SkillsInformativeBarChart({ variant }: { variant: "ian" | "other" }) {
  const rows = INFORMATIVE_MAP_LEGEND_ORDER.flatMap((id) => {
    const continent = findInformativeMapContinent(id);
    if (!continent) return [];
    return [{ continent, share: sharePercent(continent.shareLabel) }];
  });
  const maxShare = Math.max(...rows.map((row) => row.share ?? 0), 1);

  return (
    <div
      aria-label="Continental fatality share bars"
      className={`skills-informative-bars${variant === "other" ? " skills-informative-bars--raised" : ""}`}
      role="img"
    >
      <ul className="skills-informative-bars-list">
        {rows.map(({ continent, share }) => {
          const width = share === null ? 0 : (share / maxShare) * 100;
          return (
            <li key={continent.id} className="skills-informative-bars-row">
              <span className="skills-informative-bars-label">{continent.label}</span>
              <span className="skills-informative-bars-track">
                <span
                  className="skills-informative-bars-fill"
                  style={{
                    width: `${width}%`,
                    backgroundColor:
                      share === null
                        ? "transparent"
                        : variant === "other"
                          ? INFORMATIVE_OTHER_FILL[continent.id]
                          : continent.fill,
                  }}
                />
              </span>
              <span className="skills-informative-bars-value">{continent.shareLabel}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type SkillsInformativeVisualDataProps = {
  variant?: "ian" | "other";
};

/** Donut and bar chart for Visual Data. Side by side when expanded; stacked otherwise. */
export function SkillsInformativeVisualData({ variant = "ian" }: SkillsInformativeVisualDataProps) {
  return (
    <div className="skills-informative-visual" onPointerDown={stopCardFlip}>
      <SkillsInformativeDonutChart variant={variant} />
      <SkillsInformativeBarChart variant={variant} />
    </div>
  );
}
