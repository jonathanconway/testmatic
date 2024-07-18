import { ProjectView, createProjectView, projectGetTestByNameOrTitle } from ".";

import { isError } from "lodash";

import { AlreadyExistsError } from "../../utils";
import "../../utils";
import { Tag } from "../tag";
import { Test } from "../test";

export function projectAddTestTag({
  project,
  lookupTestNameOrTitle,
  tag,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly tag: Tag;
}) {
  const projectGetTestByNameOrTitleResult = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(projectGetTestByNameOrTitleResult)) {
    return projectGetTestByNameOrTitleResult;
  }

  const test = projectGetTestByNameOrTitleResult;

  if (tagAlreadyExists({ test, tag })) {
    return new AlreadyExistsError(
      `Tag "${tag.title}" already exists in test "${test.title}".`
    );
  }

  const tags = [...test.tags, tag];

  const updatedTest = {
    ...test,
    tags,
  };

  const updatedProject = createProjectView({
    ...project,
    tests: project.tests.upsert("name", test.name, updatedTest),
  });

  return updatedProject;
}

function tagAlreadyExists({
  test,
  tag,
}: {
  readonly test: Test;
  readonly tag: Tag;
}) {
  return Boolean(test.tags.includes(tag));
}
