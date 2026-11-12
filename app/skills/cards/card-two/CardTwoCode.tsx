import { SkillsVscodeSnippet } from "../../SkillsVscodeSnippet";
import type { SkillsCodeFaceData } from "../../skills-business-types";

type CardTwoCodeProps = {
  data: SkillsCodeFaceData;
};

/** Code face — other card. */
export function CardTwoCode({ data }: CardTwoCodeProps) {
  return (
    <div className="skills-inner-panel skills-inner-panel--code">
      <SkillsVscodeSnippet lines={data.lines} />
    </div>
  );
}
