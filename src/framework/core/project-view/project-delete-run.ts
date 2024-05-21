import { Run } from "../run";
import { Test } from "../test";

import { ProjectView, createProjectView } from "./project-view";

export function projectDeleteRun({
  project,
  test,
  runToDelete,
}: {
  readonly project: ProjectView;
  readonly test: Test;
  readonly runToDelete: Run;
}) {
  const updatedRuns = test.runs.filter(
    (run) => run.dateTime !== runToDelete.dateTime
  );

  const updatedTest = {
    ...test,
    runs: updatedRuns,
  };

  const updatedTests = project.tests.map((existingTest) =>
    existingTest.name === updatedTest.name ? updatedTest : existingTest
  );

  return createProjectView({
    ...project,
    tests: updatedTests,
  });
}
