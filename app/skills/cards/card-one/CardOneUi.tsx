import { SkillsInformativeDemoLayout } from "../../SkillsInformativeDemoLayout";
import type { SkillsIanUiData } from "../../skills-business-types";

type CardOneUiProps = {
  data: SkillsIanUiData;
};

/** UI face — Ian card. */
export function CardOneUi({ data }: CardOneUiProps) {
  const { headline, variant = "default" } = data;
  const showWco = variant === "informative-wco";

  if (showWco) {
    return <SkillsInformativeDemoLayout side="ian" />;
  }

  return (
    <div className="skills-inner-panel skills-inner-panel--testline">
      <p className="skills-card-testline">{headline}</p>
    </div>
  );
}
