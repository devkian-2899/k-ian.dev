"use client";

import { ProjectRequestLink } from "./ProjectRequestLink";

/** Italic note under projects; word “request” opens the project details popup. */
export function ProjectTransparencyNote() {
  return (
    <p className="cv-block-note">
      Full transparency maintained; backend production details available upon{" "}
      <ProjectRequestLink className="cv-link cv-link-button cv-link-note">request</ProjectRequestLink>.
    </p>
  );
}
