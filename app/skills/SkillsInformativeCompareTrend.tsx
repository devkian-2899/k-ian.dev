"use client";

import { useId, useState, type PointerEvent } from "react";
import { INFORMATIVE_OTHER_FILL, type InformativeMapContinent } from "./informative-map-continents-data";

type TrendPoint = {
  high: number;
  low: number;
  value: number;
  year: number;
};

const YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] as const;

const VIEW = { height: 280, width: 680 };
const PAD = { bottom: 36, left: 58, right: 18, top: 12 };

function stopCardFlip(event: PointerEvent) {
  event.stopPropagation();
}

export function continentFatalityRate(continent: InformativeMapContinent): number | null {
  const match = continent.overlay.fatalityRate.match(/^(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

export function continentBarColor(continent: InformativeMapContinent): string {
  const source = continent.fill.startsWith("#") ? continent.fill : continent.stroke;
  return source.length >= 7 ? source.slice(0, 7) : source;
}

/** Deterministic 2016–2025 path that ends on the continent’s published fatality rate. */
export function fatalityTrend(continent: InformativeMapContinent): TrendPoint[] {
  const rate = continentFatalityRate(continent);
  if (rate === null) return [];

  const seed = [...continent.id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const peakLift = 0.16 + (seed % 13) / 100;
  const wave = ((seed % 5) - 2) * 0.012;
  const band = Math.round(Math.max(rate * 0.07, 0.4) * 10) / 10;

  return YEARS.map((year, index) => {
    const t = index / (YEARS.length - 1);
    const eased = 1 - (1 - t) ** 1.35;
    const pandemic = year === 2020 ? rate * 0.035 : year === 2021 ? rate * 0.02 : 0;
    const raw =
      index === YEARS.length - 1
        ? rate
        : rate * (1 + peakLift) * (1 - eased) + rate * eased + pandemic + Math.sin(t * Math.PI * 2) * rate * wave;
    const value = Math.round(raw * 10) / 10;
    return {
      year,
      value,
      low: Math.max(0, Math.round((value - band) * 10) / 10),
      high: Math.round((value + band) * 10) / 10,
    };
  });
}

function lineCommand(points: { x: number; y: number }[]): string {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
}

type SkillsInformativeCompareTrendProps = {
  left: InformativeMapContinent;
  right: InformativeMapContinent;
  variant?: "ian" | "other";
};

/** Time-series fatality chart for the two continents selected in the comparison. */
export function SkillsInformativeCompareTrend({ left, right, variant = "ian" }: SkillsInformativeCompareTrendProps) {
  const labelId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const leftSeries = fatalityTrend(left);
  const rightSeries = fatalityTrend(right);
  const seriesColor = (continent: InformativeMapContinent) =>
    variant === "other" ? INFORMATIVE_OTHER_FILL[continent.id] : continentBarColor(continent);
  const leftColor = seriesColor(left);
  const rightColor =
    seriesColor(right).toLowerCase() === leftColor.toLowerCase() && left.id !== right.id
      ? "#9f1239"
      : seriesColor(right);

  const highs = [...leftSeries, ...rightSeries].map((point) => point.high);
  const yTop = Math.max(5, Math.ceil((Math.max(0, ...highs) * 1.08) / 5) * 5);
  const plotWidth = VIEW.width - PAD.left - PAD.right;
  const plotHeight = VIEW.height - PAD.top - PAD.bottom;
  const xAt = (index: number) => PAD.left + (index / (YEARS.length - 1)) * plotWidth;
  const yAt = (value: number) => PAD.top + plotHeight - (value / yTop) * plotHeight;

  const ticks = Array.from({ length: yTop / 5 + 1 }, (_, index) => index * 5);
  const xLabelYears = YEARS.filter((year) => year % 2 === 0);

  const toPoints = (series: TrendPoint[], key: "value" | "low" | "high") =>
    series.map((point, index) => ({ x: xAt(index), y: yAt(point[key]) }));

  const bandPath = (series: TrendPoint[]) => {
    const high = toPoints(series, "high");
    const low = toPoints(series, "low");
    if (high.length === 0) return "";
    const back = [...low].reverse();
    return `${lineCommand(high)} ${back.map((point) => `L${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ")} Z`;
  };

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const viewX = ((event.clientX - bounds.left) / bounds.width) * VIEW.width;
    const index = Math.round(((viewX - PAD.left) / plotWidth) * (YEARS.length - 1));
    setHoverIndex(Math.min(YEARS.length - 1, Math.max(0, index)));
  };

  const hover = hoverIndex === null ? null : YEARS[hoverIndex];
  const tooltipLeft = hoverIndex === null ? 0 : (xAt(hoverIndex) / VIEW.width) * 100;
  const placeLeft = hoverIndex !== null && hoverIndex > YEARS.length * 0.62;

  return (
    <div className={`skills-informative-trend${variant === "other" ? " skills-informative-trend--raised" : ""}`}>
      <p className="skills-informative-trend-title" id={labelId}>
        Road fatality rate per 100,000, 2016–2025
      </p>
      {leftSeries.length === 0 && rightSeries.length === 0 ? (
        <p className="skills-informative-trend-empty">No fatality rate to plot for this pair.</p>
      ) : (
        <div className="skills-informative-trend-plot">
          <svg
            aria-labelledby={labelId}
            className="skills-informative-trend-svg"
            data-left-end={leftSeries.at(-1)?.value ?? "na"}
            data-right-end={rightSeries.at(-1)?.value ?? "na"}
            role="img"
            viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
            onPointerDown={stopCardFlip}
            onPointerLeave={() => setHoverIndex(null)}
            onPointerMove={onMove}
          >
            {ticks.map((tick) => (
              <g key={tick}>
                <line
                  stroke="rgba(148, 163, 184, 0.28)"
                  x1={PAD.left}
                  x2={VIEW.width - PAD.right}
                  y1={yAt(tick)}
                  y2={yAt(tick)}
                />
                <text fill="#94a3b8" fontSize="12" textAnchor="end" x={PAD.left - 8} y={yAt(tick) + 4}>
                  {tick}
                </text>
              </g>
            ))}
            <text
              fill="#94a3b8"
              fontSize="12"
              textAnchor="middle"
              transform={`rotate(-90 16 ${PAD.top + plotHeight / 2})`}
              x="16"
              y={PAD.top + plotHeight / 2}
            >
              Fatality rate
            </text>
            {xLabelYears.map((year) => {
              const index = YEARS.indexOf(year);
              return (
                <text key={year} fill="#94a3b8" fontSize="12" textAnchor="middle" x={xAt(index)} y={VIEW.height - 10}>
                  {year}
                </text>
              );
            })}
            {leftSeries.length > 0 ? <path d={bandPath(leftSeries)} fill={leftColor} opacity="0.22" /> : null}
            {rightSeries.length > 0 ? <path d={bandPath(rightSeries)} fill={rightColor} opacity="0.22" /> : null}
            {leftSeries.length > 0 ? (
              <path d={lineCommand(toPoints(leftSeries, "value"))} fill="none" stroke={leftColor} strokeWidth="2.5" />
            ) : null}
            {rightSeries.length > 0 ? (
              <path d={lineCommand(toPoints(rightSeries, "value"))} fill="none" stroke={rightColor} strokeWidth="2.5" />
            ) : null}
            {hoverIndex !== null ? (
              <line
                stroke="rgba(226, 232, 240, 0.45)"
                x1={xAt(hoverIndex)}
                x2={xAt(hoverIndex)}
                y1={PAD.top}
                y2={PAD.top + plotHeight}
              />
            ) : null}
            {[
              { name: "a", color: leftColor, series: leftSeries },
              { name: "b", color: rightColor, series: rightSeries },
            ].map(({ name, color, series }) =>
              series.map((point, index) => (
                <circle
                  key={`${name}-${point.year}`}
                  cx={xAt(index)}
                  cy={yAt(point.value)}
                  fill={color}
                  r={hoverIndex === index ? 5.5 : 3.4}
                  stroke={hoverIndex === index ? "#f8fafc" : color}
                  strokeWidth={hoverIndex === index ? 2 : 0}
                />
              )),
            )}
          </svg>
          {hover !== null && hoverIndex !== null ? (
            <div
              className="skills-informative-trend-tooltip"
              style={{ left: `${tooltipLeft}%`, transform: placeLeft ? "translate(calc(-100% - 10px), 8px)" : "translate(10px, 8px)" }}
            >
              <p>{hover}</p>
              {[
                { name: "a", color: leftColor, continent: left, series: leftSeries },
                { name: "b", color: rightColor, continent: right, series: rightSeries },
              ].map(({ name, color, continent, series }) => (
                <p key={name}>
                  <span style={{ backgroundColor: color }} />
                  {continent.label}
                  <strong>{series[hoverIndex] ? series[hoverIndex].value.toFixed(1) : "N/A"}</strong>
                </p>
              ))}
            </div>
          ) : null}
        </div>
      )}
      <ul className="skills-informative-trend-legend">
        <li>
          <span style={{ backgroundColor: leftColor }} />
          {left.label}
        </li>
        <li>
          <span style={{ backgroundColor: rightColor }} />
          {right.label}
        </li>
      </ul>
    </div>
  );
}
