import { isError } from "lodash";

import { createProjectView } from "../entities";
import { projectGetTestByNameOrTitle } from "../queries/get-test-by-name-or-title";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";

export type DeleteRun = Action<
  "delete-run",
  {
    readonly lookupTestNameOrTitle: string;
    readonly lookupRunDateTime: string;
  }
>;

export const projectDeleteRun: ProjectAction<DeleteRun> = ({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
}) => {
  const projectGetTestByNameOrTitleResult = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(projectGetTestByNameOrTitleResult)) {
    return resultError(projectGetTestByNameOrTitleResult);
  }

  const test = projectGetTestByNameOrTitleResult;

  const updatedRuns = test.runs.filter(
    (run) => run.dateTime !== lookupRunDateTime
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

  const projectView = createProjectView({
    ...project,
    tests: updatedTests,
  });

  return resultOkWithData(projectView, "Run deleted.");
};
