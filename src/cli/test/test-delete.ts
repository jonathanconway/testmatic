import { createCommand } from "commander";

import {
  projectDeleteTest,
  projectGetTestByNameOrTitle,
} from "../../framework/core";
import { readProject, writeProject } from "../project.utils";
import { PARAM_TEST_NAME_OR_TITLE } from "../run/param-test-name-or-title";

type TestDeleteParameter = string;

export const cliTestDeleteCommand = createCommand("delete")
  .description("Delete a test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .action(cliTestDelete);

export function cliTestDelete(testNameOrTitle: TestDeleteParameter) {
  const project = readProject();

  const testToDelete = projectGetTestByNameOrTitle({
    project,
    testNameOrTitle,
  });

  const updatedProject = projectDeleteTest({ project, testToDelete });

  writeProject(updatedProject);
}
