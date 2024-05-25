import { exec } from "child_process";
import { createCommand } from "commander";

import {
  NotFoundError,
  getRunFilepath,
  getRunsFilepath,
  isError,
  logError,
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
  projectMdRead,
} from "../../framework";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";
import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type RunOpenParameter = [string, string];

export const cliRunOpenCommand = createCommand("open")
  .description("Open a run folder")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunOpen);

export function cliRunOpen(
  ...[testNameOrTitle, runDateTime]: RunOpenParameter
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
  if (isError(getRunResult) && getRunResult instanceof NotFoundError) {
    exec(`open "${getRunsFilepath(test)}"`);
    return;
  }

  const run = getRunResult;

  exec(`open "${getRunFilepath(test, run)}"`);
}
