import { writeFileSync } from "fs";

import {
  getStepsHavingToken,
  getTestsHavingToken,
  Step,
  Test,
  Token,
} from "../core";

export function generateTokenDoc(
  docsPath: string,
  tests: readonly Test[],
  steps: readonly Step[]
) {
  return function (token: Token) {
    const { type, name, title } = token;

    const testsHavingToken = getTestsHavingToken(tests, token);
    const stepsHavingToken = getStepsHavingToken(steps, token);

    const text = `
## ${title}

### Tests

${testsHavingToken.map((test) => `- [${test.title}](../tests/${test.name}.md)`)}
${testsHavingToken.length === 0 ? "(None)" : ""}

### Steps

${stepsHavingToken.map((step) => `- [${step.title}](../steps/${step.name}.md)`)}
${stepsHavingToken.length === 0 ? "(None)" : ""}

`.trim();

    writeFileSync(`${docsPath}/tokens/${name}_${type}.md`, text);
  };
}

export function generateTokenDocs(
  docsPath: string,
  tokens: readonly Token[],
  tests: readonly Test[],
  steps: readonly Step[]
) {
  tokens.forEach(generateTokenDoc(docsPath, tests, steps));
}
