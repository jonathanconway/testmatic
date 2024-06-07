import { Test } from "../test";

import { ProjectView, createProjectView } from "./project-view";

export function projectUpdateTest({
  project,
  testName,
  updatedTest,
}: {
  readonly project: ProjectView;
  readonly testName: string;
  readonly updatedTest: Test;
}) {
  const updatedTests = project.tests.map((existingTest) =>
    existingTest.name === testName ? updatedTest : existingTest
  );

  return createProjectView({
    ...project,
    tests: updatedTests,
  });
}
