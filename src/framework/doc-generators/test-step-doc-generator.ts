import { Step } from "../core";

export function generateTestStepDoc(step: Step, index: number) {
  const stepNumber = index + 1;
  return `${stepNumber}. ${step.title} [🔗](../steps/${step.name}.md)`;
}
