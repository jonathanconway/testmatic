import { isError } from "lodash";

import { DateTime, ProjectView, Run, RunDateTimeLatest } from "../entities";
import {
  getTestRunByTestNameOrTitleAndDateTimeOrLatest,
  projectGetTestByNameOrTitle,
} from "../queries";
import { ResultWithData, resultError } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";
import { projectUpdateTest } from "./update-test";

export type UpdateTestRun = Action<
  "update-test-run",
  {
    readonly lookupTestNameOrTitle: string;
    readonly lookupRunDateTime: DateTime | RunDateTimeLatest;
    readonly updateRunChanges: Partial<Run>;
  }
>;

export const projectUpdateTestRun: ProjectAction<UpdateTestRun> = ({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
  updateRunChanges,
}) => {
  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(test)) {
    return resultError(test);
  }

  const run = getTestRunByTestNameOrTitleAndDateTimeOrLatest({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
  });

  if (isError(run)) {
    return resultError(run);
  }

  const updatedRun: Run = {
    ...run,
    ...updateRunChanges,
  };

  const runs = test.runs.upsert("dateTime", lookupRunDateTime, updatedRun);

  const updatedProject = projectUpdateTest({
    project,
    lookupTestNameOrTitle,
    updateTestChanges: {
      runs,
    },
  });

  return {
    ...updatedProject,
    message: "Test run updated.",
  } as ResultWithData<ProjectView>;
};
