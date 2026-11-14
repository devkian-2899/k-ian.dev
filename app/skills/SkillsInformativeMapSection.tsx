import { SkillsInformativeInteractiveMap } from "./SkillsInformativeInteractiveMap";

type SkillsInformativeMapSectionProps = {
  side: "ian" | "other";
};

/** Full interactive map on both cards in comparison, and on Devkian in every layout. */
export function SkillsInformativeMapSection({ side }: SkillsInformativeMapSectionProps) {
  return (
    <div
      className={`skills-informative-map-slot skills-informative-map-slot--${side} skills-informative-map-slot--expanded`}
    >
      <SkillsInformativeInteractiveMap variant={side} />
    </div>
  );
}
