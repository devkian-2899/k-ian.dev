import { SkillsInnerFlipCard } from "../../SkillsInnerFlipCard";
import { CardOneCode } from "./CardOneCode";
import { CardOneUi } from "./CardOneUi";

/** Left skills card — UI / code inner flip (desktop). */
export function SkillsCardOne() {
  return (
    <section aria-labelledby="skills-card-one-title" className="skills-card">
      <h2 className="sr-only" id="skills-card-one-title">
        Skills — card one
      </h2>
      <SkillsInnerFlipCard code={<CardOneCode />} ui={<CardOneUi />} />
    </section>
  );
}
