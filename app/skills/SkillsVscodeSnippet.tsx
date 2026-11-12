import type { ReactNode } from "react";

type SkillsVscodeSnippetProps = {
  lines: string[];
};

function highlightHelloWorldLine(): ReactNode {
  return (
    <>
      <span className="skills-vsc-token skills-vsc-token--keyword">console</span>
      <span className="skills-vsc-token skills-vsc-token--punct">.</span>
      <span className="skills-vsc-token skills-vsc-token--function">log</span>
      <span className="skills-vsc-token skills-vsc-token--punct">(</span>
      <span className="skills-vsc-token skills-vsc-token--string">&quot;Hello World&quot;</span>
      <span className="skills-vsc-token skills-vsc-token--punct">);</span>
    </>
  );
}

function highlightLine(line: string): ReactNode {
  const trimmed = line.trim();
  if (
    trimmed.startsWith("//") ||
    trimmed.startsWith("/**") ||
    trimmed.startsWith("*") ||
    trimmed.startsWith("*/")
  ) {
    return <span className="skills-vsc-token skills-vsc-token--comment">{line}</span>;
  }
  if (trimmed === 'console.log("Hello World");' || trimmed === "console.log('Hello World');") {
    return highlightHelloWorldLine();
  }

  return <span className="skills-vsc-token skills-vsc-token--plain">{line || "\u00a0"}</span>;
}

/** Minimal VS Code Dark+–style editor chrome (no tab strip). */
export function SkillsVscodeSnippet({ lines }: SkillsVscodeSnippetProps) {
  const editorLines =
    lines.length > 0 ? lines : ['console.log("Hello World");'];

  return (
    <div className="skills-vscode">
      <div className="skills-vscode-editor" role="group" aria-label="Code sample">
        {editorLines.map((line, index) => (
          <div key={`${index}-${line}`} className="skills-vscode-line">
            <div aria-hidden="true" className="skills-vscode-gutter">
              {index + 1}
            </div>
            <div className="skills-vscode-content">
              <code className="skills-vscode-code">{highlightLine(line)}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
