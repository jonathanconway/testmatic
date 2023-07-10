import { appendFileSync, existsSync, writeFileSync } from "fs";

import { parseTokens } from "../core";
import {
  convertToLowerCaseWithTokens,
  convertToSnakeWithTokens,
} from "../utils";
import { generateStep } from "./step-generator";

export interface GenerateTestInfo {
  readonly testTitle: string;
  readonly steps: readonly string[];
}

export function generateTest({ testTitle, steps }: GenerateTestInfo) {
  const testFnName = convertToSnakeWithTokens(testTitle);
  const stepFnNames = steps.map(convertToSnakeWithTokens);

  const testFileNameBody = `${testFnName}.test`;
  const testFileName = `${testFileNameBody}.ts`;
  const testsPath = `${__dirname}/../../tests`;
  const testsIndexFilePathAndName = `${testsPath}/index.ts`;
  const testFilePathAndName = `${testsPath}/${testFileName}`;
  const testFileContent = `
import { createTest } from "../framework";
import {
${stepFnNames.map((stepFnName) => `  ${stepFnName},`).join("\n")}
} from "../steps";

export const ${testFnName} = createTest({
  name: "${testFnName}",
  steps: [
${stepFnNames.map((stepFnName) => `    ${stepFnName},`).join("\n")}
  ],
});

test("${convertToLowerCaseWithTokens(testFnName)}", ${testFnName}.run);
`.trim();
  const testFileExport = `export * from "./${testFileNameBody}";\n`;

  const testFile = {
    testFilePathAndName,
    testFileContent,
    testFileExport,
    testsIndexFilePathAndName,
  };

  const stepFiles = stepFnNames.map((step) => generateStep({ step }));

  const stepsIndexFilePathAndName = `${__dirname}/../../steps/index.ts`;

  const tokens = parseTokens(testFnName).map((token) =>
    token.replaceAll("_", " ")
  );

  return {
    testFile,
    stepFiles,
    stepsIndexFilePathAndName,
    tokens,
  };
}

export function generateTestFile(info: GenerateTestInfo) {
  const {
    testFile: {
      testFilePathAndName,
      testFileContent,
      testsIndexFilePathAndName,
      testFileExport,
    },
    stepFiles,
    stepsIndexFilePathAndName,
  } = generateTest(info);

  console.log("generateTestFile", { testFilePathAndName, testFileContent });
  writeFileSync(testFilePathAndName, testFileContent);
  appendFileSync(testsIndexFilePathAndName, testFileExport);

  for (const {
    stepFilePathAndName,
    stepFileContent,
    stepFileExport,
  } of stepFiles) {
    if (!existsSync(stepFilePathAndName)) {
      writeFileSync(stepFilePathAndName, stepFileContent);
      appendFileSync(stepsIndexFilePathAndName, stepFileExport);
    }
  }
}
