"use client";

import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { INFORMATIVE_MAP_COUNTRIES_GEO_URL } from "./informative-map-geo";
import { worldRegionFill } from "./informative-world-region-fill";
import {
  formatWorldRegionPercent,
  getWorldRegionPercent,
} from "./informative-world-region-data";
import { INFORMATIVE_WORLD_REGIONS } from "./informative-world-regions";
import type { InformativeWorldRegionId } from "./informative-world-regions";
import { resolveWorldRegionId } from "./informative-world-region-resolve";

type CountryGeoProperties = GeoJsonProperties & {
  iso?: string;
  name?: string;
  continent?: string;
  subregion?: string;
};

type SkillsInformativeInteractiveMapSectionProps = {
  side: "ian" | "other";
};

const MAP_WIDTH = 360;
const MAP_HEIGHT = 180;

function regionLabel(regionId: InformativeWorldRegionId): string {
  return INFORMATIVE_WORLD_REGIONS.find((region) => region.id === regionId)?.label ?? regionId;
}

/** World map colored by 10 regions (both cards). */
export function SkillsInformativeInteractiveMapSection({
  side,
}: SkillsInformativeInteractiveMapSectionProps) {
  const mapTitleId = useId();
  const [geo, setGeo] = useState<FeatureCollection<Geometry, CountryGeoProperties> | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeRegionId, setActiveRegionId] = useState<InformativeWorldRegionId | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(INFORMATIVE_MAP_COUNTRIES_GEO_URL)
      .then((response) => {
        if (!response.ok) throw new Error("not ok");
        return response.json() as Promise<FeatureCollection<Geometry, CountryGeoProperties>>;
      })
      .then((data) => {
        if (!cancelled) setGeo(data);
      })
      .catch(() => {
        if (!cancelled) setLoadError("World map could not be loaded.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const countries = useMemo(() => {
    if (!geo?.features.length) return [];

    const projection = geoNaturalEarth1().fitSize([MAP_WIDTH, MAP_HEIGHT], geo);
    const pathGenerator = geoPath(projection);

    return geo.features
      .map((feature) => {
        const iso = feature.properties?.iso;
        if (!iso) return null;

        const path = pathGenerator(feature);
        if (!path) return null;

        const regionId = resolveWorldRegionId({
          iso,
          continent: feature.properties?.continent,
          subregion: feature.properties?.subregion,
        });

        return {
          iso,
          name: feature.properties?.name ?? iso,
          path,
          regionId,
        };
      })
      .filter((country): country is NonNullable<typeof country> => country !== null);
  }, [geo]);

  const onRegionEnter = useCallback((regionId: InformativeWorldRegionId) => {
    setActiveRegionId(regionId);
  }, []);

  const onRegionLeave = useCallback(() => {
    setActiveRegionId(null);
  }, []);

  const stopFlipTap = useCallback((event: React.PointerEvent | React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  const activePercent = activeRegionId ? getWorldRegionPercent(side, activeRegionId) : null;

  return (
    <div
      className={`skills-informative-map skills-informative-map--${side}`}
      onClick={stopFlipTap}
      onPointerDown={stopFlipTap}
    >
      <div className="skills-informative-map-toolbar">
        <span className="skills-informative-map-toolbar-label" id={mapTitleId}>
          Regional rate (%)
        </span>
        {activeRegionId && activePercent !== null ? (
          <span className="skills-informative-map-toolbar-value">
            {regionLabel(activeRegionId)} ({activeRegionId}): {formatWorldRegionPercent(activePercent)}
          </span>
        ) : (
          <span className="skills-informative-map-toolbar-hint">Hover or tap a region</span>
        )}
      </div>

      {loadError ? (
        <p className="skills-informative-map-status skills-informative-map-status--error" role="alert">
          {loadError}
        </p>
      ) : !geo ? (
        <p className="skills-informative-map-status">Loading map…</p>
      ) : (
        <svg
          aria-labelledby={mapTitleId}
          className="skills-informative-map-svg"
          role="img"
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        >
          <desc>World map with ten color-coded macro regions.</desc>
          <rect className="skills-informative-map-ocean" height={MAP_HEIGHT} width={MAP_WIDTH} />
          {countries.map((country) => {
            const isActive = activeRegionId === country.regionId;
            const muted = activeRegionId !== null && !isActive;

            return (
              <path
                key={country.iso}
                className={`skills-informative-map-region${
                  isActive ? " skills-informative-map-region--active" : ""
                }${muted ? " skills-informative-map-region--muted" : ""}`}
                d={country.path}
                data-region-id={country.regionId}
                fill={worldRegionFill(side, country.regionId)}
                stroke={side === "ian" ? "#29405c" : "#c92d45"}
                strokeWidth={isActive ? 0.75 : 0.28}
                tabIndex={0}
                onBlur={onRegionLeave}
                onClick={(event) => {
                  event.stopPropagation();
                  onRegionEnter(country.regionId);
                }}
                onFocus={() => onRegionEnter(country.regionId)}
                onMouseEnter={() => onRegionEnter(country.regionId)}
                onMouseLeave={onRegionLeave}
                onPointerDown={(event) => event.stopPropagation()}
              >
                <title>
                  {`${country.name} · ${regionLabel(country.regionId)} [${country.regionId}]: ${formatWorldRegionPercent(getWorldRegionPercent(side, country.regionId))}`}
                </title>
              </path>
            );
          })}
        </svg>
      )}

      <ul aria-label="World region legend" className="skills-informative-map-region-legend">
        {INFORMATIVE_WORLD_REGIONS.map((region) => (
          <li key={region.id} className="skills-informative-map-region-legend-item">
            <span
              className="skills-informative-map-region-legend-swatch"
              style={{ background: worldRegionFill(side, region.id) }}
            />
            <span className="skills-informative-map-region-legend-text">
              <code>{region.id}</code> —{" "}
              {formatWorldRegionPercent(getWorldRegionPercent(side, region.id))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
