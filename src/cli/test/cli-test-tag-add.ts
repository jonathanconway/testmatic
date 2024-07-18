import { createCommand } from "commander";
import { isError } from "lodash";

import {
  ProjectView,
  createTagFromName,
  isNotFoundError,
  projectAddTag,
  projectAddTestTag,
  projectGetTagByNameOrTitle,
  projectMdRead,
  projectMdWrite,
  throwIfError,
} from "../../framework";
import { PARAM_TAG_NAME_OR_TITLE } from "../tag";

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
  const project = throwIfError(projectMdRead());

  const updatedProject = throwIfError(createTestTagFromArgs(project, args));

  projectMdWrite(updatedProject);
}

function createTestTagFromArgs(
  project: ProjectView,
  [lookupTestNameOrTitle, lookupTagNameOrTitle]: TestTagAddParameters
): ProjectView | Error {
  const createTagFromArgsResult = throwIfError(
    createTagFromArgs({ project, lookupTagNameOrTitle })
  );

  const { tag, updatedProject } = createTagFromArgsResult;

  const projectAddTestTagResult = throwIfError(
    projectAddTestTag({
      project: updatedProject,
      lookupTestNameOrTitle,
      tag,
    })
  );

  return projectAddTestTagResult!;
}

function createTagFromArgs({
  project,
  lookupTagNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly lookupTagNameOrTitle: string;
}) {
  const getTagResult = projectGetTagByNameOrTitle({
    project,
    lookupTagNameOrTitle,
  });

  if (!isError(getTagResult)) {
    return {
      tag: getTagResult,
      updatedProject: project,
    };
  }

  if (isNotFoundError(getTagResult)) {
    return createAndAddTagFromArgs({
      project,
      lookupTagNameOrTitle,
    });
  }

  return getTagResult;
}

function createAndAddTagFromArgs({
  project,
  lookupTagNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly lookupTagNameOrTitle: string;
}) {
  const newTag = throwIfError(createTagFromName(lookupTagNameOrTitle));

  const updatedProject = throwIfError(
    projectAddTag({
      project,
      newTag,
    })
  );

  return {
    tag: newTag,
    updatedProject,
  };
}
