import { Test, createTest } from "./test";
import { createStepMock } from "./step.mock";
import { Token } from "./token";

export function createTestMock(): Test {
  return createTest({
    name: "mock_test",
    title: "mock test",
    testStepAndParamPairs: [
      createStepMock("mock-step-1"),
      createStepMock("mock-step-2"),
    ],
  });
}

export function createTestsWithTokensMock(
  tokens: readonly Token[]
): readonly Test[] {
  return tokens.map((token, index) =>
    createTest({
      name: `mock_test__${token.nameAndType}__foo_bar`,
      title: `Mock test (${token.getDocTitle()}) foo bar`,
      testStepAndParamPairs: [
        createStepMock(`mock-step-${index * 2}`),
        createStepMock(`mock-step-${index * 3}`),
      ],
    })
  );
}
