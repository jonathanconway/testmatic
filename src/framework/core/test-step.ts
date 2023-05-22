import { Step } from "./step";

export interface TestStep {
  readonly step: Step;
  readonly params?: readonly any[];
  readonly title: string;
}

export function createTestStep(step: Step, params?: any[]): TestStep {
  return {
    step,
    params,
    title: step.toString(...(params ?? [])),
  };
}
