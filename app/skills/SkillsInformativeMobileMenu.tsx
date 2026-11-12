"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useInformativeDemoNav } from "./SkillsInformativeDemoContext";
import { INFORMATIVE_NAV_ITEMS, getInformativeNavLabel } from "./informative-nav-items";
import type { InformativeNavItem } from "./informative-nav-items";

type SkillsInformativeMobileNavProps = {
  logo: ReactNode;
  side: "ian" | "other";
};

/** Informative mobile: logo row + in-flow dropdown (avoids clip inside card). */
export function SkillsInformativeMobileNav({ side, logo }: SkillsInformativeMobileNavProps) {
  const { scrollToNavItem } = useInformativeDemoNav();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onNavClick = (label: InformativeNavItem) => {
    scrollToNavItem(label);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`skills-wco-mobile-shell skills-wco-mobile-shell--${side}${
        open ? " skills-wco-mobile-shell--open" : ""
      }`}
    >
      <div className="skills-wco-mobile-top-row">
        <div className="skills-wco-mobile-logo-slot">{logo}</div>
        <button
          type="button"
          aria-controls={menuId}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`skills-wco-hamburger skills-wco-hamburger--${side}${
            open ? " skills-wco-hamburger--open" : ""
          }`}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="skills-wco-hamburger-bar" />
          <span className="skills-wco-hamburger-bar" />
          <span className="skills-wco-hamburger-bar" />
        </button>
      </div>

      {open ? (
        <ul
          className={`skills-wco-mobile-dropdown skills-wco-mobile-dropdown--flow skills-wco-mobile-dropdown--${side}`}
          id={menuId}
          role="menu"
        >
          {INFORMATIVE_NAV_ITEMS.map((label) => (
            <li key={label} role="none">
              <button
                type="button"
                className="skills-wco-mobile-dropdown-item"
                role="menuitem"
                onClick={() => onNavClick(label)}
              >
                {getInformativeNavLabel(side, label)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
