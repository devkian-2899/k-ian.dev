"use client";

/**
 * Back-to-top control: hidden at the top of the CV; appears after the reader reaches Skills.
 */
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const skillsSection =
      document.getElementById("skills") ?? document.getElementById("work-code");
    if (!skillsSection) return;

    const updateVisibility = () => {
      const top = skillsSection.getBoundingClientRect().top;
      setVisible(top <= window.innerHeight * 0.92);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <a
      aria-hidden={!visible}
      aria-label="Back to top of CV"
      className={`cv-back-to-top print:hidden${visible ? "" : " cv-back-to-top--hidden"}`}
      href="#top"
      tabIndex={visible ? 0 : -1}
    >
      <span className="cv-back-to-top-icon" aria-hidden="true">
        ↑
      </span>
    </a>
  );
}
