import type { ReactNode } from "react";
import type { InformativeReportBook } from "./informative-reports-bookshelf-data";
import { getInformativeReportPublicationMeta } from "./informative-reports-publication-meta";

type SkillsInformativeReportPublicationMetaProps = {
  book: InformativeReportBook;
};

function MetaSection({ heading, children }: { children: ReactNode; heading: string }) {
  return (
    <section className="skills-informative-publication-section">
      <h5 className="skills-informative-publication-section-title">{heading}</h5>
      <div className="skills-informative-publication-section-body">{children}</div>
    </section>
  );
}

export function SkillsInformativeReportPublicationMeta({ book }: SkillsInformativeReportPublicationMetaProps) {
  const meta = getInformativeReportPublicationMeta(book);

  return (
    <footer className="skills-informative-book-reader-publisher skills-informative-book-publication-meta">
      <MetaSection heading="Authors & Affiliations">
        <ul className="skills-informative-publication-authors">
          {meta.authors.map((author) => (
            <li key={author.name} className="skills-informative-publication-author">
              <p className="skills-informative-publication-author-name">{author.name}</p>
              <p className="skills-informative-publication-author-affiliation">
                {author.role ? `${author.role} · ` : null}
                {author.affiliation}
              </p>
              {author.orcid ? (
                <p className="skills-informative-publication-author-orcid">ORCID ID: {author.orcid}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </MetaSection>

      <MetaSection heading="Abstract & Keywords">
        <p className="skills-informative-publication-note">
          The summary above serves as the report abstract. Full reports include extended methodology and
          conclusion sections in the downloadable PDF.
        </p>
        <ul className="skills-informative-publication-keywords" aria-label="Keywords">
          {meta.keywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </MetaSection>

      <MetaSection heading="Access & Identifiers">
        <p className="skills-informative-publication-note">
          Full document access is available via the Download and Live Reading On Browser controls above this metadata
          block.
        </p>
        <p className="skills-informative-publication-kv">
          <span className="skills-informative-publication-kv-label">DOI</span>
          <span className="skills-informative-publication-kv-value">
            {meta.doi.startsWith("http") ? meta.doi : `https://doi.org/${meta.doi}`}
          </span>
        </p>
        <p className="skills-informative-publication-kv">
          <span className="skills-informative-publication-kv-label">Permalink</span>
          <span className="skills-informative-publication-kv-value">{meta.permalink}</span>
        </p>
      </MetaSection>

      <MetaSection heading="Attribution & Legal Metadata">
        <p className="skills-informative-publication-detail">
          <strong>License:</strong> {meta.license}
        </p>
        <p className="skills-informative-publication-detail">
          <strong>How to cite (APA):</strong> {meta.citationApa}
        </p>
        <p className="skills-informative-publication-detail">
          <strong>How to cite (Harvard):</strong> {meta.citationHarvard}
        </p>
        <p className="skills-informative-publication-detail">
          <strong>Funding:</strong> {meta.funding}
        </p>
      </MetaSection>
    </footer>
  );
}