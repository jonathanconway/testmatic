import { createCommand } from "commander";

import { getTestByNameOrTitle } from "../../core";
import { exportMdTest } from "../../markdown";
import { readProject } from "../project.utils";

type TestShowParameter = string;

export const cliTestShowCommand = createCommand("show")
  .description("Show the full details of a test")
  .argument("<name>", "Name or title of test to show")
  .action(cliTestShow);

export function cliTestShow(name: TestShowParameter) {
  const project = readProject();

  const test = getTestByNameOrTitle({ project, nameOrTitle: name });

  const mdTest = exportMdTest(test);

  console.log(`\n${mdTest}\n`);
}
