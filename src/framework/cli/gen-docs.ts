import { rmSync } from "fs";

import {
  generateIndexDoc,
  generateTestDocs,
  generateStepDocs,
  generateTokenDocs,
} from "../doc-generators";
import * as tests from "../../tests";
import * as steps from "../../steps";
import * as tokens from "../../tokens";

export function cliGenDocs(args: readonly string[]) {
  const docsPath = `${__dirname}/../../../docs`;

  if (args.includes("--clear") || args.includes("-c")) {
    rmSync(docsPath, { recursive: true, force: true });
  }

  const testsArray = Object.values(tests);
  const stepsArray = Object.values(steps);
  const tokensArray = Object.values(tokens);

  generateIndexDoc(docsPath, testsArray, tokensArray);
  generateTestDocs(docsPath, testsArray);
  generateStepDocs(docsPath, stepsArray, tokensArray);
  generateTokenDocs(docsPath, tokensArray, testsArray, stepsArray);
}
