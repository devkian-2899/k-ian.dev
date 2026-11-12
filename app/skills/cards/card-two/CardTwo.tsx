import { skillsCardTwoData } from "./card-two-data";

/** Frontend shell for skills card two (data from `card-two-data.ts`). */
export function SkillsCardTwo() {
  const { title } = skillsCardTwoData;

  return (
    <section aria-labelledby="skills-card-two-title" className="skills-card">
      <h2 className="skills-card-heading cv-section-title" id="skills-card-two-title">
        {title}
      </h2>
      <div className="skills-card-body" />
    </section>
  );
}
