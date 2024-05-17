import { appendFileSync, existsSync, writeFileSync } from "fs";

import { parseTags } from "../core";
// import { parseTags2 } from "../core";
import { convertToLowerCaseWithTags } from "../utils";

import { generateTokenFiles } from "./token-generator";

export interface GenerateStepInfo {
  readonly step: string;
}

export function generateStep({ step }: GenerateStepInfo) {
  const stepFnName = step;
  const stepFileNameBody = `${stepFnName}.step`;
  const stepFileName = `${stepFileNameBody}.ts`;
  const stepFilePathAndName = `${__dirname}/../../steps/${stepFileName}`;
  const stepFileContent = `
import { createStep, runTest } from "../framework";

export const ${stepFnName} = createStep(
  "${stepFnName}",
  async () => {
    console.log("${stepFnName}");
  }
);

test("${convertToLowerCaseWithTags(stepFnName)}", () => runTest(${stepFnName}));
  `.trim();
  const stepsIndexFilePathAndName = `${__dirname}/../../steps/index.ts`;
  const stepFileExport = `export * from "./${stepFileNameBody}";\n`;

  const tags = parseTags(stepFnName);

  return {
    stepFilePathAndName,
    stepFileContent,
    stepFileExport,
    stepsIndexFilePathAndName,
    tags,
  };
}

export function generateStepFiles({ step }: GenerateStepInfo) {
  const {
    stepFilePathAndName,
    stepFileContent,
    stepFileExport,
    stepsIndexFilePathAndName,
    tags,
  } = generateStep({ step });

  if (!existsSync(stepFilePathAndName)) {
    writeFileSync(stepFilePathAndName, stepFileContent);
    appendFileSync(stepsIndexFilePathAndName, stepFileExport);
  }

  // tags.map((token) => ({ token })).forEach(generateTokenFiles);
}
