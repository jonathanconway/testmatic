import { readdirSync } from "fs";

import { Run, Test } from "../../core";
import { isNonJunkFile } from "../../files";
import { getRunFilepath } from "../../markdown";

export function getRunFiles({ test, run }: { test: Test; run: Run }) {
  const runFilePath = getRunFilepath(test, run);
  const files = readdirSync(runFilePath)
    .filter(isNonJunkFile)
    .map((filename) => `${runFilePath}/${filename}`);
  return files;
}
