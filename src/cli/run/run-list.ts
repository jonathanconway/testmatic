import { createCommand } from "commander";

import {
  Test,
  formatRunResult,
  getRunFilepath,
  isError,
  logError,
  logHeading,
  logTable,
  projectGetTestByNameOrTitle,
  projectMdRead,
} from "../../framework";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type RunListParameters = string;

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
  logHeading(test.title, 1);

  console.log();
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
