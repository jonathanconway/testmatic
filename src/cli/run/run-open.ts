import { exec } from "child_process";
import { createCommand } from "commander";

import { projectGetTestByNameOrTitle } from "../../framework/core";
import { projectGetTestRunByDateTimeOrLatest } from "../../framework/core/project-view/project-get-test-run-by-datetime-or-latest";
import { getRunFilepath, getRunsFilepath } from "../../framework/markdown";
import { readProject } from "../project.utils";

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
  const project = readProject();

  const test = projectGetTestByNameOrTitle({ project, testNameOrTitle });

  const run = projectGetTestRunByDateTimeOrLatest({ test, runDateTime });

  if (!run) {
    exec(`open "${getRunsFilepath(test)}"`);
    return;
  }

  exec(`open "${getRunFilepath(test, run)}"`);
}
