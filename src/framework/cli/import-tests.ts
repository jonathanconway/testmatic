import { readFileSync, readdirSync } from "fs";

import { generateTestFile } from "../code-generators";
import { convertImportedTestMdToTitleAndSteps } from "../importers";
import path = require("path");

export function cliImportTests(args: readonly string[]) {
  const importedTestPath = args[0].trim();
  const importedTestPathFiles = readdirSync(importedTestPath);

  for (const importedTestFile of importedTestPathFiles) {
    const importedTestPathAndFile = path.join(
      importedTestPath,
      importedTestFile
    );

    const importedTestMd = readFileSync(importedTestPathAndFile)
      .toString()
      .trim();

    const testTitleAndSteps =
      convertImportedTestMdToTitleAndSteps(importedTestMd);

    generateTestFile(testTitleAndSteps);
  }
}
