import { createCommand } from "commander";

import {
  ProjectView,
  Tag,
  createTagFromName,
  isError,
  isNotFoundError,
  projectAddTag,
  projectAddTestTag,
  projectGetTagByNameOrTitle,
  projectGetTestByNameOrTitle,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { PARAM_TAG_NAME_OR_TITLE } from "../tag";
import { logError } from "../utils";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestTagAddParameters = [
  string /* testNameOrTitle */,
  string /* tagNameOrTitle */
];

export const cliTestTagAddCommand = createCommand("add")
  .description("Add a new tag to the test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTestTagAdd);

export function cliTestTagAdd(...args: TestTagAddParameters) {
  const project = projectMdRead();
  if (!project) {
    return;
  }

  const createTestTagResult = createTestTagFromArgs(project, args);
  if (isError(createTestTagResult)) {
    logError(createTestTagResult.message);
    return;
  }
  const updatedProject = createTestTagResult;

  projectMdWrite(updatedProject);
}

function createTestTagFromArgs(
  project: ProjectView,
  [testNameOrTitle, tagNameOrTitle]: TestTagAddParameters
) {
  const getTestResult = projectGetTestByNameOrTitle({
    project,
    testNameOrTitle,
  });
  if (isError(getTestResult)) {
    return getTestResult;
  }
  const test = getTestResult;

  let tag: Tag | Error | undefined;

  let updatedProject = project;

  const getTagResult = projectGetTagByNameOrTitle({ project, tagNameOrTitle });
  if (isNotFoundError(getTagResult)) {
    const createTagResult = createTagFromName(tagNameOrTitle);

    if (isError(createTagResult)) {
      return createTagResult;
    }

    const newTag = createTagResult;

    updatedProject = projectAddTag({
      project,
      newTag,
    });

    tag = newTag;
  }

  if (!tag || isError(tag)) {
    return new Error("Could not create tag");
  }

  const projectAddTestTagResult = projectAddTestTag({
    project: updatedProject,
    test,
    tag,
  });
  if (isError(projectAddTestTagResult)) {
    return projectAddTestTagResult;
  }

  updatedProject = projectAddTestTagResult;

  return updatedProject!;
}
