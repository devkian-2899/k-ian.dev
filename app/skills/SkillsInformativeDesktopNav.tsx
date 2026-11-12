"use client";

import { useInformativeDemoNav } from "./SkillsInformativeDemoContext";
import { INFORMATIVE_NAV_ITEMS, getInformativeNavLabel } from "./informative-nav-items";
import type { InformativeNavItem } from "./informative-nav-items";

type SkillsInformativeDesktopNavProps = {
  side: "ian" | "other";
};

/** Desktop horizontal nav — scrolls to in-card section. */
export function SkillsInformativeDesktopNav({ side }: SkillsInformativeDesktopNavProps) {
  const { scrollToNavItem } = useInformativeDemoNav();
  const onNavClick = (label: InformativeNavItem) => {
    scrollToNavItem(label);
  };

  return (
    <nav
      aria-label="Informative sections"
      className={`skills-wco-desktop-nav skills-wco-desktop-nav--${side}`}
    >
      <ul className="skills-wco-desktop-nav-list">
        {INFORMATIVE_NAV_ITEMS.map((label) => (
          <li key={label} className="skills-wco-desktop-nav-item">
            <button
              type="button"
              className="skills-wco-desktop-nav-link"
              onClick={() => onNavClick(label)}
            >
              {getInformativeNavLabel(side, label)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
