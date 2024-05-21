import { Run } from "../run";
import { Test } from "../test";

import { ProjectView, createProjectView } from "./project-view";

export function projectUpdateTestRun({
  project,
  test,
  updatedRun,
}: {
  readonly project: ProjectView;
  readonly test: Test;
  readonly updatedRun: Run;
}) {
  const updatedRuns = test.runs.map((run) =>
    run.dateTime === updatedRun.dateTime ? updatedRun : run
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
