import { rmSync } from "fs";

import * as steps from "../../../steps";
// import {
//   generateIndexDoc,
//   generateTestDocs,
//   generateStepDocs,
//   generateTagDocs,
// } from "../../doc-generators";
import * as tests from "../../../tests";

// import * as tags from "../../tags";

export function cliGenDocs(args: readonly string[]) {
  const docsPath = `${__dirname}/../../../docs`;

  if (args.includes("--clear") || args.includes("-c")) {
    rmSync(docsPath, { recursive: true, force: true });
  }

  const testsArray = Object.values(tests);
  const stepsArray = Object.values(steps);
  // const tagsArray = Object.values(tags);

  // generateIndexDoc(docsPath, testsArray, tagsArray);
  // generateTestDocs(docsPath, testsArray);
  // generateStepDocs(docsPath, stepsArray, tagsArray);
  // generateTokenDocs(docsPath, tagsArray, testsArray, stepsArray);
}
