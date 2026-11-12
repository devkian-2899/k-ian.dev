import { WCO_SHEET_DOWNLOAD } from "./informative-downloads";
import { SkillsInformativeDownloadIcon } from "./SkillsInformativeDownloadIcon";

type SkillsInformativeReportsSectionProps = {
  side: "ian" | "other";
};

/** Reports — sample datasheet download. */
export function SkillsInformativeReportsSection({ side }: SkillsInformativeReportsSectionProps) {
  return (
    <div className={`skills-informative-reports skills-informative-reports--${side}`}>
      <p className="skills-informative-reports-line">
        <span className="skills-informative-reports-prompt">Download the sample datasheet :</span>
        <a
          aria-label={`Download ${WCO_SHEET_DOWNLOAD.fileName}`}
          className={`skills-informative-download skills-informative-download--${side}`}
          download={WCO_SHEET_DOWNLOAD.fileName}
          href={WCO_SHEET_DOWNLOAD.href}
        >
          {side === "ian" ? <SkillsInformativeDownloadIcon /> : "DOWNLOAD"}
        </a>
      </p>
    </div>
  );
}
