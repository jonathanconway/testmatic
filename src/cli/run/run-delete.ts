import { createCommand } from "commander";

import {
  projectDeleteRun,
  projectGetTestByNameOrTitle,
} from "../../framework/core";
import { projectGetTestRunByDateTimeOrLatest } from "../../framework/core/project-view/project-get-test-run-by-datetime-or-latest";
import { readProject, writeProject } from "../project.utils";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";
import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type RunDeleteParameter = string;

export const cliRunDeleteCommand = createCommand("delete")
  .description("Delete a run")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunDelete);

export function cliRunDelete(
  ...[testNameOrTitle, runDateTime]: RunDeleteParameter
) {
  const project = readProject();

  const test = projectGetTestByNameOrTitle({ project, testNameOrTitle });

  const runToDelete = projectGetTestRunByDateTimeOrLatest({
    test,
    runDateTime,
  });

  const updatedProject = projectDeleteRun({ project, test, runToDelete });

  writeProject(updatedProject);
}