import { ProjectView, createProjectView, projectGetTestByNameOrTitle } from ".";

import { isError } from "lodash";

import { AlreadyExistsError } from "../../utils";
import { Run } from "../run";
import { Test } from "../test";

export function projectAddTestRun({
  project,
  lookupTestNameOrTitle,
  newRun,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly newRun: Run;
}) {
  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(test)) {
    return test;
  }

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
    tests: project.tests.upsert("name", updatedTest.name, updatedTest),
  });

  return updatedProject;
}

function testRunAlreadyExists(test: Test, run: Run) {
  return Boolean(
    test.runs.find((existingRun) => existingRun.dateTime === run.dateTime)
  );
}
