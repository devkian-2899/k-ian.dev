"use client";

import { useMemo, useState, type PointerEvent } from "react";
import {
  INFORMATIVE_MAP_CONTINENTS,
  INFORMATIVE_MAP_LEGEND_ORDER,
  INFORMATIVE_OTHER_FILL,
  findInformativeMapContinent,
  type InformativeMapContinent,
  type InformativeMapContinentId,
} from "./informative-map-continents-data";

type DonutSlice = {
  continent: InformativeMapContinent;
  share: number;
};

const RADIUS = 42;
const STROKE = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function sharePercent(continent: InformativeMapContinent): number | null {
  const match = continent.shareLabel.match(/^(\d+(?:\.\d+)?)%$/);
  if (!match) return null;
  return Number(match[1]);
}

function stopCardFlip(event: PointerEvent) {
  event.stopPropagation();
}

type SkillsInformativeDonutChartProps = {
  variant?: "ian" | "other";
};

/** Donut of the same continent shares and fills as the interactive map. */
export function SkillsInformativeDonutChart({ variant = "ian" }: SkillsInformativeDonutChartProps) {
  const isOther = variant === "other";
  const [activeId, setActiveId] = useState<InformativeMapContinentId | null>(null);

  const slices = useMemo(() => {
    const next: DonutSlice[] = [];
    for (const id of INFORMATIVE_MAP_LEGEND_ORDER) {
      const continent = findInformativeMapContinent(id);
      if (!continent) continue;
      const share = sharePercent(continent);
      if (share === null || share <= 0) continue;
      next.push({ continent, share });
    }
    return next;
  }, []);

  const active = slices.find((slice) => slice.continent.id === activeId) ?? null;
  let dashOffset = 0;

  return (
    <div
      className={`skills-informative-donut${isOther ? " skills-informative-donut--raised" : ""}`}
      onPointerDown={stopCardFlip}
    >
      <div className="skills-informative-donut-chart">
        <svg aria-label="Continental fatality share" className="skills-informative-donut-svg" role="img" viewBox="0 0 120 120">
          <circle className="skills-informative-donut-track" cx="60" cy="60" r={RADIUS} />
          <g transform="rotate(-90 60 60)">
            {slices.map((slice) => {
              const length = (slice.share / 100) * CIRCUMFERENCE;
              const isActive = activeId === slice.continent.id;
              const isMuted = activeId !== null && !isActive;
              const segment = (
                <circle
                  key={slice.continent.id}
                  className={`skills-informative-donut-slice${isActive ? " skills-informative-donut-slice--active" : ""}${
                    isMuted ? " skills-informative-donut-slice--muted" : ""
                  }`}
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  stroke={isOther ? INFORMATIVE_OTHER_FILL[slice.continent.id] : slice.continent.fill}
                  strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                  strokeDashoffset={-dashOffset}
                  strokeWidth={isActive ? STROKE + 2 : STROKE}
                  onPointerEnter={() => setActiveId(slice.continent.id)}
                  onPointerLeave={() => setActiveId(null)}
                />
              );
              dashOffset += length;
              return segment;
            })}
          </g>
          <text className="skills-informative-donut-center" x="60" y="64">
            {active ? active.continent.shareLabel : ""}
          </text>
        </svg>
      </div>

      <ul className="skills-informative-donut-legend">
        {INFORMATIVE_MAP_LEGEND_ORDER.map((id) => {
          const continent = INFORMATIVE_MAP_CONTINENTS.find((entry) => entry.id === id);
          if (!continent) return null;
          const isSlice = sharePercent(continent) !== null;
          return (
            <li key={continent.id} className="skills-informative-donut-legend-item">
              <span
                aria-hidden
                className="skills-informative-donut-swatch"
                style={{
                  backgroundColor: isOther
                    ? INFORMATIVE_OTHER_FILL[continent.id]
                    : isSlice
                      ? continent.fill
                      : "transparent",
                  borderColor: isOther ? "#F3C8C9" : continent.stroke,
                }}
              />
              <span>{continent.legendLabel}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
