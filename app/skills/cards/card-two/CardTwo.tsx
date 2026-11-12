import { SkillsCardTopBar } from "../../SkillsCardTopBar";
import { SkillsInnerFlipCard } from "../../SkillsInnerFlipCard";
import type { SkillsBusinessEntry } from "../../skills-business-types";
import { CardTwoCode } from "./CardTwoCode";
import { CardTwoUi } from "./CardTwoUi";

type SkillsCardTwoProps = {
  other: SkillsBusinessEntry["other"];
};

/** Right skills card — other UI / code inner flip. */
export function SkillsCardTwo({ other }: SkillsCardTwoProps) {
  return (
    <section aria-labelledby="skills-card-two-title" className="skills-card">
      <h2 className="sr-only" id="skills-card-two-title">
        Other's Development
      </h2>
      <SkillsCardTopBar side="other" />
      <SkillsInnerFlipCard
        code={<CardTwoCode data={other.code} />}
        ui={<CardTwoUi data={other.ui} />}
      />
    </section>
  );
}
