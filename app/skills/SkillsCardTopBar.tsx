import Image from "next/image";

type SkillsCardTopBarProps = {
  side: "ian" | "other";
};

const IAN_ICON = "/images/Icon.png";

/** Fixed strip on the blue card shell — does not flip with inner UI/code. */
export function SkillsCardTopBar({ side }: SkillsCardTopBarProps) {
  const caption = side === "ian" ? "Devkian Development" : "Other's Development";

  return (
    <div className="skills-card-topbar">
      <div className="skills-card-topbar-brand">
        {side === "ian" ? (
          <Image
            alt=""
            aria-hidden
            className="skills-card-topbar-icon"
            height={26}
            src={IAN_ICON}
            width={26}
          />
        ) : (
          <span aria-hidden="true" className="skills-card-topbar-icon skills-card-topbar-icon--code">
            &lt;/&gt;
          </span>
        )}
        <p className="skills-card-topbar-caption">{caption}</p>
      </div>
    </div>
  );
}
