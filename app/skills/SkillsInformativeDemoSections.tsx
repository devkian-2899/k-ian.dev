import { Fragment } from "react";
import { INFORMATIVE_NAV_ITEMS, getInformativeNavLabel } from "./informative-nav-items";
import { getInformativeSectionId } from "./informative-section-ids";
import { SkillsInformativeContinentCompare } from "./SkillsInformativeContinentCompare";
import { SkillsInformativeDataTable } from "./SkillsInformativeDataTable";
import { SkillsInformativeVisualData } from "./SkillsInformativeVisualData";
import { SkillsInformativeMapSection } from "./SkillsInformativeMapSection";
import { SkillsInformativeFontColorDocs } from "./SkillsInformativeFontColorDocs";
import { SkillsInformativeReportsSection } from "./SkillsInformativeReportsSection";

type SkillsInformativeDemoSectionsProps = {
  side: "ian" | "other";
};

/** In-card demo sections — one per nav item. */
export function SkillsInformativeDemoSections({ side }: SkillsInformativeDemoSectionsProps) {
  return (
    <div className="skills-informative-demo">
      {INFORMATIVE_NAV_ITEMS.map((label, index) => {
        const sectionId = getInformativeSectionId(label);
        const titleId = `${sectionId}-title`;
        const isReports = label === "Reports";
        const isInteractiveMap = label === "Interactive Map";
        const isVisualData = label === "Graphs & Charts";
        const isDataAnalysis = label === "Data Analysis";
        const isDocumentation = label === "Documentation";
        return (
          <Fragment key={label}>
            <section
              aria-label={isReports ? "Reports" : undefined}
              aria-labelledby={isReports ? undefined : titleId}
              className={`skills-informative-section skills-informative-section--${side}${
                isReports ? " skills-informative-section--reports" : ""
              }`}
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
                <SkillsInformativeMapSection side={side} />
              ) : isVisualData ? (
                <SkillsInformativeVisualData variant={side} />
              ) : isDataAnalysis && side === "ian" ? (
                <>
                  <SkillsInformativeDataTable />
                  <SkillsInformativeContinentCompare />
                </>
              ) : isDataAnalysis ? (
                <>
                  <SkillsInformativeDataTable variant="other" />
                  <SkillsInformativeContinentCompare variant="other" />
                </>
              ) : isDocumentation ? (
                <SkillsInformativeFontColorDocs side={side} />
              ) : (
                <p className="skills-informative-section-placeholder">Demo content — UI coming soon.</p>
              )}
            </section>
            {index < INFORMATIVE_NAV_ITEMS.length - 1 ? (
              <hr className="skills-informative-demo-divider" />
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}
