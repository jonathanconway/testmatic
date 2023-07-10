import { Step } from "./step";
import { createTestStep } from "./test-step";

export function createTestStepMock(step: Step) {
  return createTestStep(step);
}
