import { convertToSentenceCaseWithTokens } from "../utils";
import { TestStep, TestStepLine, createTestStep } from "./test-step";

export interface Test {
  readonly name: string;
  readonly title: string;
  readonly testSteps: readonly TestStep[];
  readonly run: () => Promise<void>;
}

export function createTest({
  name,
  title,
  testStepAndParamPairs,
}: {
  name: string;
  title?: string;
  testStepAndParamPairs: readonly TestStepLine[];
}): Test {
  const testSteps = testStepAndParamPairs.map(createTestStep);

  return {
    name,
    title: title ?? convertToSentenceCaseWithTokens(name),
    testSteps,
    run: async () => {
      for await (const testStep of testSteps) {
        await testStep.step.run(testStep.params);
      }
    },
  };
}
