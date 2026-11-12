import Image from "next/image";
import { skillsCardOneData } from "./card-one-data";

/** UI face — card one (left). */
export function CardOneUi() {
  const { logoAlt, logoSrc } = skillsCardOneData;

  return (
    <div className="skills-inner-panel skills-inner-panel--logo">
      <Image
        alt={logoAlt}
        className="skills-card-logo"
        height={96}
        src={logoSrc}
        width={96}
      />
    </div>
  );
}
