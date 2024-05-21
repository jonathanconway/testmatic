import { createCommand } from "commander";

import { projectGetTestByNameOrTitle } from "../../core";
import { getRunFilepath } from "../../markdown";
import { sentenceCase } from "../../utils";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type RunListParameters = string;

export const cliRunListCommand = createCommand("list")
  .description("List runs for the specified test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .action(cliRunList);

export function cliRunList(testNameOrTitle: RunListParameters) {
  const project = readProject();

  const test = projectGetTestByNameOrTitle({ project, testNameOrTitle });

  const runs = test.runs;

  console.log(
    `
${test.title}
${"=".repeat(test.title.length)}
    
Runs
----`
  );

  console.log(
    toAsciiTable(
      runs.map((run) => ({
        dateTime: run.dateTime,
        result: run.result ? sentenceCase(run.result) : "-",
        folder: getRunFilepath(test, run),
      })),
      ["Date/time", "Result", "Folder"]
    )
  );
}
