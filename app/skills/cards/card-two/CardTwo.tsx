import { SkillsCardTopBar } from "../../SkillsCardTopBar";
import { SkillsInnerFlipCard } from "../../SkillsInnerFlipCard";
import type { SkillsBusinessEntry } from "../../skills-business-types";
import { CardTwoCode } from "./CardTwoCode";
import { CardTwoUi } from "./CardTwoUi";

type SkillsCardTwoProps = {
  onShowCodeChange: (showCode: boolean) => void;
  other: SkillsBusinessEntry["other"];
  showCode: boolean;
};

/** Right skills card — other UI / code inner flip. */
export function SkillsCardTwo({ other, showCode, onShowCodeChange }: SkillsCardTwoProps) {
  return (
    <section aria-labelledby="skills-card-two-title" className="skills-card skills-card--other">
      <h2 className="sr-only" id="skills-card-two-title">
        Other's Development
      </h2>
      <SkillsCardTopBar side="other" />
      <SkillsInnerFlipCard
        side="other"
        showCode={showCode}
        onShowCodeChange={onShowCodeChange}
        code={<CardTwoCode data={other.code} />}
        ui={<CardTwoUi data={other.ui} />}
      />
    </section>
  );
}
