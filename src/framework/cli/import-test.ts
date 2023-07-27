import { readFileSync } from "fs";

import { generateTestFile } from "../code-generators";
import { convertImportedTestMdToTitleAndSteps } from "../importers";

export function cliImportTest(args: readonly string[]) {
  const importedTestMd = readFileSync(args[0]).toString().trim();
  const testTitleAndSteps =
    convertImportedTestMdToTitleAndSteps(importedTestMd);

  generateTestFile(testTitleAndSteps);
}
