"use client";

import { useCallback, type MouseEvent } from "react";
import { WCO_SHEET_DOWNLOAD } from "./informative-downloads";
import { SkillsInformativeDownloadIcon } from "./SkillsInformativeDownloadIcon";

type SkillsInformativeReportsSectionProps = {
  side: "ian" | "other";
};

async function saveWcoSheetFile(): Promise<void> {
  const response = await fetch(WCO_SHEET_DOWNLOAD.href);
  if (!response.ok) {
    throw new Error("download failed");
  }

  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = WCO_SHEET_DOWNLOAD.fileName;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(blobUrl);
}

/** Reports — sample datasheet download (`public/images/WCOSheet.xlsx`). */
export function SkillsInformativeReportsSection({ side }: SkillsInformativeReportsSectionProps) {
  const onDownloadClick = useCallback(async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await saveWcoSheetFile();
    } catch {
      window.location.assign(WCO_SHEET_DOWNLOAD.href);
    }
  }, []);

  return (
    <div className={`skills-informative-reports skills-informative-reports--${side}`}>
      <p className="skills-informative-reports-line">
        <span className="skills-informative-reports-prompt">Download the sample datasheet :</span>
        <a
          aria-label={`Download ${WCO_SHEET_DOWNLOAD.fileName}`}
          className={`skills-informative-download skills-informative-download--${side}`}
          download={WCO_SHEET_DOWNLOAD.fileName}
          href={WCO_SHEET_DOWNLOAD.href}
          onClick={onDownloadClick}
        >
          {side === "ian" ? <SkillsInformativeDownloadIcon /> : "DOWNLOAD"}
        </a>
      </p>
    </div>
  );
}
