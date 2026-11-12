"use client";

import { useCallback, useId, useState } from "react";
import {
  INFORMATIVE_CONTINENT_FATALITY_PERCENT,
  continentFatalityFill,
  type InformativeContinentId,
} from "./informative-continent-fatality-data";
import {
  INFORMATIVE_CONTINENT_SHAPES,
  INFORMATIVE_MAP_VIEWBOX,
} from "./informative-continent-map-shapes";

type SkillsInformativeInteractiveMapSectionProps = {
  side: "ian" | "other";
};

/** Choropleth: continent fill opacity from manual fatality % (Excel later). */
export function SkillsInformativeInteractiveMapSection({
  side,
}: SkillsInformativeInteractiveMapSectionProps) {
  const mapTitleId = useId();
  const [activeId, setActiveId] = useState<InformativeContinentId | null>(null);

  const onRegionEnter = useCallback((id: InformativeContinentId) => {
    setActiveId(id);
  }, []);

  const onRegionLeave = useCallback(() => {
    setActiveId(null);
  }, []);

  const activeShape = activeId
    ? INFORMATIVE_CONTINENT_SHAPES.find((shape) => shape.id === activeId)
    : undefined;
  const activePercent = activeId ? INFORMATIVE_CONTINENT_FATALITY_PERCENT[activeId] : null;

  return (
    <div className={`skills-informative-map skills-informative-map--${side}`}>
      <div className="skills-informative-map-toolbar">
        <span className="skills-informative-map-toolbar-label" id={mapTitleId}>
          Vehicle fatality rate (%)
        </span>
        {activeShape && activePercent !== null ? (
          <span className="skills-informative-map-toolbar-value">
            {activeShape.label}: {activePercent}%
          </span>
        ) : (
          <span className="skills-informative-map-toolbar-hint">Hover a continent</span>
        )}
      </div>

      <svg
        aria-labelledby={mapTitleId}
        className="skills-informative-map-svg"
        role="img"
        viewBox={`0 0 ${INFORMATIVE_MAP_VIEWBOX.width} ${INFORMATIVE_MAP_VIEWBOX.height}`}
      >
        <desc>Sample choropleth by continent; shading strength follows fatality percent.</desc>
        <rect
          className="skills-informative-map-ocean"
          height={INFORMATIVE_MAP_VIEWBOX.height}
          width={INFORMATIVE_MAP_VIEWBOX.width}
        />
        {INFORMATIVE_CONTINENT_SHAPES.map((continent) => {
          const percent = INFORMATIVE_CONTINENT_FATALITY_PERCENT[continent.id];
          const isActive = activeId === continent.id;

          return (
            <path
              key={continent.id}
              className={`skills-informative-map-region${
                isActive ? " skills-informative-map-region--active" : ""
              }`}
              d={continent.path}
              fill={continentFatalityFill(side, percent)}
              stroke={side === "ian" ? "#29405c" : "#c92d45"}
              strokeWidth={isActive ? 1.4 : 0.75}
              tabIndex={0}
              onBlur={onRegionLeave}
              onFocus={() => onRegionEnter(continent.id)}
              onMouseEnter={() => onRegionEnter(continent.id)}
              onMouseLeave={onRegionLeave}
            >
              <title>{`${continent.label}: ${percent}%`}</title>
            </path>
          );
        })}
      </svg>

      <div className="skills-informative-map-legend" aria-hidden>
        <span className="skills-informative-map-legend-cap">Pale</span>
        <span
          className={`skills-informative-map-legend-bar skills-informative-map-legend-bar--${side}`}
        />
        <span className="skills-informative-map-legend-cap">Dark</span>
      </div>
    </div>
  );
}
