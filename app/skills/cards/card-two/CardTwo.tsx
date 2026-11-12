import { SkillsInnerFlipCard } from "../../SkillsInnerFlipCard";
import { CardTwoCode } from "./CardTwoCode";
import { CardTwoUi } from "./CardTwoUi";

/** Right skills card — UI / code inner flip (desktop). */
export function SkillsCardTwo() {
  return (
    <section aria-labelledby="skills-card-two-title" className="skills-card">
      <h2 className="sr-only" id="skills-card-two-title">
        Skills — card two
      </h2>
      <SkillsInnerFlipCard code={<CardTwoCode />} ui={<CardTwoUi />} />
    </section>
  );
}
