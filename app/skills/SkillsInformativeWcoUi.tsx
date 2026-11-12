import Image from "next/image";
import { SkillsInformativeDesktopNav } from "./SkillsInformativeDesktopNav";
import { SkillsInformativeMobileNav } from "./SkillsInformativeMobileMenu";
import { WCO_ICON_SRC, WCO_LOGO_SRC, WCO_TEXT_SRC } from "./skills-wco-assets";

const mobileLogo = (
  <Image
    alt="World Customs Organization"
    className="skills-wco-ian-original skills-wco-mobile-logo"
    height={80}
    src={WCO_LOGO_SRC}
    width={200}
  />
);

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
      <SkillsInformativeDesktopNav side="ian" />

      <div className="skills-wco-ian-compact">
        <SkillsInformativeMobileNav side="ian" logo={mobileLogo} />
      </div>
    </div>
  );
}

/** Informative — Other's Development: logo; mobile adds same-size logo + menu. */
export function SkillsInformativeOtherWcoLogo() {
  const logo = (
    <Image
      alt="World Customs Organization"
      className="skills-wco-logo skills-wco-logo--other skills-wco-mobile-logo"
      height={80}
      src={WCO_LOGO_SRC}
      width={200}
    />
  );

  return (
    <div className="skills-wco-zone skills-wco-zone--other">
      <div className="skills-wco-other-brand skills-wco-other-brand--desktop">
        {logo}
        <SkillsInformativeDesktopNav side="other" />
      </div>
      <div className="skills-wco-other-brand skills-wco-other-brand--mobile">
        <SkillsInformativeMobileNav side="other" logo={logo} />
      </div>
    </div>
  );
}
