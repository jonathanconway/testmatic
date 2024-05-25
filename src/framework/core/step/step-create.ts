import { parseTags } from "../tag";

import { Step } from "./step";

export function createTestStepFromText(stepText: string): Step {
  const tags = parseTags(stepText);

  return {
    text: stepText,
    tags,
  };
}
