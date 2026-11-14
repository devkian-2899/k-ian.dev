"use client";

import Image from "next/image";
import { SkillsCodeUiToggleButton } from "./SkillsCodeUiToggleButton";
import { useSkillsDeckDesktopExpand } from "./SkillsDeckDesktopExpandContext";

type SkillsCardTopBarProps = {
  onShowCodeChange?: (showCode: boolean) => void;
  showCode?: boolean;
  side: "ian" | "other";
};

const IAN_ICON = "/images/Icon.png";

function SkillsCardExpandGlyph() {
  return (
    <svg aria-hidden className="skills-card-topbar-expand-glyph" fill="none" height="12" viewBox="0 0 16 16" width="12">
      <path
        d="M2.75 5.5V2.75H5.5M10.5 2.75H13.25V5.5M13.25 10.5V13.25H10.5M5.5 13.25H2.75V10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function SkillsCardMinimizeGlyph() {
  return (
    <svg aria-hidden className="skills-card-topbar-expand-glyph" fill="none" height="12" viewBox="0 0 16 16" width="12">
      <path
        d="M5.5 5.25H3.25V3.25M10.5 5.25h2.25V3.25M10.5 10.75h2.25v2.25M5.5 10.75H3.25v2.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

/** Minimized → expand affordance; full-width → minimize affordance. */
function SkillsCardExpandIcon({ expanded }: { expanded: boolean }) {
  return expanded ? <SkillsCardMinimizeGlyph /> : <SkillsCardExpandGlyph />;
}

/** Fixed strip on the blue card shell — does not flip with inner UI/code. */
export function SkillsCardTopBar({ side, showCode, onShowCodeChange }: SkillsCardTopBarProps) {
  const caption = side === "ian" ? "Drivkian Development" : "Other's Development";
  const desktopExpand = useSkillsDeckDesktopExpand();
  const showCodeToggle =
    side === "ian" && showCode !== undefined && onShowCodeChange !== undefined;

  return (
    <div className="skills-card-topbar">
      {showCodeToggle ? (
        <SkillsCodeUiToggleButton
          className="skills-card-topbar-code-toggle"
          showCode={showCode}
          onShowCodeChange={onShowCodeChange}
        />
      ) : (
        <span aria-hidden className="skills-card-topbar-expand-spacer" />
      )}

      <div className="skills-card-topbar-brand">
        {side === "ian" ? (
          <Image
            alt=""
            aria-hidden
            className="skills-card-topbar-icon"
            height={26}
            src={IAN_ICON}
            width={26}
          />
        ) : (
          <span aria-hidden="true" className="skills-card-topbar-icon skills-card-topbar-icon--code">
            &lt;/&gt;
          </span>
        )}
        <p className="skills-card-topbar-caption">{caption}</p>
      </div>

      {side === "ian" && desktopExpand ? (
        <button
          type="button"
          aria-expanded={desktopExpand.expanded}
          aria-label={
            desktopExpand.expanded
              ? "Minimize to see comparison with others"
              : "Expand to get full experiences"
          }
          className={`skills-card-topbar-expand-btn${
            desktopExpand.expanded
              ? " skills-card-topbar-expand-btn--expanded"
              : " skills-card-topbar-expand-btn--minimized"
          }`}
          onClick={desktopExpand.toggle}
        >
          <span className="skills-card-topbar-expand-hint">
            {desktopExpand.expanded
              ? "Minimize to see comparison with others"
              : "Expand to get full experiences"}
          </span>
          <SkillsCardExpandIcon expanded={desktopExpand.expanded} />
        </button>
      ) : (
        <span aria-hidden className="skills-card-topbar-expand-spacer" />
      )}
    </div>
  );
}