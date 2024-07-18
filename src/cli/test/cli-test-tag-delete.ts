import { createCommand } from "commander";

import {
  projectDeleteTestTag,
  projectGetTagByNameOrTitle,
  projectGetTestByNameOrTitle,
  projectMdRead,
  projectMdWrite,
  throwIfError,
} from "../../framework";
import { PARAM_TAG_NAME_OR_TITLE } from "../tag";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestTagDeleteParameter = [
  string /* testNameOrTitle */,
  string /* tagNameOrTitle */
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

  const test = throwIfError(
    projectGetTestByNameOrTitle({
      project,
      lookupTestNameOrTitle: lookupTestNameOrTitle,
    })
  );

  const tag = throwIfError(
    projectGetTagByNameOrTitle({
      project,
      lookupTagNameOrTitle,
    })
  );

  const updatedProject = throwIfError(
    projectDeleteTestTag({
      project,
      test,
      tag,
    })
  );

  projectMdWrite(updatedProject);
}
