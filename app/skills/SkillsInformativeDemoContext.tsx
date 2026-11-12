"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import type { InformativeNavItem } from "./informative-nav-items";
import { getInformativeSectionId } from "./informative-section-ids";

type InformativeDemoNav = {
  scrollToNavItem: (item: InformativeNavItem) => void;
};

const InformativeDemoContext = createContext<InformativeDemoNav | null>(null);

export function useInformativeDemoNav(): InformativeDemoNav {
  const context = useContext(InformativeDemoContext);
  if (!context) {
    throw new Error("useInformativeDemoNav must be used inside SkillsInformativeDemoProvider.");
  }
  return context;
}

type SkillsInformativeDemoProviderProps = {
  children: ReactNode;
};

/** Scrollable card panel + nav scroll target for Informative demo sections. */
export function SkillsInformativeDemoProvider({ children }: SkillsInformativeDemoProviderProps) {
  const scrollRootRef = useRef<HTMLDivElement>(null);

  const scrollToNavItem = useCallback((item: InformativeNavItem) => {
    const root = scrollRootRef.current;
    if (!root) return;

    const sectionId = getInformativeSectionId(item);
    const section = root.querySelector(`#${CSS.escape(sectionId)}`);
    if (section instanceof HTMLElement) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <InformativeDemoContext.Provider value={{ scrollToNavItem }}>
      <div ref={scrollRootRef} className="skills-inner-panel skills-inner-panel--ui-stack">
        {children}
      </div>
    </InformativeDemoContext.Provider>
  );
}
