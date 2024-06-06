import { createCommand } from "commander";

import {
  isError,
  projectDeleteTest,
  projectGetTestByNameOrTitle,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { logError } from "../utils";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestDeleteParameter = string /* testNameOrTitle */;

export const cliTestDeleteCommand = createCommand("delete")
  .description("Delete a test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .action(cliTestDelete);

export function cliTestDelete(testNameOrTitle: TestDeleteParameter) {
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

  const testToDelete = getTestResult;

  const updatedProject = projectDeleteTest({ project, testToDelete });

  projectMdWrite(updatedProject);
}
