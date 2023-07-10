import { writeFileSync } from "fs";
import { Test } from "../core";
import { convertToSentenceCaseWithTokens } from "../utils";

function screenDocTemplate({
  title,
  tests,
}: {
  readonly title: string;
  readonly tests: readonly Test[];
}) {
  return `
## ${title} screen

### Tests

${tests.map((test) => `- [${test.title}](../tests/${test.name}.md)`)}

### Steps

${tests
  .flatMap((test) => test.testSteps)
  .map((testStep) => `- ${testStep.title}\n`)
  .join("")}

`.trim();
}

export function generateScreenDocs(docsPath: string, tests: readonly Test[]) {
  const testsByScreen = new Map<string, Set<Test>>();

  for (const test of tests) {
    for (const testStep of test.testSteps) {
      for (const screen of testStep.step.screens) {
        if (!testsByScreen.has(screen.name)) {
          testsByScreen.set(screen.name, new Set());
        }
        testsByScreen.get(screen.name)?.add(test);
      }
    }
  }

  for (const [screenName, tests] of Array.from(testsByScreen.entries())) {
    const fileContent = screenDocTemplate({
      title: convertToSentenceCaseWithTokens(screenName),
      tests: Array.from(tests),
    });

    writeFileSync(`${docsPath}/screens/${screenName}.md`, fileContent);
  }
}
