import { createCommand } from "commander";

import {
  Test,
  formatRunResult,
  getRunFilepath,
  projectGetTestByNameOrTitle,
  projectMdRead,
  throwIfError,
} from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";
import { logHeading, logTable } from "../utils";

type RunListParameters = string /* testNameOrTitle */;

export const cliRunListCommand = createCommand("list")
  .description("List runs for the specified test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .action(cliRunList);

export function cliRunList(testNameOrTitle: RunListParameters) {
  const project = throwIfError(projectMdRead());

  const test = throwIfError(
    projectGetTestByNameOrTitle({
      project,
      lookupTestNameOrTitle: testNameOrTitle,
    })
  );

  logTitle(test);

  logRuns(test);
}

function logTitle(test: Test) {
  logHeading(`Test: ${test.title}`, 1);
}

function logRuns(test: Test) {
  logHeading("Runs", 2);

  const runsTable = test.runs.map((run) => ({
    dateTime: run.dateTime,
    result: formatRunResult(run.result),
    folder: getRunFilepath(test, run),
  }));

  logTable(runsTable);

  console.log();
}
