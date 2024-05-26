import { createCommand } from "commander";

import {
  isError,
  logError,
  projectDeleteRun,
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";

type RunDeleteParameter = string;

export const cliRunDeleteCommand = createCommand("delete")
  .description("Delete a run")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunDelete);

export function cliRunDelete(
  ...[testNameOrTitle, runDateTime]: RunDeleteParameter
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
  const runToDelete = getRunResult;

  const updatedProject = projectDeleteRun({ project, test, runToDelete });

  projectMdWrite(updatedProject);
}
