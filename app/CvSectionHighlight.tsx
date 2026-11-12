"use client";

import { useEffect } from "react";

const HIGHLIGHT_SECTION_IDS = new Set(["skills", "experiences", "projects"]);

const FLASH_MS = 900;
const SCROLL_SETTLE_MS = 400;

function flashSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  el.classList.remove("cv-section-flash");
  void el.offsetWidth;
  el.classList.add("cv-section-flash");

  window.setTimeout(() => {
    el.classList.remove("cv-section-flash");
  }, FLASH_MS);
}

/**
 * After in-page jumps to Skills / Experiences / Projects, briefly tints that section blue.
 */
export function CvSectionHighlight() {
  useEffect(() => {
    let scrollTimer: number | undefined;

    const scheduleFlash = (id: string) => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => flashSection(id), SCROLL_SETTLE_MS);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href^='#']");
      if (!link) return;

      const hash = link.getAttribute("href")?.slice(1);
      if (!hash || !HIGHLIGHT_SECTION_IDS.has(hash)) return;

      scheduleFlash(hash);
    };

    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (HIGHLIGHT_SECTION_IDS.has(hash)) scheduleFlash(hash);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.clearTimeout(scrollTimer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
