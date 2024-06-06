import { omit } from "lodash";

import { Test } from "../test";

import { ProjectView } from "./project-view";

export function projectDeleteTest({
  project,
  testToDelete,
}: {
  readonly project: ProjectView;
  readonly testToDelete: Test;
}) {
  const tests = project.tests.filter((test) => test.name != testToDelete.name);

  const testsByName: Record<string, Test> = omit(
    project.testsByName,
    testToDelete.name
  );

  return {
    ...project,
    tests,
    testsByName,
  };
}
