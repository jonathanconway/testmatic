import { ProjectView, createProjectView } from ".";

import { AlreadyExistsError } from "../../utils";
import { Run } from "../run";
import { Test } from "../test";

export function projectAddTestRun({
  project,
  test,
  newRun,
}: {
  readonly project: ProjectView;
  readonly test: Test;
  readonly newRun: Run;
}) {
  if (testRunAlreadyExists(test, newRun)) {
    return new AlreadyExistsError(
      `Run with date/time stamp ${newRun.dateTime} already exists in test "${test.title}".`
    );
  }

  const updatedRuns = [...test.runs, newRun];

  const updatedTest = {
    ...test,
    runs: updatedRuns,
  };

  const updatedProject = createProjectView({
    ...project,
    tests: project.tests.map((existingTest) =>
      existingTest.name === updatedTest.name ? updatedTest : existingTest
    ),
  });

  return updatedProject;
}

function testRunAlreadyExists(test: Test, run: Run) {
  return Boolean(
    test.runs.find((existingRun) => existingRun.dateTime === run.dateTime)
  );
}
