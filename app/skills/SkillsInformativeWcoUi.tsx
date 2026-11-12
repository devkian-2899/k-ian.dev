import Image from "next/image";
import { SkillsInformativeMobileMenu } from "./SkillsInformativeMobileMenu";
import { WCO_ICON_SRC, WCO_LOGO_SRC, WCO_TEXT_SRC } from "./skills-wco-assets";

/** Informative — Devkian: split icon + text (wide); logo + menu (narrow). */
export function SkillsInformativeIanWcoStrip() {
  return (
    <div className="skills-wco-zone skills-wco-zone--ian">
      <div className="skills-wco-ian-split">
        <Image
          alt=""
          aria-hidden
          className="skills-wco-icon"
          height={76}
          src={WCO_ICON_SRC}
          width={76}
        />
        <Image
          alt="World Customs Organization"
          className="skills-wco-text"
          height={76}
          src={WCO_TEXT_SRC}
          width={280}
        />
      </div>

      <div className="skills-wco-ian-compact">
        <div className="skills-wco-mobile-brand">
          <Image
            alt="World Customs Organization"
            className="skills-wco-ian-original skills-wco-mobile-logo"
            height={80}
            src={WCO_LOGO_SRC}
            width={200}
          />
          <SkillsInformativeMobileMenu side="ian" />
        </div>
      </div>
    </div>
  );
}

/** Informative — Other's Development: logo; mobile adds same-size logo + menu. */
export function SkillsInformativeOtherWcoLogo() {
  return (
    <div className="skills-wco-zone skills-wco-zone--other">
      <div className="skills-wco-other-brand">
        <Image
          alt="World Customs Organization"
          className="skills-wco-logo skills-wco-logo--other skills-wco-mobile-logo"
          height={80}
          src={WCO_LOGO_SRC}
          width={200}
        />
        <SkillsInformativeMobileMenu side="other" />
      </div>
    </div>
  );
}
