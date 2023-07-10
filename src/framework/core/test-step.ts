import { Step } from "./step";

export interface TestStep {
  readonly step: Step;
  readonly params?: readonly any[];
  readonly title: string;
}

export type TestStepLine = [Step, any[]] | [Step] | Step;

export function createTestStep(testStepLine: TestStepLine): TestStep {
  if (Array.isArray(testStepLine)) {
    const [step, params] = testStepLine;
    return {
      step,
      params,
      title: step.toString(...(params ?? [])),
    };
  } else {
    const step = testStepLine;
    return {
      step,
      title: step.toString([]),
    };
  }
}
