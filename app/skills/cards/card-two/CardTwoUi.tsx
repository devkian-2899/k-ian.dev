import { SkillsInformativeOtherWcoLogo } from "../../SkillsInformativeWcoUi";
import type { SkillsOtherUiData } from "../../skills-business-types";

type CardTwoUiProps = {
  data: SkillsOtherUiData;
};

/** UI face — other card. */
export function CardTwoUi({ data }: CardTwoUiProps) {
  const { headline, variant = "default" } = data;
  const showWco = variant === "informative-wco";

  return (
    <div
      className={`skills-inner-panel${
        showWco ? " skills-inner-panel--ui-stack" : " skills-inner-panel--testline"
      }`}
    >
      {showWco ? <SkillsInformativeOtherWcoLogo /> : null}
      <p className="skills-card-testline">{headline}</p>
    </div>
  );
}
