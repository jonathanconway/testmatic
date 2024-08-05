import { createCommand } from "commander";

import {
  projectDeleteRun,
  projectMdRead,
  projectMdWrite,
  throwIfError,
  throwIfResultWithDataError,
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

  const { data: updatedProject } = throwIfResultWithDataError(
    projectDeleteRun({
      project,
      lookupTestNameOrTitle,
      lookupRunDateTime,
    })
  );

  projectMdWrite(updatedProject);
}
