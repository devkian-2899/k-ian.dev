import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Kaung Khant",
  description: "Code samples and design concepts behind the digital CV.",
};

/** Showcase page linked from the CV banner (code + design, separate typography from `/`). */
export default function WorkPage() {
  return (
    <div id="top" className="work-page min-h-screen px-4 py-10 sm:px-8 sm:py-12">
      <header className="work-header mx-auto max-w-2xl text-center sm:text-left">
        <p className="work-eyebrow">
          <a className="cv-link" href="/">
            ← Back to CV
          </a>
        </p>
        <h1 className="work-title">Code &amp; design</h1>
        <p className="work-lead">
          Supplement to my paper-style CV. I will add repos, UI notes, and case studies here as they
          ship.
        </p>
      </header>

      <main className="mx-auto mt-10 max-w-2xl space-y-12">
        <section id="work-code" className="scroll-mt-4">
          <h2 className="work-section-title">Code</h2>
          <p className="work-body">
            Representative backend and frontend work—ERP modules, commerce flows, and integrations.
          </p>
          <ul className="work-simple-list">
            <li>
              <strong>Pico SBS</strong> — modular ERP (notes coming)
            </li>
            <li>
              <strong>Hkakabo Gear</strong> — automotive e-commerce (notes coming)
            </li>
          </ul>
        </section>

        <section id="work-design" className="scroll-mt-4">
          <h2 className="work-section-title">Design concepts</h2>
          <p className="work-body">
            Hierarchy, color, and layout decisions from collaborating with in-house designers.
          </p>
          <ul className="work-simple-list">
            <li>
              <strong>Digital CV</strong> — single-font document mode on{" "}
              <a className="cv-link" href="/">
                home
              </a>
            </li>
            <li>
              <strong>This page</strong> — serif headlines + sans body for long-form reading
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
