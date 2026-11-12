import type { Metadata } from "next";
import { SkillsPageContent } from "./SkillsPageContent";

export const metadata: Metadata = {
  title: "Skills — Kaung Khant",
  description: "Technical skills — interactive cards.",
};

/** Two large skill card areas; content lives in each card’s data + UI files. */
export default function SkillsPage() {
  return (
    <div id="top" className="skills-page-shell">
      <header className="skills-top-banner print:hidden">
        <a className="skills-top-banner-link cv-link" href="/">
          ← Back to CV
        </a>
      </header>
      <article className="skills-page-paper cv-paper flex w-full flex-col text-[11pt] leading-snug text-black print:shadow-none">
        <h1 className="skills-page-title shrink-0">
          Beyond the Résumé : Explore My Value
        </h1>
        <hr aria-hidden="true" className="skills-page-title-rule" />

        <SkillsPageContent />
      </article>
    </div>
  );
}
