import { SkillsInformativeDemoLayout } from "../../SkillsInformativeDemoLayout";
import type { SkillsOtherUiData } from "../../skills-business-types";

type CardTwoUiProps = {
  data: SkillsOtherUiData;
};

/** UI face — other card. */
export function CardTwoUi({ data }: CardTwoUiProps) {
  const { headline, variant = "default" } = data;
  const showWco = variant === "informative-wco";

  if (showWco) {
    return <SkillsInformativeDemoLayout side="other" />;
  }

  return (
    <div className="skills-inner-panel skills-inner-panel--testline">
      <p className="skills-card-testline">{headline}</p>
    </div>
  );
}
