import { createCommand } from "commander";

import {
  Run,
  Test,
  formatDateTimeString,
  getRunFiles,
  isError,
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
  projectMdRead,
} from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";
import { logError, logHeading, logTable } from "../utils";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";

type RunShowParameter = [
  string /* testNameOrTitle */,
  string /* runDateTime */
];

export const cliRunShowCommand = createCommand("show")
  .description("Show the full details of a run")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunShow);

export function cliRunShow(
  ...[testNameOrTitle, runDateTime]: RunShowParameter
) {
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

  const getRunResult = projectGetTestRunByDateTimeOrLatest({
    test,
    runDateTime,
  });
  if (isError(getRunResult)) {
    logError(getRunResult.message);
    return;
  }
  const run = getRunResult;

  const files = getRunFiles({ test, run });

  logTitle({ test, run });

  logFiles(files);
}

function logTitle({ test, run }: { test: Test; run: Run }) {
  const dateTimeFormatted = formatDateTimeString(run.dateTime);
  const title = `Test: ${test.title} – Run: ${dateTimeFormatted}`;

  logHeading(title, 1);
}

function logFiles(files: string[]) {
  logHeading("Files", 2);

  const filesTable = files.map((file) => ({ file }));

  logTable(filesTable);

  console.log();
}
