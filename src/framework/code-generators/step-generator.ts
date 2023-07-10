import { appendFileSync, existsSync, writeFileSync } from "fs";

import { parseTokens } from "../core";
import {
  convertToLowerCaseWithTokens,
  convertToSnakeWithTokens,
} from "../utils";
import { generateTokenFiles } from "./token-generator";

export interface GenerateStepInfo {
  readonly step: string;
}

export function generateStep({ step }: GenerateStepInfo) {
  const stepFnName = convertToSnakeWithTokens(step);
  const stepFileNameBody = `${stepFnName}.step`;
  const stepFileName = `${stepFileNameBody}.ts`;
  const stepFilePathAndName = `${__dirname}/../../steps/${stepFileName}`;
  const stepFileContent = `
import { createStep } from "../framework";

export const ${stepFnName} = createStep(
  "${stepFnName}",
  undefined,
  async () => {
    console.log("${stepFnName}");
  }
);

test("${convertToLowerCaseWithTokens(stepFnName)}", ${stepFnName}.run);
  `.trim();
  const stepsIndexFilePathAndName = `${__dirname}/../../steps/index.ts`;
  const stepFileExport = `export * from "./${stepFileNameBody}";\n`;

  const tokens = parseTokens(stepFnName).map((token) =>
    token.replaceAll("_", " ")
  );

  return {
    stepFilePathAndName,
    stepFileContent,
    stepFileExport,
    stepsIndexFilePathAndName,
    tokens,
  };
}

export function generateStepFiles({ step }: GenerateStepInfo) {
  const {
    stepFilePathAndName,
    stepFileContent,
    stepFileExport,
    stepsIndexFilePathAndName,
    tokens,
  } = generateStep({ step });

  if (!existsSync(stepFilePathAndName)) {
    writeFileSync(stepFilePathAndName, stepFileContent);
    appendFileSync(stepsIndexFilePathAndName, stepFileExport);
  }

  tokens.map((token) => ({ token })).forEach(generateTokenFiles);
}
