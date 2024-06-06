import { createCommand } from "commander";

import {
  ProjectView,
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

function createTagFromArgs(project: ProjectView, tagNameOrTitle: string) {
  const getTagResult = projectGetTagByNameOrTitle({ project, tagNameOrTitle });

  if (!isError(getTagResult)) {
    return {
      tag: getTagResult,
      updatedProject: project,
    };
  }

  if (isNotFoundError(getTagResult)) {
    const createTagResult = createTagFromName(tagNameOrTitle);

    if (isError(createTagResult)) {
      return createTagResult;
    }

    const newTag = createTagResult;

    const addTagResult = projectAddTag({
      project,
      newTag,
    });

    if (isError(addTagResult)) {
      return addTagResult;
    }

    const tag = newTag;

    const updatedProject = project;

    return {
      tag,
      updatedProject,
    };
  }

  return getTagResult;
}

function createTestTagFromArgs(
  project: ProjectView,
  [testNameOrTitle, tagNameOrTitle]: TestTagAddParameters
): ProjectView | Error {
  const getTestResult = projectGetTestByNameOrTitle({
    project,
    testNameOrTitle,
  });
  if (isError(getTestResult)) {
    return getTestResult;
  }
  const test = getTestResult;

  const createTagFromArgsResult = createTagFromArgs(project, tagNameOrTitle);
  if (isError(createTagFromArgsResult)) {
    return createTagFromArgsResult;
  }

  const { tag, updatedProject } = createTagFromArgsResult;

  const projectAddTestTagResult = projectAddTestTag({
    project: updatedProject,
    test,
    tag,
  });

  return projectAddTestTagResult!;
}
