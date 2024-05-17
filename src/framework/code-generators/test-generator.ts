import { appendFileSync, existsSync, writeFileSync } from "fs";

import { parseTags } from "../core";
// import { parseTags2 } from "../core";
import { convertToLowerCaseWithTags, convertToSnakeWithTags } from "../utils";

import { generateStep } from "./step-generator";
import { generateTokenFiles } from "./token-generator";

export interface GenerateTestInfo {
  readonly title: string;
  readonly steps: readonly string[];
}

export function generateTest({ title: testTitle, steps }: GenerateTestInfo) {
  const testFnName = convertToSnakeWithTags(testTitle);
  const stepFnNames = steps.map(convertToSnakeWithTags);

  const testFileNameBody = `${testFnName}.test`;
  const testFileName = `${testFileNameBody}.ts`;
  const testsPath = `${__dirname}/../../tests`;
  const testsIndexFilePathAndName = `${testsPath}/index.ts`;
  const testFilePathAndName = `${testsPath}/${testFileName}`;
  const testFileContent = `
import { createTest, runTest } from "../framework";
import {
${stepFnNames.map((stepFnName) => `  ${stepFnName},`).join("\n")}
} from "../steps";

export const ${testFnName} = createTest({
  name: "${testFnName}",
  steps: [
${stepFnNames.map((stepFnName) => `    ${stepFnName},`).join("\n")}
  ],
});

test("${convertToLowerCaseWithTags(testFnName)}", () => runTest(${testFnName}));
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

  const tags = parseTags(testFnName);

  return {
    testFile,
    stepFiles,
    stepsIndexFilePathAndName,
    tags,
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
    tags: testTags,
  } = generateTest(info);

  writeFileSync(testFilePathAndName, testFileContent);
  appendFileSync(testsIndexFilePathAndName, testFileExport);

  for (const {
    stepFilePathAndName,
    stepFileContent,
    stepFileExport,
    tags: stepTags,
  } of stepFiles) {
    if (!existsSync(stepFilePathAndName)) {
      writeFileSync(stepFilePathAndName, stepFileContent);
      appendFileSync(stepsIndexFilePathAndName, stepFileExport);
    }

    // for (const token of stepTags) {
    //   generateTokenFiles({ token });
    // }
  }

  // for (const token of testTags) {
  //   generateTokenFiles({ token });
  // }
}
