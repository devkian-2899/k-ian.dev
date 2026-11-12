import { SkillsVscodeSnippet } from "../../SkillsVscodeSnippet";
import type { SkillsCodeFaceData } from "../../skills-business-types";

type CardOneCodeProps = {
  data: SkillsCodeFaceData;
};

/** Code face — Ian card. */
export function CardOneCode({ data }: CardOneCodeProps) {
  return (
    <div className="skills-inner-panel skills-inner-panel--code">
      <SkillsVscodeSnippet lines={data.lines} />
    </div>
  );
}
