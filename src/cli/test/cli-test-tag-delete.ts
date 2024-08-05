import { createCommand } from "commander";

import {
  projectDeleteTestTag,
  projectMdRead,
  projectMdWrite,
  throwIfError,
  throwIfResultWithDataError,
} from "../../framework";
import { PARAM_TAG_NAME_OR_TITLE } from "../tag";
import { logSuccess } from "../utils";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestTagDeleteParameter = [
  string /* lookupTestNameOrTitle */,
  string /* lookupTagNameOrTitle */
];

export const cliTestTagDeleteCommand = createCommand("delete")
  .description("Delete a tag from a test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTestTagDelete);

export function cliTestTagDelete([
  lookupTestNameOrTitle,
  lookupTagNameOrTitle,
]: TestTagDeleteParameter) {
  const project = throwIfError(projectMdRead());

  const updatedProject = throwIfResultWithDataError(
    projectDeleteTestTag({
      project,
      lookupTestNameOrTitle,
      lookupTagNameOrTitle,
    })
  );

  projectMdWrite(updatedProject.data);

  logSuccess(updatedProject.message);
}
