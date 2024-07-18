import { ProjectView, createProjectView } from ".";

import { NotFoundError } from "../../utils";
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
  // todo: cache in lookup in projectview
  if (!test.tags.find((tag) => tag.name === tag.name)) {
    return new NotFoundError(
      `Cannot find tag with name "${tag.name}" in test "${test.title}".`
    );
  }

  const tags = test.tags.filter((existingTag) => existingTag.name !== tag.name);

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
