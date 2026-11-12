import { Fragment } from "react";
import { INFORMATIVE_NAV_ITEMS, getInformativeNavLabel } from "./informative-nav-items";
import { getInformativeSectionId } from "./informative-section-ids";
import { SkillsInformativeInteractiveMapSection } from "./SkillsInformativeInteractiveMapSection";
import { SkillsInformativeReportsSection } from "./SkillsInformativeReportsSection";

type SkillsInformativeDemoSectionsProps = {
  side: "ian" | "other";
};

/** In-card demo sections — one per nav item. */
export function SkillsInformativeDemoSections({ side }: SkillsInformativeDemoSectionsProps) {
  return (
    <div className="skills-informative-demo">
      {INFORMATIVE_NAV_ITEMS.map((label) => {
        const sectionId = getInformativeSectionId(label);
        const titleId = `${sectionId}-title`;
        const isReports = label === "Reports";
        const isInteractiveMap = label === "Interactive Map";
        return (
          <Fragment key={label}>
            <section
              aria-label={isReports ? "Reports" : undefined}
              aria-labelledby={isReports ? undefined : titleId}
              className={`skills-informative-section skills-informative-section--${side}`}
              id={sectionId}
            >
              {isReports ? null : (
                <h2 className="skills-informative-section-title" id={titleId}>
                  {getInformativeNavLabel(side, label)}
                </h2>
              )}
              {isReports ? (
                <SkillsInformativeReportsSection side={side} />
              ) : isInteractiveMap ? (
                <SkillsInformativeInteractiveMapSection side={side} />
              ) : (
                <p className="skills-informative-section-placeholder">Demo content — UI coming soon.</p>
              )}
            </section>
            {isReports ? <hr className="skills-informative-demo-divider" /> : null}
          </Fragment>
        );
      })}
    </div>
  );
}
