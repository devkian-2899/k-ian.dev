"use client";

import type { PointerEvent } from "react";
import {
  INFORMATIVE_MAP_CONTINENTS,
  INFORMATIVE_MAP_LEGEND_ORDER,
  INFORMATIVE_OTHER_FILL,
} from "./informative-map-continents-data";

const IAN_UI_COLORS = [
  { name: "Ink", hex: "#29405C", note: "Titles, navigation, and map labels." },
  { name: "Hint", hex: "#2563EB", note: "The expand hint under Reports." },
  { name: "Muted", hex: "#64748B", note: "Empty states and quiet supporting lines." },
  { name: "Paper", hex: "#FFFFFF", note: "Card surface behind the sections." },
] as const;

const OTHER_UI_COLORS = [
  { name: "Title", hex: "#C92D45", note: "Section titles, navigation, and the atlas title." },
  { name: "Active", hex: "#E85F5F", note: "The selected navigation item." },
  { name: "Hover", hex: "#F27474", note: "Navigation when the pointer is over it." },
  { name: "Rule", hex: "#000000", note: "The border around the data table." },
  { name: "Paper", hex: "#FFFFFF", note: "Card surface behind the sections." },
] as const;

function stopCardFlip(event: PointerEvent) {
  event.stopPropagation();
}

type SkillsInformativeFontColorDocsProps = {
  side: "ian" | "other";
};

/** Matching documentation layout. Each card records its own type, color, and opinion. */
export function SkillsInformativeFontColorDocs({ side }: SkillsInformativeFontColorDocsProps) {
  const isOther = side === "other";
  const uiColors = isOther ? OTHER_UI_COLORS : IAN_UI_COLORS;
  const continents = INFORMATIVE_MAP_LEGEND_ORDER.map((id) =>
    INFORMATIVE_MAP_CONTINENTS.find((continent) => continent.id === id),
  ).filter((continent) => continent != null);

  return (
    <div className="skills-font-docs" onPointerDown={stopCardFlip}>
      <p className="skills-font-docs-lead">Open a topic to read how this card is set.</p>

      <details className="skills-font-docs-item">
        <summary>Typefaces</summary>
        <div className="skills-font-docs-panel">
          {isOther ? (
            <>
              <p className="skills-font-docs-body">
                Two families cover every line on this card. Titles use a serif. The data and controls use a sans.
              </p>
              <div className="skills-font-docs-specimen">
                <p className="skills-font-docs-role">Titles</p>
                <p className="skills-font-docs-sample skills-font-docs-sample--times">Times New Roman</p>
                <p className="skills-font-docs-body">
                  Section titles, the card caption, the atlas title, and the line-chart title.
                </p>
              </div>
              <div className="skills-font-docs-specimen">
                <p className="skills-font-docs-role">Data</p>
                <p className="skills-font-docs-sample skills-font-docs-sample--helvetica">Helvetica</p>
                <p className="skills-font-docs-body">
                  Navigation, legends, table figures, chart labels, and comparison controls.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="skills-font-docs-body">
                Two families cover every line on this card. Primary text carries the data. Secondary text carries the
                supporting sentences.
              </p>
              <div className="skills-font-docs-specimen">
                <p className="skills-font-docs-role">Primary</p>
                <p className="skills-font-docs-sample skills-font-docs-sample--plex">IBM Plex Sans</p>
                <p className="skills-font-docs-body">
                  Section titles, navigation, the atlas title, legends, table figures, and chart labels.
                </p>
              </div>
              <div className="skills-font-docs-specimen">
                <p className="skills-font-docs-role">Secondary</p>
                <p className="skills-font-docs-sample skills-font-docs-sample--merri">Merriweather</p>
                <p className="skills-font-docs-body">
                  The card caption, download prompt, expand hint, table notes, and comparison detail.
                </p>
              </div>
            </>
          )}
        </div>
      </details>

      <details className="skills-font-docs-item">
        <summary>Interface color</summary>
        <div className="skills-font-docs-panel">
          <ul className="skills-font-docs-swatches">
            {uiColors.map((color) => (
              <li key={color.name}>
                <span
                  className="skills-font-docs-chip"
                  style={{
                    backgroundColor: color.hex,
                    borderColor: color.hex === "#FFFFFF" || color.hex === "#000000" ? "#111111" : undefined,
                  }}
                />
                <span className="skills-font-docs-swatch-copy">
                  <span className="skills-font-docs-swatch-name">
                    {color.name} <span className="skills-font-docs-hex">{color.hex}</span>
                  </span>
                  <span className="skills-font-docs-body">{color.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <details className="skills-font-docs-item">
        <summary>Continent palette</summary>
        <div className="skills-font-docs-panel">
          <p className="skills-font-docs-body">
            {isOther
              ? "Map, donut, and bars share one light red ramp, darkest where the share is largest. Antarctica stays white and is not a filled slice."
              : "Map, donut, and bars share these fills. Antarctica has no share, so it stays unfilled."}
          </p>
          <ul className="skills-font-docs-swatches">
            {continents.map((continent) => {
              const fill = isOther ? INFORMATIVE_OTHER_FILL[continent.id] : continent.fill;
              const shown = fill === "transparent" ? "transparent" : fill;
              return (
                <li key={continent.id}>
                  <span
                    className="skills-font-docs-chip"
                    style={{
                      backgroundColor: fill === "transparent" ? "#ffffff" : fill,
                      borderColor: isOther ? "#F3C8C9" : continent.stroke,
                    }}
                  />
                  <span className="skills-font-docs-swatch-copy">
                    <span className="skills-font-docs-swatch-name">
                      {continent.label} <span className="skills-font-docs-hex">{shown}</span>
                    </span>
                    <span className="skills-font-docs-body">Share {continent.shareLabel}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </details>

      <article className="skills-font-docs-essay">
        {isOther ? (
          <>
            <h3 className="skills-font-docs-heading">
              Others&apos; Development — Times New Roman + Helvetica with Creative 3D Design
            </h3>
            <p className="skills-font-docs-body">
              The combination of Times New Roman and Helvetica is not inherently unsuitable, but it may lack a consistent
              visual identity if the fonts are not applied with a clear typographic hierarchy.
            </p>
            <p className="skills-font-docs-body">
              Additionally, the Creative 3D design focuses heavily on visual presentation rather than information
              delivery. Excessive animations and decorative elements may distract users, reduce readability, and
              complicate navigation.
            </p>
            <p className="skills-font-docs-body">
              Although this approach may work well for creative portfolios or entertainment websites, it is less suitable
              for an informative, research-focused platform where clarity, accessibility, and efficient data exploration
              should take priority.
            </p>
            <p className="skills-font-docs-body">
              On this card, Times New Roman is kept for titles and Helvetica for the data, so the two faces do have a
              hierarchy. The map, charts, and comparison still use raised shadows and tilt, which puts the visual effect
              in front of the numbers.
            </p>
          </>
        ) : (
          <>
            <h3 className="skills-font-docs-heading">My Development — IBM Plex Sans + Merriweather</h3>
            <p className="skills-font-docs-body">
              I selected IBM Plex Sans and Merriweather to create a professional, modern, and research-focused
              informative website. IBM Plex Sans improves readability across navigation, statistical charts, and
              interactive components, while Merriweather provides an academic and trustworthy appearance for titles and
              reports.
            </p>
            <p className="skills-font-docs-body">
              My design prioritizes information accessibility, clear navigation, readability, and user experience,
              allowing visitors to explore complex data without unnecessary distractions.
            </p>
            <p className="skills-font-docs-body">
              On this card, IBM Plex Sans is the face for navigation, the atlas title, legends, charts, and table
              figures. Merriweather is reserved for the caption, prompts, notes, and supporting sentences, so the
              research voice stays distinct from the data.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
