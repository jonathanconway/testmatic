import { createCommand } from "commander";

import {
  isError,
  projectDeleteTestTag,
  projectGetTagByNameOrTitle,
  projectGetTestByNameOrTitle,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { PARAM_TAG_NAME_OR_TITLE } from "../tag";
import { logError } from "../utils";

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
  testNameOrTitle,
  tagNameOrTitle,
]: TestTagDeleteParameter) {
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

  const test = getTestResult;

  const getTagResult = projectGetTagByNameOrTitle({
    project,
    tagNameOrTitle,
  });
  if (isError(getTagResult)) {
    logError(getTagResult.message);
    return;
  }

  const tag = getTagResult;

  const updatedProject = projectDeleteTestTag({ project, test, tag });

  projectMdWrite(updatedProject);
}
