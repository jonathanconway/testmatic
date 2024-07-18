import chalk from "chalk";

import { Step } from "../../framework";

export function formatStepText(step: Step) {
  let stepText = step.text;
  for (const tag of step.tags) {
    stepText = stepText.replaceAll(
      `(${tag.title.toLowerCase()})`,
      chalk.greenBright(`(${tag.title.toLowerCase()})`)
    );
  }
  return stepText;
}
