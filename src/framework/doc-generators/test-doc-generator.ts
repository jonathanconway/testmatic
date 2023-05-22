import { Test } from "../core";
import { generateTestStepDoc } from "./test-step-doc-generator";
import { writeFileSync } from "fs";

export function generateTestDoc(test: Test) {
  const stepLines = test.testSteps.map(generateTestStepDoc);
  const testLines = [`## ${test.title}\n`, stepLines.join("\n")];
  const testText = testLines.join("\n");

  writeFileSync(`docs/tests/${test.name}.md`, testText);
}

export function generateTestDocs(tests: readonly Test[]) {
  tests.forEach(generateTestDoc);
}
