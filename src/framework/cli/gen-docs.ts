import * as promptSync from "prompt-sync";
import { rmSync } from "fs";

import {
  generateTestDocs,
  generateScreenDocs,
  generateStepDocs,
  generateTokenDocs,
} from "../doc-generators";
import * as tests from "../../tests";
import * as steps from "../../steps";
import * as tokens from "../../tokens";

const prompt = promptSync();

export function cliGenDocs(args: readonly string[]) {
  const docsPath = `${__dirname}/../../../docs`;

  if (args.includes("--clear") || args.includes("-c")) {
    rmSync(docsPath, { recursive: true, force: true });
  }

  const testsArray = Object.values(tests);
  const tokensArray = Object.values(tokens);
  const stepsArray = Object.values(steps);

  generateTestDocs(docsPath, testsArray);
  generateScreenDocs(docsPath, testsArray);
  generateStepDocs(docsPath, stepsArray, tokensArray);
  generateTokenDocs(docsPath, tokensArray, testsArray, stepsArray);
}
