import { ProjectView, createProjectView } from ".";

import { Tag } from "../tag";
import { Test } from "../test";

export function projectDeleteTestTag({
  project,
  test,
  tag,
}: {
  readonly project: ProjectView;
  readonly test: Test;
  readonly tag: Tag;
}) {
  const tags = test.tags.filter((existingTag) => existingTag.name !== tag.name);

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
