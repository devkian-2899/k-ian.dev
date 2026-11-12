import { SkillsCardTopBar } from "../../SkillsCardTopBar";
import { SkillsInnerFlipCard } from "../../SkillsInnerFlipCard";
import type { SkillsBusinessEntry } from "../../skills-business-types";
import { CardOneCode } from "./CardOneCode";
import { CardOneUi } from "./CardOneUi";

type SkillsCardOneProps = {
  ian: SkillsBusinessEntry["ian"];
  onShowCodeChange: (showCode: boolean) => void;
  showCode: boolean;
};

/** Left skills card — Ian UI / code inner flip. */
export function SkillsCardOne({ ian, showCode, onShowCodeChange }: SkillsCardOneProps) {
  return (
    <section aria-labelledby="skills-card-one-title" className="skills-card">
      <h2 className="sr-only" id="skills-card-one-title">
        Devkian Development
      </h2>
      <SkillsCardTopBar side="ian" />
      <SkillsInnerFlipCard
        side="ian"
        showCode={showCode}
        onShowCodeChange={onShowCodeChange}
        code={<CardOneCode data={ian.code} />}
        ui={<CardOneUi data={ian.ui} />}
      />
    </section>
  );
}
