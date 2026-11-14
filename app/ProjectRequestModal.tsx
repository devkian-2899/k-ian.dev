"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { CV_PROJECTS } from "./cv-project-list";

type ProjectRequestModalProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Front-end-only dialog: contact field, project checkboxes, Request button (email API later).
 */
export function ProjectRequestModal({ open, onClose }: ProjectRequestModalProps) {
  const titleId = useId();
  const [contact, setContact] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setContact("");
    setSelected({});
    setStatus(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) resetForm();
  }, [open, resetForm]);

  if (!open) return null;

  const toggleProject = (name: string) => {
    setSelected((prev) => ({ ...prev, [name]: !prev[name] }));
    setStatus(null);
  };

  const handleRequest = () => {
    const trimmed = contact.trim();
    const picks = CV_PROJECTS.filter((name) => selected[name]);
    if (!trimmed) {
      setStatus("Please enter your email or phone number.");
      return;
    }
    if (picks.length === 0) {
      setStatus("Please select at least one project.");
      return;
    }
    setStatus(
      `Saved on this device only (demo). Contact: ${trimmed}. Projects: ${picks.join(", ")}. Email delivery will be added on the server later.`
    );
  };

  return (
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="cv-modal-overlay print:hidden"
      role="dialog"
      onClick={onClose}
    >
      <div className="cv-modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="cv-modal-panel-header">
          <h2 className="cv-modal-title" id={titleId}>
            Project details request
          </h2>
          <button
            aria-label="Close dialog"
            className="cv-modal-close"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <label className="cv-modal-label" htmlFor="project-request-contact">
          Your Contact:
        </label>
        <input
          autoComplete="email"
          className="cv-modal-input"
          enterKeyHint="done"
          id="project-request-contact"
          inputMode="email"
          name="contact"
          placeholder="Email or phone number"
          type="text"
          value={contact}
          onChange={(event) => {
            setContact(event.target.value);
            setStatus(null);
          }}
        />

        <p className="cv-modal-intro">
          Select the projects you want to learn more about. I&apos;ll reach out to you soon.
        </p>
        <p className="cv-modal-intro">
          Can view the live demo{" "}
          <Link
            className="cv-link"
            href="/skills"
            onClick={() => {
              document.body.style.overflow = "";
              onClose();
            }}
          >
            here
          </Link>
          .
        </p>

        <fieldset className="cv-modal-fieldset">
          <legend className="cv-modal-legend-sr">Projects</legend>
          <ul className="cv-modal-checklist">
            {CV_PROJECTS.map((name) => (
              <li key={name}>
                <label className="cv-modal-check-row">
                  <input
                    checked={Boolean(selected[name])}
                    type="checkbox"
                    onChange={() => toggleProject(name)}
                  />
                  <span>{name}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        {status ? <p className="cv-modal-status">{status}</p> : null}

        <div className="cv-modal-actions">
          <button className="cv-modal-button cv-modal-button--primary" type="button" onClick={handleRequest}>
            Request
          </button>
          <button className="cv-modal-button cv-modal-button--ghost" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
