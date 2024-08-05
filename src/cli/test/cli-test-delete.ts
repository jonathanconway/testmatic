import { createCommand } from "commander";

import {
  isResultError,
  projectDeleteTest,
  projectMdRead,
  projectMdWrite,
  throwIfError,
} from "../../framework";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestDeleteParameter = string /* lookupTestNameOrTitle */;

export const cliTestDeleteCommand = createCommand("delete")
  .description("Delete a test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .action(cliTestDelete);

export function cliTestDelete(lookupTestNameOrTitle: TestDeleteParameter) {
  const project = throwIfError(projectMdRead());

  const updatedProject = projectDeleteTest({ project, lookupTestNameOrTitle });

  if (isResultError(updatedProject)) {
    throwIfError(updatedProject);
    return;
  }

  projectMdWrite(updatedProject.data);
}
