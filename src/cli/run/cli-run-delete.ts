import { createCommand } from "commander";

import {
  projectDeleteRun,
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
  projectMdRead,
  projectMdWrite,
  throwIfError,
} from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";

type RunDeleteParameter = [
  string /* testNameOrTitle */,
  string /* runDateTime */
];

export const cliRunDeleteCommand = createCommand("delete")
  .description("Delete a run")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunDelete);

export function cliRunDelete(
  ...[lookupTestNameOrTitle, lookupRunDateTime]: RunDeleteParameter
) {
  const project = throwIfError(projectMdRead());

  const test = throwIfError(
    projectGetTestByNameOrTitle({
      project,
      lookupTestNameOrTitle,
    })
  );

  const runToDelete = throwIfError(
    projectGetTestRunByDateTimeOrLatest({
      project,
      test,
      lookupRunDateTime,
      lookupTestNameOrTitle,
    })
  );

  const updatedProject = throwIfError(
    projectDeleteRun({
      project,
      lookupTestNameOrTitle,
      runToDelete,
    })
  );

  projectMdWrite(updatedProject);
}
