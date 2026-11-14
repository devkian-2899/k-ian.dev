"use client";

import { useId, useMemo, useState, type PointerEvent } from "react";
import {
  INFORMATIVE_MAP_LEGEND_ORDER,
  INFORMATIVE_OTHER_FILL,
  findInformativeMapContinent,
  type InformativeMapContinent,
  type InformativeMapContinentId,
} from "./informative-map-continents-data";
import { SkillsInformativeCompareTrend } from "./SkillsInformativeCompareTrend";

function stopCardFlip(event: PointerEvent) {
  event.stopPropagation();
}

function sharePercent(label: string): number | null {
  const match = label.match(/^(\d+(?:\.\d+)?)%$/);
  return match ? Number(match[1]) : null;
}

function barColor(continent: InformativeMapContinent): string {
  const source = continent.fill.startsWith("#") ? continent.fill : continent.stroke;
  return source.length >= 7 ? source.slice(0, 7) : source;
}

function formatPoints(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

const OPTIONS = INFORMATIVE_MAP_LEGEND_ORDER.flatMap((id) => {
  const continent = findInformativeMapContinent(id);
  return continent ? [continent] : [];
});

/** Pairwise share comparison for the same continental atlas figures as the table. */
export function SkillsInformativeContinentCompare({ variant = "ian" }: { variant?: "ian" | "other" }) {
  const titleId = useId();
  const [leftId, setLeftId] = useState<InformativeMapContinentId>("africa");
  const [rightId, setRightId] = useState<InformativeMapContinentId>("south-america");

  const left = findInformativeMapContinent(leftId) ?? OPTIONS[0];
  const right = findInformativeMapContinent(rightId) ?? OPTIONS[1] ?? OPTIONS[0];

  const summary = useMemo(() => {
    const leftShare = sharePercent(left.shareLabel);
    const rightShare = sharePercent(right.shareLabel);
    if (leftShare === null || rightShare === null) {
      return {
        leftShare,
        rightShare,
        headline: "N/A",
        detail: "A share is not available for this pair.",
      };
    }
    const gap = Math.abs(leftShare - rightShare);
    const leader = leftShare === rightShare ? null : leftShare > rightShare ? left : right;
    return {
      leftShare,
      rightShare,
      headline: `${formatPoints(gap)} percentage points`,
      detail: leader ? `${leader.label} has the larger rate of fatality.` : "The shares are equal.",
    };
  }, [left, right]);

  const scale = Math.max(summary.leftShare ?? 0, summary.rightShare ?? 0, 1);

  return (
    <section
      aria-labelledby={titleId}
      className={`skills-informative-compare${variant === "other" ? " skills-informative-compare--raised" : ""}`}
      onPointerDown={stopCardFlip}
    >
      <div className="skills-informative-compare-layout">
        <div className="skills-informative-compare-controls">
          <h3 className="skills-informative-compare-title" id={titleId}>
            Continent Comparison
          </h3>

          <div className="skills-informative-compare-picks">
            <label className="skills-informative-compare-field">
              <span>Continent A</span>
              <select value={leftId} onChange={(event) => setLeftId(event.target.value as InformativeMapContinentId)}>
                {OPTIONS.map((continent) => (
                  <option key={continent.id} value={continent.id}>
                    {continent.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="skills-informative-compare-field">
              <span>Continent B</span>
              <select value={rightId} onChange={(event) => setRightId(event.target.value as InformativeMapContinentId)}>
                {OPTIONS.map((continent) => (
                  <option key={continent.id} value={continent.id}>
                    {continent.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="skills-informative-compare-bars">
            {[
              { key: "a", continent: left, share: summary.leftShare },
              { key: "b", continent: right, share: summary.rightShare },
            ].map(({ key, continent, share }) => (
              <div key={key} className="skills-informative-compare-row">
                <div className="skills-informative-compare-row-head">
                  <span>{continent.label}</span>
                  <span>{continent.shareLabel}</span>
                </div>
                <div className="skills-informative-compare-track">
                  <span
                    className="skills-informative-compare-fill"
                    style={{
                      width: share === null ? "0%" : `${(share / scale) * 100}%`,
                      backgroundColor:
                        share === null
                          ? "transparent"
                          : variant === "other"
                            ? INFORMATIVE_OTHER_FILL[continent.id]
                            : barColor(continent),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="skills-informative-compare-kicker">Difference</p>
          <p className="skills-informative-compare-headline">{summary.headline}</p>
          <p className="skills-informative-compare-detail">{summary.detail}</p>
        </div>

        <SkillsInformativeCompareTrend key={`${left.id}-${right.id}`} left={left} right={right} variant={variant} />
      </div>
    </section>
  );
}
