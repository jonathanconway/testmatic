import { writeFileSync } from "fs";

import { Test } from "../core";
import { generateTestStepDoc } from "./test-step-doc-generator";

export function generateTestDoc(docsPath: string) {
  return function (test: Test) {
    const stepLines = test.steps.map(generateTestStepDoc);
    const testLines = [`## Test: ${test.title}\n`, stepLines.join("\n")];
    const testText = testLines.join("\n");

    writeFileSync(`${docsPath}/tests/${test.name}.md`, testText);
  };
}

export function generateTestDocs(docsPath: string, tests: readonly Test[]) {
  tests.forEach(generateTestDoc(docsPath));
}
