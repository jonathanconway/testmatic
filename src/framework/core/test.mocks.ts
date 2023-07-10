import { Test, createTest } from "./test";
import { createStepMocks } from "./step.mock";
import { Token } from "./token";

export function createTestMock(): Test {
  return createTest({
    name: "mock_test",
    steps: createStepMocks(["mock_step_1", "mock_step_2"]),
  });
}

export function createTestWithTokensMocks(
  tokens: readonly Token[]
): readonly Test[] {
  return tokens.map((token, index) =>
    createTest({
      name: `mock_test__${token.nameAndType}__foo_bar`,
      steps: createStepMocks(["mock_step_1", "mock_step_2"]),
    })
  );
}
