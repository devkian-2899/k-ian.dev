import type { SkillsBusinessEntry, SkillsBusinessId } from "./skills-business-types";

/**
 * Left (ian): Devkian Development — pro code + full comments when you add snippets.
 * Right (other): Other's Development — basic code + minimal comments.
 */
function testCategoryFaces(displayName: string): Pick<SkillsBusinessEntry, "ian" | "other"> {
  const ianUi = `Devkian Development · ${displayName} UI`;
  const otherUi = `Other's Development · ${displayName} UI`;

  return {
    ian: {
      ui: { headline: ianUi },
      code: {
        lines: [
          "/**",
          ` * Devkian Development — ${displayName}`,
          " * Documented, production-oriented sample.",
          " */",
          'console.log("Hello World");',
        ],
      },
    },
    other: {
      ui: { headline: otherUi },
      code: { lines: ['console.log("Hello World");'] },
    },
  };
}

export const skillsBusinessRegistry: Record<SkillsBusinessId, SkillsBusinessEntry> = {
  product: {
    id: "product",
    label: "Product",
    ...testCategoryFaces("Product"),
  },
  service: {
    id: "service",
    label: "Service",
    ...testCategoryFaces("Service"),
  },
  informative: {
    id: "informative",
    label: "Informative",
    ian: {
      ui: {
        headline: "Devkian Development · Info UI",
        variant: "informative-wco",
      },
      code: {
        lines: [
          "/**",
          " * Devkian Development — Informative UI",
          " * Structured, production-oriented sample.",
          " */",
          'console.log("Hello World");',
        ],
      },
    },
    other: {
      ui: {
        headline: "Other's Development · Info UI",
        variant: "informative-wco",
      },
      code: { lines: ['console.log("Hello World");'] },
    },
  },
  system: {
    id: "system",
    label: "System",
    ...testCategoryFaces("System"),
  },
  creative: {
    id: "creative",
    label: "Creative",
    ...testCategoryFaces("Creative"),
  },
};
