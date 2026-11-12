/** Minimal VS Code Dark+–style editor chrome (no tab strip). */
export function SkillsVscodeSnippet() {
  const lines = [
    {
      n: 1,
      tokens: (
        <>
          <span className="skills-vsc-token skills-vsc-token--keyword">console</span>
          <span className="skills-vsc-token skills-vsc-token--punct">.</span>
          <span className="skills-vsc-token skills-vsc-token--function">log</span>
          <span className="skills-vsc-token skills-vsc-token--punct">(</span>
          <span className="skills-vsc-token skills-vsc-token--string">&quot;Hello World&quot;</span>
          <span className="skills-vsc-token skills-vsc-token--punct">);</span>
        </>
      ),
    },
  ];

  return (
    <div className="skills-vscode">
      <div className="skills-vscode-editor" role="group" aria-label="Code sample">
        {lines.map((line) => (
          <div key={line.n} className="skills-vscode-line">
            <div aria-hidden="true" className="skills-vscode-gutter">
              {line.n}
            </div>
            <div className="skills-vscode-content">
              <code className="skills-vscode-code">{line.tokens}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
