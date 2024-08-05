import { isError } from "lodash";

import { AlreadyExistsError } from "../../utils";
import { Tag, Test, createProjectView } from "../entities";
import { projectGetTestByNameOrTitle } from "../queries/get-test-by-name-or-title";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { projectAddNewTagsFromTest } from "./add-new-tags-from-test";
import { ProjectAction } from "./project-action";

export type AddTestTag = Action<
  "add-test-tag",
  {
    readonly lookupTestNameOrTitle: string;
    readonly newTag: Tag;
  }
>;

export const projectAddTestTag: ProjectAction<AddTestTag> = ({
  project,
  lookupTestNameOrTitle,
  newTag,
}) => {
  const projectGetTestByNameOrTitleResult = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(projectGetTestByNameOrTitleResult)) {
    return resultError(projectGetTestByNameOrTitleResult);
  }

  const test = projectGetTestByNameOrTitleResult;

  if (tagAlreadyExists({ test, tag: newTag })) {
    return resultError(
      new AlreadyExistsError(
        `Tag "${newTag.title}" already exists in test "${test.title}".`
      )
    );
  }

  const updatedTestTags = [...test.tags, newTag];

  const updatedTest = {
    ...test,
    tags: updatedTestTags,
  };

  const tests = project.tests.upsert("name", test.name, updatedTest);

  // todo: maybe this should just be built in to createprojectview
  const tags = projectAddNewTagsFromTest({ project, updatedTest });

  const updatedProject = createProjectView({
    ...project,
    tests,
    tags,
  });

  return resultOkWithData(updatedProject, "Test tag added.");
};

function tagAlreadyExists({
  test,
  tag,
}: {
  readonly test: Test;
  readonly tag: Tag;
}) {
  return Boolean(test.tags.includes(tag));
}
