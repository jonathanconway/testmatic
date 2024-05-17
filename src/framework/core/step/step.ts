import { MarkdownSource } from "../markdown";
import { Tag, createTagFromName, parseTagNames } from "../tag";

export interface Step {
  readonly text: MarkdownSource;
  readonly tags: readonly Tag[];
}

export function createTestStepFromText(stepText: string): Step {
  return {
    text: stepText,
    tags: parseTagNames(stepText).map(createTagFromName),
  };
}
