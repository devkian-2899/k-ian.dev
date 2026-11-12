"use client";

import { INFORMATIVE_NAV_ITEMS } from "./informative-nav-items";

type SkillsInformativeDesktopNavProps = {
  side: "ian" | "other";
};

/** Desktop horizontal nav (mobile uses hamburger). Actions wired later. */
export function SkillsInformativeDesktopNav({ side }: SkillsInformativeDesktopNavProps) {
  const onNavClick = (label: string) => {
    void label;
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
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
