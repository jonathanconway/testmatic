import { readFileSync } from "fs";
import { isNaN } from "lodash";

import { generateTestFile } from "../code-generators";

function convertImportedTestMdToTitleAndSteps(importedTestMd: string) {
  const lines = importedTestMd.split("\n");
  const titleLine = lines.find((line) => line.trim().startsWith("#"));
  const title = titleLine.replaceAll("#", "").trim();

  const stepLines = lines.filter(
    (line) =>
      line.trim().length > 0 && !isNaN(Number(line.trim().split(".")[0]))
  );
  const steps = stepLines.map((stepLine) => stepLine.split(".")[1].trim());

  return {
    title,
    steps,
  };
}

export function cliImportTest(args: readonly string[]) {
  const importedTestMd = readFileSync(args[0]).toString().trim();
  const testTitleAndSteps =
    convertImportedTestMdToTitleAndSteps(importedTestMd);

  generateTestFile(testTitleAndSteps);
}
