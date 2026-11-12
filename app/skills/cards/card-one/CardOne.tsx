import Image from "next/image";
import { skillsCardOneData } from "./card-one-data";

/** Frontend shell for skills card one (data from `card-one-data.ts`). */
export function SkillsCardOne() {
  const { logoAlt, logoSrc } = skillsCardOneData;

  return (
    <section aria-labelledby="skills-card-one-title" className="skills-card">
      <h2 className="sr-only" id="skills-card-one-title">
        Skills — card one
      </h2>
      <div className="skills-card-body skills-card-body--logo">
        <Image
          alt={logoAlt}
          className="skills-card-logo"
          height={96}
          priority
          src={logoSrc}
          width={96}
        />
      </div>
    </section>
  );
}
