import { SkillsInformativeIanWcoStrip } from "../../SkillsInformativeWcoUi";
import type { SkillsIanUiData } from "../../skills-business-types";

type CardOneUiProps = {
  data: SkillsIanUiData;
};

/** UI face — Ian card. */
export function CardOneUi({ data }: CardOneUiProps) {
  const { headline, variant = "default" } = data;
  const showWco = variant === "informative-wco";

  return (
    <div
      className={`skills-inner-panel${
        showWco ? " skills-inner-panel--ui-stack" : " skills-inner-panel--testline"
      }`}
    >
      {showWco ? <SkillsInformativeIanWcoStrip /> : null}
      <p className="skills-card-testline">{headline}</p>
    </div>
  );
}
