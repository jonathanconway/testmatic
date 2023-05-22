import { writeFileSync } from "fs";

import { Step } from "../core";
import { sentenceCase } from "../utils";

export function generateStepDocs(steps: readonly Step[]) {
  for (const step of steps) {
    const stepLines = [`## ${sentenceCase(step.name)}\n`];
    const stepText = stepLines.join("\n");

    writeFileSync(`docs/steps/${step.name}.md`, stepText);
  }
}
