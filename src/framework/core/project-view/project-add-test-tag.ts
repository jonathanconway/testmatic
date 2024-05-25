import { ProjectView, createProjectView } from ".";

import { Tag } from "../tag";
import { Test } from "../test";

export function projectAddTestTag({
  project,
  test,
  tag,
}: {
  readonly project: ProjectView;
  readonly test: Test;
  readonly tag: Tag;
}) {
  if (tagAlreadyExists({ test, tag })) {
    return new Error(
      `Tag "${tag.title}" already exists in test ${test.title}.`
    );
  }

  const tags = [...test.tags, tag];

  const updatedTest = {
    ...test,
    tags,
  };

  const updatedProject = createProjectView({
    ...project,
    tests: project.tests.map((existingTest) =>
      existingTest.name === test.name ? updatedTest : existingTest
    ),
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
