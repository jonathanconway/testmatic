import { Link } from "../link";
import { Test } from "../test";

import { ProjectView, createProjectView } from "./project-view";

export function projectDeleteTestLink({
  project,
  test,
  linkToDelete,
}: {
  readonly project: ProjectView;
  readonly test: Test;
  readonly linkToDelete: Link;
}) {
  const updatedTest = {
    ...test,
    links: test.links.filter((link) => link.href !== linkToDelete.href),
  };

  const tests = project.tests.upsert("name", test.name, updatedTest);

  return createProjectView({
    ...project,
    tests,
  });
}
