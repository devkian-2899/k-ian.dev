"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ProjectRequestModal } from "./ProjectRequestModal";

type ProjectRequestContextValue = {
  openProjectRequest: () => void;
};

const ProjectRequestContext = createContext<ProjectRequestContextValue | null>(null);

/** Single modal instance; any child can call openProjectRequest(). */
export function ProjectRequestProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openProjectRequest = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openProjectRequest }), [openProjectRequest]);

  return (
    <ProjectRequestContext.Provider value={value}>
      {children}
      <ProjectRequestModal open={open} onClose={close} />
    </ProjectRequestContext.Provider>
  );
}

export function useProjectRequest() {
  const ctx = useContext(ProjectRequestContext);
  if (!ctx) {
    throw new Error("useProjectRequest must be used within ProjectRequestProvider");
  }
  return ctx;
}
