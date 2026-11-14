"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { useSkillsDeckDesktopExpand } from "./SkillsDeckDesktopExpandContext";
import { WCO_SHEET_DOWNLOAD } from "./informative-downloads";
import { SkillsInformativeDownloadIcon } from "./SkillsInformativeDownloadIcon";
import { SkillsInformativeReportsBookshelf } from "./SkillsInformativeReportsBookshelf";

const DESKTOP_MEDIA = "(min-width: 1024px)";

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
  const desktopExpand = useSkillsDeckDesktopExpand();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_MEDIA);
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const showCompareExpandHint =
    side === "ian" && isDesktop && Boolean(desktopExpand) && !desktopExpand.expanded;
  const showExpandedBookshelf =
    side === "ian" && isDesktop && Boolean(desktopExpand?.expanded);

  const onDownloadClick = useCallback(async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await saveWcoSheetFile();
    } catch {
      window.location.assign(WCO_SHEET_DOWNLOAD.href);
    }
  }, []);

  if (showExpandedBookshelf) {
    return (
      <div
        className={`skills-informative-reports skills-informative-reports--${side} skills-informative-reports--expanded-shelf`}
      >
        <SkillsInformativeReportsBookshelf />
      </div>
    );
  }

  return (
    <div className={`skills-informative-reports skills-informative-reports--${side}`}>
      <p
        className={`skills-informative-reports-line${
          showCompareExpandHint ? " skills-informative-reports-line--compare" : ""
        }`}
      >
        {showCompareExpandHint ? (
          <span className="skills-informative-reports-expand-hint">
            Expand to see how I organize the full website's layout.
          </span>
        ) : null}
        <span
          className={
            showCompareExpandHint ? "skills-informative-reports-download-group" : undefined
          }
        >
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
        </span>
      </p>
    </div>
  );
}
