"use client";

import { createContext, useContext, type ReactNode } from "react";

type SkillsDeckDesktopExpandContextValue = {
  expanded: boolean;
  toggle: () => void;
};

const SkillsDeckDesktopExpandContext = createContext<SkillsDeckDesktopExpandContextValue | null>(
  null,
);

type SkillsDeckDesktopExpandProviderProps = {
  children: ReactNode;
  expanded: boolean;
  toggle: () => void;
};

export function SkillsDeckDesktopExpandProvider({
  children,
  expanded,
  toggle,
}: SkillsDeckDesktopExpandProviderProps) {
  return (
    <SkillsDeckDesktopExpandContext.Provider value={{ expanded, toggle }}>
      {children}
    </SkillsDeckDesktopExpandContext.Provider>
  );
}

/** Desktop Devkian pane full-width expand (provided by SkillsCardsDeck). */
export function useSkillsDeckDesktopExpand() {
  return useContext(SkillsDeckDesktopExpandContext);
}