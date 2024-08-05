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
  resultError,
  resultOkWithData,
  throwIfError,
  throwIfResultWithDataError,
} from "../../framework";
import { PARAM_TAG_NAME_OR_TITLE } from "../tag";
import { logSuccess } from "../utils";

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

  const updatedProject = throwIfResultWithDataError(
    createTestTagFromArgs(project, args)
  );

  projectMdWrite(updatedProject.data);
}

function createTestTagFromArgs(
  project: ProjectView,
  [lookupTestNameOrTitle, lookupTagNameOrTitle]: TestTagAddParameters
) {
  const updatedProjectWithTag = throwIfResultWithDataError(
    createTagFromArgs({ project, lookupTagNameOrTitle })
  );

  const newTag = throwIfError(
    projectGetTagByNameOrTitle({ project, lookupTagNameOrTitle })
  );

  logSuccess(updatedProjectWithTag.message);

  const updatedProjectWithTestTag = throwIfError(
    projectAddTestTag({
      project: updatedProjectWithTag.data,
      lookupTestNameOrTitle,
      newTag,
    })
  );

  logSuccess(updatedProjectWithTestTag.message);

  return updatedProjectWithTestTag;
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

  if (isNotFoundError(getTagResult)) {
    return createAndAddTagFromArgs({
      project,
      lookupTagNameOrTitle,
    });
  }

  if (isError(getTagResult)) {
    return resultError(getTagResult);
  }

  return resultOkWithData(project);
}

function createAndAddTagFromArgs({
  project,
  lookupTagNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly lookupTagNameOrTitle: string;
}) {
  const newTag = throwIfError(createTagFromName(lookupTagNameOrTitle));

  const updatedProject = throwIfResultWithDataError(
    projectAddTag({
      project,
      newTag,
    })
  );

  return updatedProject;
}
