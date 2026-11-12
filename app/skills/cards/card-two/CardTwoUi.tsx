import { skillsCardTwoData } from "./card-two-data";

/** UI face — card two (right). */
export function CardTwoUi() {
  const { title } = skillsCardTwoData;

  return (
    <div className="skills-inner-panel">
      <h2 className="skills-card-heading cv-section-title">{title}</h2>
    </div>
  );
}
