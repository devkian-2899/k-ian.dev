"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
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
  const [shelfOpen, setShelfOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_MEDIA);
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const showExpandedBookshelf =
    side === "ian" && isDesktop && Boolean(desktopExpand?.expanded);

  const showShelfButton = side === "ian" && !showExpandedBookshelf;

  useEffect(() => {
    if (!shelfOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShelfOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shelfOpen]);

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

  const shelfOverlay =
    shelfOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="skills-informative-shelf-overlay"
            role="presentation"
            onClick={() => setShelfOpen(false)}
          >
            <div
              aria-labelledby="skills-shelf-overlay-title"
              aria-modal="true"
              className="skills-informative-shelf-overlay-panel"
              role="dialog"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="skills-informative-shelf-overlay-bar">
                <h2 id="skills-shelf-overlay-title">PDF Shelf</h2>
                <button type="button" className="skills-informative-shelf-overlay-close" onClick={() => setShelfOpen(false)}>
                  Close
                </button>
              </header>
              <div className="skills-informative-reports skills-informative-reports--ian skills-informative-reports--expanded-shelf skills-informative-shelf-overlay-shelf">
                <SkillsInformativeReportsBookshelf />
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className={`skills-informative-reports skills-informative-reports--${side}`}>
      <div
        className={`skills-informative-reports-line${
          showShelfButton ? " skills-informative-reports-line--with-shelf" : ""
        }`}
      >
        {showShelfButton ? (
          <button
            type="button"
            className="skills-informative-shelf-open"
            onClick={(event) => {
              event.stopPropagation();
              setShelfOpen(true);
            }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            View Full Book Shelf
          </button>
        ) : null}
        <span className="skills-informative-reports-download-row">
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
      </div>
      {shelfOverlay}
    </div>
  );
}
