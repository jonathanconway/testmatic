import { createCommand } from "commander";

import {
  isError,
  logError,
  parseRunResult,
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
  projectMdRead,
  projectMdWrite,
  projectUpdateTestRun,
} from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";

type RunOpenParameter = [string, string, string | undefined];

export const cliRunResultCommand = createCommand("result")
  .description("Record the result of a run")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument("<runResult>", "Result to record for the run")
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunResult);

export function cliRunResult(
  ...[testNameOrTitle, runResult, runDateTime]: RunOpenParameter
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

  const result = parseRunResult(runResult);
  const updatedRun = {
    ...run,
    result,
  };

  const updatedProject = projectUpdateTestRun({ project, test, updatedRun });

  projectMdWrite(updatedProject);
}
