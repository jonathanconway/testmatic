import { createCommand } from "commander";

import {
  Test,
  formatRunResult,
  getRunFilepath,
  isError,
  projectGetTestByNameOrTitle,
  projectMdRead,
} from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";
import { logError, logHeading, logTable } from "../utils";

type RunListParameters = string /* testNameOrTitle */;

export const cliRunListCommand = createCommand("list")
  .description("List runs for the specified test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .action(cliRunList);

export function cliRunList(testNameOrTitle: RunListParameters) {
  const project = projectMdRead();
  if (!project) {
    return;
  }

  const getTestResult = projectGetTestByNameOrTitle({
    project,
    testNameOrTitle,
  });
  if (isError(getTestResult)) {
    logError(getTestResult.message);
    return;
  }
  const test = getTestResult;

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
