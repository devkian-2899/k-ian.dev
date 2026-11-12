"use client";

import { useProjectRequest } from "./ProjectRequestProvider";

type ProjectRequestLinkProps = {
  children: React.ReactNode;
  className?: string;
};

/** Opens the project request popup; styled like other blue interactive links. */
export function ProjectRequestLink({ children, className = "cv-link cv-link-button" }: ProjectRequestLinkProps) {
  const { openProjectRequest } = useProjectRequest();

  return (
    <button className={className} type="button" onClick={openProjectRequest}>
      {children}
    </button>
  );
}
