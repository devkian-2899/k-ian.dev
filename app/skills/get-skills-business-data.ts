import { skillsBusinessRegistry } from "./skills-business-registry";
import {
  DEFAULT_SKILLS_BUSINESS_ID,
  SKILLS_BUSINESS_IDS,
  isSkillsBusinessActive,
  type SkillsBusinessEntry,
  type SkillsBusinessId,
} from "./skills-business-types";

export type SkillsBusinessOption = {
  value: SkillsBusinessId;
  label: string;
  disabled: boolean;
};

function isSkillsBusinessId(value: string): value is SkillsBusinessId {
  return (SKILLS_BUSINESS_IDS as string[]).includes(value);
}

/** Combobox options (label + value). */
export function getSkillsBusinessOptions(): SkillsBusinessOption[] {
  return SKILLS_BUSINESS_IDS.map((id) => ({
    value: id,
    label: skillsBusinessRegistry[id].label,
    disabled: !isSkillsBusinessActive(id),
  }));
}

/** Full Ian + Other faces for one business. */
export function getSkillsBusinessData(businessId: SkillsBusinessId): SkillsBusinessEntry {
  return skillsBusinessRegistry[businessId];
}

/** Safe parse from combobox string; falls back to default. */
export function parseSkillsBusinessId(value: string): SkillsBusinessId {
  if (isSkillsBusinessId(value) && isSkillsBusinessActive(value)) return value;
  return DEFAULT_SKILLS_BUSINESS_ID;
}

export function getDefaultSkillsBusinessId(): SkillsBusinessId {
  return DEFAULT_SKILLS_BUSINESS_ID;
}
