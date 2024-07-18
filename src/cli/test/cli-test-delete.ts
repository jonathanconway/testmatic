import { createCommand } from "commander";

import {
  projectDeleteTest,
  projectGetTestByNameOrTitle,
  projectMdRead,
  projectMdWrite,
  throwIfError,
} from "../../framework";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestDeleteParameter = string /* testNameOrTitle */;

export const cliTestDeleteCommand = createCommand("delete")
  .description("Delete a test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .action(cliTestDelete);

export function cliTestDelete(testNameOrTitle: TestDeleteParameter) {
  const project = throwIfError(projectMdRead());

  const testToDelete = throwIfError(
    projectGetTestByNameOrTitle({
      project,
      lookupTestNameOrTitle: testNameOrTitle,
    })
  );

  const updatedProject = projectDeleteTest({ project, testToDelete });

  projectMdWrite(updatedProject);
}
