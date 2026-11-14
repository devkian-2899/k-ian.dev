"use client";

import { useCallback, useId, useLayoutEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import {
  INFORMATIVE_MAP_CONTINENTS,
  INFORMATIVE_MAP_LEGEND_ORDER,
  INFORMATIVE_MAP_VIEWBOX,
  INFORMATIVE_OTHER_FILL,
  findInformativeMapContinent,
  type InformativeMapContinentId,
} from "./informative-map-continents-data";
import worldCountryPaths from "./informative-map-world-paths.json";

type WorldCountryPath = {
  continentId: InformativeMapContinentId;
  d: string;
  name: string;
};

const PATHS_BY_CONTINENT = new Map<InformativeMapContinentId, WorldCountryPath[]>();

for (const country of worldCountryPaths as WorldCountryPath[]) {
  const list = PATHS_BY_CONTINENT.get(country.continentId) ?? [];
  list.push(country);
  PATHS_BY_CONTINENT.set(country.continentId, list);
}

type OverlayPosition = {
  x: number;
  y: number;
};

type ShareCenter = {
  x: number;
  y: number;
};

/** Other's comparison map hover: one step darker than the resting fill. */
const OTHER_HOVER: Record<InformativeMapContinentId, string> = {
  africa: "#E87E82",
  antarctica: "#FFFBFB",
  asia: "#F8D1D2",
  europe: "#FEF6F6",
  "north-america": "#FBE6E7",
  oceania: "#FDF0F0",
  "south-america": "#F19B9E",
};

/** Low-contrast ink so the share sits inside the continent fill. */
const SHARE_INK: Record<InformativeMapContinentId, string> = {
  africa: "rgba(255, 255, 255, 0.48)",
  antarctica: "rgba(100, 116, 139, 0.44)",
  asia: "rgba(255, 255, 255, 0.44)",
  europe: "rgba(46, 125, 50, 0.44)",
  "north-america": "rgba(52, 84, 124, 0.46)",
  oceania: "rgba(46, 125, 50, 0.44)",
  "south-america": "rgba(227, 30, 36, 0.41)",
};

/** Center of the largest closed shape, so date-line fragments do not pull the label off the land. */
function largestSubpathCenter(path: SVGPathElement | null | undefined): ShareCenter | null {
  const data = path?.getAttribute("d");
  if (!path || !data || !path.ownerSVGElement) return null;

  const svg = path.ownerSVGElement;
  let best: { area: number; x: number; y: number } | null = null;

  for (const piece of data.split(/Z/i)) {
    if (!piece.includes("M")) continue;
    const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    probe.setAttribute("d", `${piece}Z`);
    svg.appendChild(probe);
    const box = probe.getBBox();
    probe.remove();
    const area = box.width * box.height;
    if (!best || area > best.area) {
      best = { area, x: box.x + box.width / 2, y: box.y + box.height / 2 };
    }
  }

  return best ? { x: best.x, y: best.y } : null;
}

function stopCardFlip(event: MouseEvent | PointerEvent) {
  event.stopPropagation();
}

type SkillsInformativeInteractiveMapProps = {
  variant?: "ian" | "other";
};

/** Natural Earth country outlines, painted by continent, with a hover overlay. */
export function SkillsInformativeInteractiveMap({ variant = "ian" }: SkillsInformativeInteractiveMapProps) {
  const rawId = useId().replace(/:/g, "");
  const shadowId = `map-shadow-${rawId}`;
  const oceanId = `map-ocean-${rawId}`;
  const isOther = variant === "other";
  const mapRootRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<Partial<Record<string, SVGPathElement | null>>>({});
  const [hoveredId, setHoveredId] = useState<InformativeMapContinentId | null>(null);
  const [overlayPos, setOverlayPos] = useState<OverlayPosition | null>(null);
  const [shareCenters, setShareCenters] = useState<Partial<Record<InformativeMapContinentId, ShareCenter>>>({});

  useLayoutEffect(() => {
    if (isOther) return;
    const next: Partial<Record<InformativeMapContinentId, ShareCenter>> = {};
    for (const continent of INFORMATIVE_MAP_CONTINENTS) {
      let minX = Number.POSITIVE_INFINITY;
      let minY = Number.POSITIVE_INFINITY;
      let maxX = Number.NEGATIVE_INFINITY;
      let maxY = Number.NEGATIVE_INFINITY;
      for (const name of continent.shareAnchors) {
        const anchor = anchorRefs.current[`${continent.id}:${name}`];
        if (!anchor) continue;
        const box = anchor.getBBox();
        minX = Math.min(minX, box.x);
        minY = Math.min(minY, box.y);
        maxX = Math.max(maxX, box.x + box.width);
        maxY = Math.max(maxY, box.y + box.height);
      }
      if (!Number.isFinite(minX)) continue;
      if (continent.id === "europe") {
        const russia = anchorRefs.current[`${continent.id}:Russia`];
        const landCenter = largestSubpathCenter(russia);
        if (landCenter) {
          next[continent.id] = landCenter;
          continue;
        }
      }
      next[continent.id] = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
    }
    setShareCenters(next);
  }, [isOther]);

  const hoveredContinent = findInformativeMapContinent(hoveredId);

  const updateOverlayPosition = useCallback((event: PointerEvent<SVGElement>) => {
    const root = mapRootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const padding = 12;
    const maxX = Math.max(padding, rect.width - 168);
    const maxY = Math.max(padding, rect.height - 120);
    setOverlayPos({
      x: Math.min(Math.max(event.clientX - rect.left + padding, padding), maxX),
      y: Math.min(Math.max(event.clientY - rect.top + padding, padding), maxY),
    });
  }, []);

  const onRegionEnter = useCallback(
    (id: InformativeMapContinentId, event: PointerEvent<SVGGElement>) => {
      setHoveredId(id);
      updateOverlayPosition(event);
    },
    [updateOverlayPosition],
  );

  const onRegionMove = useCallback(
    (id: InformativeMapContinentId, event: PointerEvent<SVGGElement>) => {
      if (hoveredId !== id) setHoveredId(id);
      updateOverlayPosition(event);
    },
    [hoveredId, updateOverlayPosition],
  );

  const onRegionLeave = useCallback(() => {
    setHoveredId(null);
    setOverlayPos(null);
  }, []);

  return (
    <div
      ref={mapRootRef}
      className={`skills-informative-map skills-informative-map--${variant} skills-informative-map--interactive${
        isOther ? " skills-informative-map--raised" : ""
      }`}
      onClick={stopCardFlip}
      onPointerDown={stopCardFlip}
    >
      <header className="skills-informative-map-toolbar">
        <p className="skills-informative-map-toolbar-label">2025 Continental Road Fatality Atlas</p>
        <p className="skills-informative-map-toolbar-value">
          {hoveredContinent ? hoveredContinent.label : "No region selected"}
        </p>
      </header>

      <div className="skills-informative-map-stage">
        <svg
          aria-label="World map by continent"
          className="skills-informative-map-svg"
          role="img"
          viewBox={`0 0 ${INFORMATIVE_MAP_VIEWBOX.width} ${INFORMATIVE_MAP_VIEWBOX.height}`}
        >
          {isOther ? (
            <defs>
              <linearGradient id={oceanId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#c5d0de" />
              </linearGradient>
              <filter height="130%" id={shadowId} width="130%" x="-15%" y="-12%">
                <feDropShadow dx="0" dy="7" floodColor="#0f172a" floodOpacity="0.38" stdDeviation="4.5" />
              </filter>
            </defs>
          ) : null}
          <rect
            aria-hidden
            className="skills-informative-map-ocean"
            height={INFORMATIVE_MAP_VIEWBOX.height}
            style={isOther ? { fill: `url(#${oceanId})` } : undefined}
            width={INFORMATIVE_MAP_VIEWBOX.width}
            x={0}
            y={0}
          />
          <g filter={isOther ? `url(#${shadowId})` : undefined}>
          {INFORMATIVE_MAP_CONTINENTS.map((continent) => {
            const isActive = hoveredId === continent.id;
            const isMuted = hoveredId !== null && !isActive;
            const countries = PATHS_BY_CONTINENT.get(continent.id) ?? [];
            return (
              <g
                key={continent.id}
                aria-label={continent.label}
                className={`skills-informative-map-region${isActive ? " skills-informative-map-region--active" : ""}${
                  isMuted ? " skills-informative-map-region--muted" : ""
                }`}
                tabIndex={0}
                onBlur={onRegionLeave}
                onFocus={(event) => {
                  setHoveredId(continent.id);
                  const root = mapRootRef.current;
                  if (!root) return;
                  const box = event.currentTarget.getBoundingClientRect();
                  const rect = root.getBoundingClientRect();
                  setOverlayPos({
                    x: box.left - rect.left + box.width * 0.35,
                    y: box.top - rect.top + box.height * 0.35,
                  });
                }}
                onPointerEnter={(event) => onRegionEnter(continent.id, event)}
                onPointerLeave={onRegionLeave}
                onPointerMove={(event) => onRegionMove(continent.id, event)}
              >
                {countries.map((country) => (
                  <path
                    key={country.name}
                    ref={
                      continent.shareAnchors.includes(country.name)
                        ? (node) => {
                            anchorRefs.current[`${continent.id}:${country.name}`] = node;
                          }
                        : undefined
                    }
                    d={country.d}
                    fill={
                      isOther
                        ? isActive
                          ? OTHER_HOVER[continent.id]
                          : INFORMATIVE_OTHER_FILL[continent.id]
                        : isActive
                          ? continent.hoverFill
                          : continent.fill
                    }
                    pointerEvents="all"
                    stroke={isOther ? (isActive ? "#111111" : "#F3C8C9") : continent.stroke}
                    strokeLinejoin="round"
                    strokeWidth={isOther && isActive ? 2.4 : 0.45}
                    vectorEffect={isOther && isActive ? "non-scaling-stroke" : undefined}
                  />
                ))}
              </g>
            );
          })}
          </g>
          {isOther
            ? null
            : INFORMATIVE_MAP_CONTINENTS.map((continent) => {
            if (hoveredId === continent.id) return null;
            const center = shareCenters[continent.id];
            if (!center) return null;
            return (
              <text
                key={`${continent.id}-share`}
                className="skills-informative-map-share"
                fill={SHARE_INK[continent.id]}
                x={center.x}
                y={center.y}
              >
                {continent.shareLabel}
              </text>
            );
          })}
        </svg>

        {hoveredContinent && overlayPos ? (
          <div
            aria-live="polite"
            className="skills-informative-map-overlay"
            role="status"
            style={{ left: overlayPos.x, top: overlayPos.y }}
          >
            <p className="skills-informative-map-overlay-title">{hoveredContinent.overlay.headline}</p>
            <dl className="skills-informative-map-overlay-dl">
              <dt>Fatality rate</dt>
              <dd>{hoveredContinent.overlay.fatalityRate}</dd>
              <dt>Share of deaths</dt>
              <dd>{hoveredContinent.overlay.deathsShare}</dd>
            </dl>
            <p className="skills-informative-map-overlay-note">{hoveredContinent.overlay.note}</p>
          </div>
        ) : null}
      </div>

      <ul className="skills-informative-map-region-legend">
        {INFORMATIVE_MAP_LEGEND_ORDER.map((continentId) => {
          const continent = findInformativeMapContinent(continentId);
          if (!continent) return null;
          return (
            <li key={continent.id} className="skills-informative-map-region-legend-item">
              <span
                aria-hidden
                className="skills-informative-map-region-legend-swatch"
                style={{ backgroundColor: isOther ? INFORMATIVE_OTHER_FILL[continent.id] : continent.fill }}
              />
              <span className="skills-informative-map-region-legend-text">{continent.legendLabel}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}