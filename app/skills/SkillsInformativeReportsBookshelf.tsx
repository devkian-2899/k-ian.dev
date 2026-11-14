"use client";

import { useCallback, useMemo, useState, type MouseEvent } from "react";
import {
  findInformativeReportBook,
  getInformativeReportCategory,
  INFORMATIVE_REPORT_CATEGORIES,
  INFORMATIVE_REPORT_PDF_DOWNLOAD,
  INFORMATIVE_REPORT_SHELF_TOTAL_PAGES,
  informativeReportHasExpandedDetails,
  type InformativeReportBook,
} from "./informative-reports-bookshelf-data";
import { SkillsInformativeDownloadIcon } from "./SkillsInformativeDownloadIcon";
import { SkillsInformativePdfReaderModal } from "./SkillsInformativePdfReaderModal";
import { getInformativeReportPublicationMeta } from "./informative-reports-publication-meta";
import { SkillsInformativeReportPublicationMeta } from "./SkillsInformativeReportPublicationMeta";

function stopCardFlip(event: MouseEvent) {
  event.stopPropagation();
}

type ShelfHit = {
  book: InformativeReportBook;
  categoryLabel: string;
  haystack: string;
};

function bookHaystack(book: InformativeReportBook, categoryLabel: string): string {
  const meta = getInformativeReportPublicationMeta(book);
  return [
    book.title,
    book.subtitle,
    book.description,
    book.downloadSizeLabel,
    categoryLabel,
    meta.doi,
    meta.permalink,
    meta.funding,
    meta.license,
    ...meta.keywords,
    ...meta.authors.flatMap((author) => [author.name, author.affiliation, author.role, author.orcid]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function BookCard({
  book,
  categoryLabel,
  onReadMore,
}: {
  book: InformativeReportBook;
  categoryLabel?: string;
  onReadMore: (bookId: string) => void;
}) {
  return (
    <li className="skills-informative-book">
      <img
        alt=""
        aria-hidden
        className="skills-informative-book-cover skills-informative-book-cover--image"
        decoding="async"
        loading="lazy"
        src={book.coverSrc}
      />
      <div className="skills-informative-book-body">
        {categoryLabel ? <p className="skills-informative-book-category">{categoryLabel}</p> : null}
        <h3 className="skills-informative-book-title">{book.title}</h3>
        {book.subtitle ? (
          <p className="skills-informative-book-meta">{book.subtitle}</p>
        ) : (
          <div className="skills-informative-book-meta skills-informative-book-line--placeholder skills-informative-book-line--short" />
        )}
        <div className="skills-informative-book-desc-block">
          <p className="skills-informative-book-desc">{book.description}</p>
          <a
            className="skills-informative-book-read-more"
            href={`#report-${book.id}`}
            onClick={(event) => {
              event.preventDefault();
              stopCardFlip(event);
              onReadMore(book.id);
            }}
          >
            Read more...
          </a>
        </div>
      </div>
    </li>
  );
}

function ExpandedBookShelf({ book, onClose }: { book: InformativeReportBook; onClose: () => void }) {
  const [pdfReaderOpen, setPdfReaderOpen] = useState(false);
  const showFullDetails = informativeReportHasExpandedDetails(book.id);

  return (
    <div className="skills-informative-bookshelf-expanded">
      <header className="skills-informative-bookshelf-expanded-hero">
        <img
          alt=""
          className="skills-informative-book-cover skills-informative-book-cover--image skills-informative-book-cover--expanded"
          decoding="async"
          src={book.coverSrc}
        />
        <div className="skills-informative-book-detail-meta">
          <h3 className="skills-informative-book-title skills-informative-book-title--expanded">{book.title}</h3>
          {book.subtitle ? (
            <p className="skills-informative-book-meta">{book.subtitle}</p>
          ) : (
            <div className="skills-informative-book-meta skills-informative-book-line--placeholder skills-informative-book-line--short" />
          )}
          <button type="button" className="skills-informative-book-back-link" onClick={onClose}>
            ← Back to shelf
          </button>
        </div>
      </header>

      {showFullDetails ? (
        <section aria-label="Report full text" className="skills-informative-bookshelf-expanded-body">
          <h4 className="skills-informative-book-reader-heading">Summary</h4>
          <p className="skills-informative-book-desc skills-informative-book-desc--expanded">{book.description}</p>

          <div className="skills-informative-book-reader-actions">
            <a
              className="skills-informative-download skills-informative-download--ian skills-informative-book-action-download"
              download={INFORMATIVE_REPORT_PDF_DOWNLOAD.fileName}
              href={INFORMATIVE_REPORT_PDF_DOWNLOAD.href}
              onClick={stopCardFlip}
            >
              <span className="skills-informative-book-action-download-inner">
                <SkillsInformativeDownloadIcon />
                <span className="skills-informative-book-action-download-text">
                  Download{" "}
                  <span className="skills-informative-book-action-download-size">({book.downloadSizeLabel})</span>
                </span>
              </span>
            </a>
            <button
              type="button"
              className="skills-informative-download skills-informative-download--other skills-informative-book-action-live"
              onClick={(event) => {
                stopCardFlip(event);
                setPdfReaderOpen(true);
              }}
            >
              Live Reading On Browser...
            </button>
          </div>

          <SkillsInformativeReportPublicationMeta book={book} />
        </section>
      ) : null}

      {showFullDetails ? (
        <SkillsInformativePdfReaderModal book={book} open={pdfReaderOpen} onClose={() => setPdfReaderOpen(false)} />
      ) : null}
    </div>
  );
}

function BookshelfPageNav({
  page,
  onPageChange,
}: {
  page: number;
  onPageChange: (nextPage: number) => void;
}) {
  const lastPage = INFORMATIVE_REPORT_SHELF_TOTAL_PAGES;

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > lastPage) return;
    onPageChange(nextPage);
  };

  return (
    <nav aria-label="Report shelf pages" className="skills-informative-bookshelf-pager">
      <button
        type="button"
        aria-label="Previous page"
        className="skills-informative-bookshelf-pager-edge"
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
      >
        &lt;&lt;
      </button>
      {[1, 2, 3].map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          aria-current={page === pageNumber ? "page" : undefined}
          className={`skills-informative-bookshelf-pager-num${
            page === pageNumber ? " skills-informative-bookshelf-pager-num--active" : ""
          }`}
          onClick={() => goToPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <span aria-hidden className="skills-informative-bookshelf-pager-ellipsis">
        ...
      </span>
      <button
        type="button"
        aria-current={page === lastPage ? "page" : undefined}
        className={`skills-informative-bookshelf-pager-num${
          page === lastPage ? " skills-informative-bookshelf-pager-num--active" : ""
        }`}
        onClick={() => goToPage(lastPage)}
      >
        {lastPage}
      </button>
      <button
        type="button"
        aria-label="Next page"
        className="skills-informative-bookshelf-pager-edge"
        disabled={page === lastPage}
        onClick={() => goToPage(page + 1)}
      >
        &gt;&gt;
      </button>
    </nav>
  );
}

/** Devkian expanded view — five sidebar categories; Yearly shows five book cards. */
export function SkillsInformativeReportsBookshelf() {
  const [categoryId, setCategoryId] = useState("yearly");
  const [shelfPage, setShelfPage] = useState(1);
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const category = useMemo(
    () => getInformativeReportCategory(categoryId) ?? INFORMATIVE_REPORT_CATEGORIES[0],
    [categoryId],
  );

  const expandedBook = useMemo(
    () => (expandedBookId ? findInformativeReportBook(expandedBookId) : undefined),
    [expandedBookId],
  );

  const catalog = useMemo<ShelfHit[]>(
    () =>
      INFORMATIVE_REPORT_CATEGORIES.flatMap((entry) =>
        entry.books.map((book) => ({
          book,
          categoryLabel: entry.sideNavLabel,
          haystack: bookHaystack(book, entry.sideNavLabel),
        })),
      ),
    [],
  );

  const searchTokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const isSearching = searchTokens.length > 0;
  const searchHits = isSearching
    ? catalog.filter((entry) => searchTokens.every((token) => entry.haystack.includes(token)))
    : [];

  const selectCategory = useCallback((nextCategoryId: string) => {
    if (!getInformativeReportCategory(nextCategoryId)) return;
    setCategoryId(nextCategoryId);
    setExpandedBookId(null);
    setQuery("");
  }, []);

  const openBook = useCallback((bookId: string) => {
    setExpandedBookId(bookId);
  }, []);

  const closeBook = useCallback(() => {
    setExpandedBookId(null);
  }, []);

  const isYearly = category.id === "yearly";
  const isBookExpanded = expandedBook !== undefined;

  return (
    <div className="skills-informative-bookshelf" onClick={stopCardFlip} onPointerDown={stopCardFlip}>
      <div
        className={`skills-informative-bookshelf-layout skills-informative-bookshelf-layout--shelf${
          isBookExpanded ? " skills-informative-bookshelf-layout--book-expanded" : ""
        }`}
      >
        <nav aria-label="Crash report categories" className="skills-informative-bookshelf-menu">
          <ul className="skills-informative-bookshelf-menu-list skills-informative-sidenav-list">
            {INFORMATIVE_REPORT_CATEGORIES.map((entry) => {
              const isActive = entry.id === categoryId;
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    className={`skills-informative-bookshelf-menu-btn skills-informative-sidenav-btn${
                      isActive ? " skills-informative-bookshelf-menu-btn--active" : ""
                    }`}
                    onClick={() => selectCategory(entry.id)}
                  >
                    <span className="skills-informative-bookshelf-menu-title">{entry.sideNavLabel}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {isBookExpanded && expandedBook ? (
          <ExpandedBookShelf book={expandedBook} onClose={closeBook} />
        ) : (
          <div className="skills-informative-bookshelf-stage">
            <label className="skills-informative-bookshelf-search">
              <span className="skills-informative-bookshelf-search-label">Search</span>
              <input
                type="search"
                value={query}
                placeholder="Title, author, continent, keyword…"
                onChange={(event) => setQuery(event.target.value)}
              />
              <span className="skills-informative-bookshelf-search-count">
                {isSearching ? `${searchHits.length} of ${catalog.length}` : `${category.books.length} on this shelf`}
              </span>
            </label>
            {isSearching ? (
              searchHits.length === 0 ? (
                <p className="skills-informative-bookshelf-search-empty">No reports match that search.</p>
              ) : (
                <ul className="skills-informative-bookshelf-list">
                  {searchHits.map((hit) => (
                    <BookCard
                      key={hit.book.id}
                      book={hit.book}
                      categoryLabel={hit.categoryLabel}
                      onReadMore={openBook}
                    />
                  ))}
                </ul>
              )
            ) : isYearly ? (
              <ul className="skills-informative-bookshelf-list">
                {category.books.map((book) => (
                  <BookCard key={book.id} book={book} onReadMore={openBook} />
                ))}
              </ul>
            ) : (
              <ul className="skills-informative-bookshelf-list skills-informative-bookshelf-list--single">
                <BookCard book={category.books[0]} onReadMore={openBook} />
              </ul>
            )}
          </div>
        )}
      </div>
      {!isBookExpanded && !isSearching ? <BookshelfPageNav page={shelfPage} onPageChange={setShelfPage} /> : null}
    </div>
  );
}