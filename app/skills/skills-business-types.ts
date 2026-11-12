/** Five business categories on the skills page. */
export type SkillsBusinessId =
  | "product"
  | "service"
  | "informative"
  | "system"
  | "creative";

export const SKILLS_BUSINESS_IDS: SkillsBusinessId[] = [
  "informative",
  "product",
  "service",
  "system",
  "creative",
];

export const DEFAULT_SKILLS_BUSINESS_ID: SkillsBusinessId = "informative";

/** Only category live in the UI; others show as Coming Soon. */
export const ACTIVE_SKILLS_BUSINESS_ID: SkillsBusinessId = "informative";

export function isSkillsBusinessActive(id: SkillsBusinessId): boolean {
  return id === ACTIVE_SKILLS_BUSINESS_ID;
}

export type SkillsIanUiVariant = "default" | "informative-wco";

export type SkillsOtherUiVariant = "default" | "informative-wco";

export type SkillsIanUiData = {
  headline: string;
  variant?: SkillsIanUiVariant;
};

export type SkillsOtherUiData = {
  headline: string;
  variant?: SkillsOtherUiVariant;
};

export type SkillsCodeFaceData = {
  /** One editor line per string (VS Code face). */
  lines: string[];
};

export type SkillsBusinessCardFaces = {
  ui: SkillsIanUiData | SkillsOtherUiData;
  code: SkillsCodeFaceData;
};

export type SkillsBusinessEntry = {
  id: SkillsBusinessId;
  /** Combobox label. */
  label: string;
  ian: {
    ui: SkillsIanUiData;
    code: SkillsCodeFaceData;
  };
  other: {
    ui: SkillsOtherUiData;
    code: SkillsCodeFaceData;
  };
};
