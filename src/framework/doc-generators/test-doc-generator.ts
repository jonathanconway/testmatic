import { writeFileSync } from "fs";

import { Test } from "../core";
import { generateTestStepDoc } from "./test-step-doc-generator";

export function generateTestDoc(test: Test) {
  const stepLines = test.steps.map(generateTestStepDoc);
  const testLines = [`## Test: ${test.title}\n`, stepLines.join("\n")];
  const testText = testLines.join("\n");

  return testText;
}

export function generateTestDocs(docsPath: string, tests: readonly Test[]) {
  for (const test of tests) {
    const testText = generateTestDoc(test);
    writeFileSync(`${docsPath}/tests/${test.name}.md`, testText);
  }
}
