"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import type { InformativeReportBook } from "./informative-reports-bookshelf-data";

type SkillsInformativePdfReaderModalProps = {
  book: InformativeReportBook;
  onClose: () => void;
  open: boolean;
};

function stopCardFlip(event: MouseEvent) {
  event.stopPropagation();
}

/** Demo in-browser reader — page 1 cover, page 2 summary. */
export function SkillsInformativePdfReaderModal({ book, onClose, open }: SkillsInformativePdfReaderModalProps) {
  const [page, setPage] = useState(1);
  const totalPages = 2;

  useEffect(() => {
    if (!open) return;
    setPage(1);
  }, [open, book.id]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const goPrev = useCallback(() => {
    setPage((current) => Math.max(1, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setPage((current) => Math.min(totalPages, current + 1));
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="skills-informative-pdf-reader-overlay"
      role="dialog"
      aria-label={`PDF reader — ${book.title}`}
      onClick={onClose}
      onPointerDown={stopCardFlip}
    >
      <div
        className="skills-informative-pdf-reader"
        onClick={(event) => {
          stopCardFlip(event);
          event.stopPropagation();
        }}
        onPointerDown={stopCardFlip}
      >
        <header className="skills-informative-pdf-reader-toolbar">
          <p className="skills-informative-pdf-reader-toolbar-title">Live reading — sample PDF</p>
          <div className="skills-informative-pdf-reader-toolbar-actions">
            <button
              type="button"
              aria-label="Previous page"
              className="skills-informative-pdf-reader-toolbar-btn"
              disabled={page === 1}
              onClick={goPrev}
            >
              ‹
            </button>
            <span className="skills-informative-pdf-reader-page-indicator">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              aria-label="Next page"
              className="skills-informative-pdf-reader-toolbar-btn"
              disabled={page === totalPages}
              onClick={goNext}
            >
              ›
            </button>
            <button type="button" className="skills-informative-pdf-reader-close" onClick={onClose}>
              Close
            </button>
          </div>
        </header>

        <div className="skills-informative-pdf-reader-stage">
          {page === 1 ? (
            <article className="skills-informative-pdf-reader-page skills-informative-pdf-reader-page--cover">
              <img alt="" className="skills-informative-pdf-reader-cover" src={book.coverSrc} />
              <h3 className="skills-informative-pdf-reader-cover-title">{book.title}</h3>
              {book.subtitle ? <p className="skills-informative-pdf-reader-cover-meta">{book.subtitle}</p> : null}
            </article>
          ) : (
            <article className="skills-informative-pdf-reader-page skills-informative-pdf-reader-page--summary">
              <h3 className="skills-informative-pdf-reader-summary-heading">Summary</h3>
              <p className="skills-informative-pdf-reader-summary-text">{book.description}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}