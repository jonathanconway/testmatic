import { Test } from "../core";
import { generateTestStepDoc } from "./test-step-doc-generator";
import { writeFileSync } from "fs";

export function generateTestDoc(docsPath: string) {
  return function (test: Test) {
    const stepLines = test.testSteps.map(generateTestStepDoc);
    const testLines = [`## Test: ${test.title}\n`, stepLines.join("\n")];
    const testText = testLines.join("\n");

    writeFileSync(`${docsPath}/tests/${test.name}.md`, testText);
  };
}

export function generateTestDocs(docsPath: string, tests: readonly Test[]) {
  tests.forEach(generateTestDoc(docsPath));
}
