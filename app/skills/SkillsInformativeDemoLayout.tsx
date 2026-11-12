"use client";

import { SkillsInformativeDemoProvider } from "./SkillsInformativeDemoContext";
import { SkillsInformativeDemoSections } from "./SkillsInformativeDemoSections";
import {
  SkillsInformativeIanWcoStrip,
  SkillsInformativeOtherWcoLogo,
} from "./SkillsInformativeWcoUi";

type SkillsInformativeDemoLayoutProps = {
  side: "ian" | "other";
};

/** Informative mini-site: header/nav + scrollable sections inside the card. */
export function SkillsInformativeDemoLayout({ side }: SkillsInformativeDemoLayoutProps) {
  return (
    <SkillsInformativeDemoProvider>
      {side === "ian" ? <SkillsInformativeIanWcoStrip /> : <SkillsInformativeOtherWcoLogo />}
      <SkillsInformativeDemoSections side={side} />
    </SkillsInformativeDemoProvider>
  );
}
