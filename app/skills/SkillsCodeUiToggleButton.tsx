type SkillsCodeUiToggleButtonProps = {
  className?: string;
  onShowCodeChange: (showCode: boolean) => void;
  showCode: boolean;
};

function SkillsToggleCodeIcon() {
  return (
    <span aria-hidden="true" className="skills-inner-toggle-glyph">
      &lt;/&gt;
    </span>
  );
}

function SkillsToggleUiIcon() {
  return (
    <svg
      aria-hidden="true"
      className="skills-inner-toggle-icon"
      fill="none"
      height="17"
      viewBox="0 0 24 24"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        width="17"
        x="3.5"
        y="4.5"
      />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function SkillsToggleStack({ mode }: { mode: "code" | "ui" }) {
  return (
    <span className="skills-inner-toggle-stack">
      {mode === "code" ? <SkillsToggleCodeIcon /> : <SkillsToggleUiIcon />}
      <span className="skills-inner-toggle-label">{mode === "code" ? "Code" : "UI"}</span>
    </span>
  );
}

/** Shared Code ↔ UI control (Devkian top bar on desktop). */
export function SkillsCodeUiToggleButton({
  className = "skills-card-topbar-code-toggle",
  showCode,
  onShowCodeChange,
}: SkillsCodeUiToggleButtonProps) {
  if (showCode) {
    return (
      <button
        type="button"
        aria-label="Show UI"
        className={className}
        onClick={() => onShowCodeChange(false)}
      >
        <SkillsToggleStack mode="ui" />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label="Show code work"
      className={className}
      onClick={() => onShowCodeChange(true)}
    >
      <SkillsToggleStack mode="code" />
    </button>
  );
}