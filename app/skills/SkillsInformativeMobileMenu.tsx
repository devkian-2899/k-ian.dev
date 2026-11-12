"use client";

import { useEffect, useId, useRef, useState } from "react";

const INFORMATIVE_MENU_ITEMS = [
  "Font & Color",
  "Interactive Map",
  "Graphs & Charts",
  "Data Analysis",
  "Reports & Downloads",
] as const;

type SkillsInformativeMobileMenuProps = {
  side: "ian" | "other";
};

/** Informative mobile nav — hamburger + dropdown (not shown on desktop). */
export function SkillsInformativeMobileMenu({ side }: SkillsInformativeMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (wrapRef.current?.contains(event.target as Node)) return;
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

  return (
    <div
      ref={wrapRef}
      className={`skills-wco-mobile-menu-wrap skills-wco-mobile-menu-wrap--${side}`}
    >
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

      {open ? (
        <ul className="skills-wco-mobile-dropdown" id={menuId} role="menu">
          {INFORMATIVE_MENU_ITEMS.map((label) => (
            <li key={label} role="none">
              <button
                type="button"
                className="skills-wco-mobile-dropdown-item"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
