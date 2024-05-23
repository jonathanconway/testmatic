import { createCommand } from "commander";

import {
  RunResult,
  projectGetTestRunByDateTimeOrLatest,
  projectMdRead,
  projectMdWrite,
  projectUpdateTestRun,
} from "../../framework";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";
import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type RunOpenParameter = [string, string, string | undefined];

export const cliRunResultCommand = createCommand("result")
  .description("Record the result of a run")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument("<runResult>", "Result to record for the run")
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunResult);

export function cliRunResult(
  ...[testName, runResult, runDateTime]: RunOpenParameter
) {
  const project = projectMdRead();

  if (!project) {
    return;
  }

  const test = project.testsByName[testName];

  const run = projectGetTestRunByDateTimeOrLatest({ test, runDateTime });

  const updatedRun = {
    ...run,
    result: runResult as RunResult,
  };

  const updatedProject = projectUpdateTestRun({ project, test, updatedRun });

  projectMdWrite(updatedProject);
}
