import { sentenceCase } from "../utils";
import { Step } from "./step";
import { TestStep, createTestStep } from "./test-step";

export interface Test {
  readonly name: string;
  readonly title: string;
  readonly testSteps: readonly TestStep[];
  readonly run: () => Promise<void>;
}

export function createTest(
  name: string,
  title: string | undefined,
  testStepandParamPairs: readonly ([Step, any[]] | [Step])[]
): Test {
  const testSteps = testStepandParamPairs.map(([step, params]) =>
    createTestStep(step, params)
  );
  return {
    name,
    title: title ?? sentenceCase(name),
    testSteps,
    run: async () => {
      for await (const testStep of testSteps) {
        await testStep.step.run(testStep.params);
      }
    },
  };
}
