import { isError } from "lodash";

import { Run } from "../run";

import { projectGetTestByNameOrTitle } from "./project-get-test-by-name-or-title";
import { ProjectView, createProjectView } from "./project-view";

export function projectDeleteRun({
  project,
  lookupTestNameOrTitle,
  runToDelete,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly runToDelete: Run;
}) {
  const projectGetTestByNameOrTitleResult = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });
  if (isError(projectGetTestByNameOrTitleResult)) {
    return projectGetTestByNameOrTitleResult;
  }

  const test = projectGetTestByNameOrTitleResult;

  const updatedRuns = test.runs.filter(
    (run) => run.dateTime !== runToDelete.dateTime
  );

  const updatedTest = {
    ...test,
    runs: updatedRuns,
  };

  const updatedTests = project.tests.upsert(
    "name",
    updatedTest.name,
    updatedTest
  );

  return createProjectView({
    ...project,
    tests: updatedTests,
  });
}
