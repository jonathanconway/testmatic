import { isError } from "lodash";

import { AlreadyExistsError } from "../../utils";
import { ProjectView, Run, Test, createProjectView } from "../entities";
import { projectGetTestByNameOrTitle } from "../queries/get-test-by-name-or-title";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";

export type AddTestRun = Action<
  "add-test-run",
  {
    readonly lookupTestNameOrTitle: string;
    readonly newRun: Run;
  }
>;

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
    return resultError(test);
  }

  if (testRunAlreadyExists(test, newRun)) {
    return resultError(
      new AlreadyExistsError(
        `Run with date/time stamp ${newRun.dateTime} already exists in test "${test.title}".`
      )
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

  return resultOkWithData(updatedProject, "Test run added.");
}

function testRunAlreadyExists(test: Test, run: Run) {
  return Boolean(
    test.runs.find((existingRun) => existingRun.dateTime === run.dateTime)
  );
}
