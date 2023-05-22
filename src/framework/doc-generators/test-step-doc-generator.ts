import { TestStep } from "../core/test-step";

export function generateTestStepDoc(testStep: TestStep, index: number) {
  const stepNumber = index + 1;
  const stepTitle = testStep.step.toString(...(testStep.params ?? []));

  return `${stepNumber}. ${stepTitle}`;
}
