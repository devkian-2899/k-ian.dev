/** Blue banner on the CV; anchor links scroll to CV sections. */
export function CvTopBanner() {
  return (
    <p className="cv-top-banner print:hidden">
      All <span className="cv-link">blue-highlighted</span> text are interactive. Click to explore my{" "}
      <a className="cv-link" href="#skills">
        skills
      </a>{" "}
      &amp;{" "}
      <a className="cv-link" href="#experiences">
        experience
      </a>
      ,{" "}
      <a className="cv-link" href="#projects">
        projects
      </a>
      .
    </p>
  );
}
