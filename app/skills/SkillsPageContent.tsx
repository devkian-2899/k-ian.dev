"use client";

import { useCallback, useState } from "react";
import { SkillsCardOne } from "./cards/card-one/CardOne";
import { SkillsCardTwo } from "./cards/card-two/CardTwo";
import { SkillsBusinessSelect } from "./SkillsBusinessSelect";
import { SkillsCardsDeck } from "./SkillsCardsDeck";
import {
  getDefaultSkillsBusinessId,
  getSkillsBusinessData,
  parseSkillsBusinessId,
} from "./get-skills-business-data";
import type { SkillsBusinessId } from "./skills-business-types";

/** Client shell: business combobox drives both cards (UI + code). */
export function SkillsPageContent() {
  const [businessId, setBusinessId] = useState<SkillsBusinessId>(getDefaultSkillsBusinessId);

  const onBusinessChange = useCallback((nextValue: string) => {
    setBusinessId(parseSkillsBusinessId(nextValue));
  }, []);

  const business = getSkillsBusinessData(businessId);

  return (
    <div className="skills-page-main">
      <SkillsBusinessSelect value={businessId} onChange={onBusinessChange} />

      <SkillsCardsDeck
        key={businessId}
        cardOne={<SkillsCardOne ian={business.ian} />}
        cardTwo={<SkillsCardTwo other={business.other} />}
      />
    </div>
  );
}
