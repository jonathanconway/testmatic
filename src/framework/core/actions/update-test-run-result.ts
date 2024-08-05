import { isError } from "lodash";

import { DateTime, RunDateTimeLatest, RunResult } from "../entities";
import { getTestRunByTestNameOrTitleAndDateTimeOrLatest } from "../queries";
import { resultError } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";
import { projectUpdateTestRun } from "./update-test-run";

export type UpdateTestRunResult = Action<
  "update-test-run-result",
  {
    readonly lookupTestNameOrTitle: string;
    readonly lookupRunDateTime: DateTime | RunDateTimeLatest;
    readonly updateRunResult: RunResult;
  }
>;

export const projectUpdateTestRunResult: ProjectAction<UpdateTestRunResult> = ({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
  updateRunResult,
}) => {
  const run = getTestRunByTestNameOrTitleAndDateTimeOrLatest({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
  });

  if (isError(run)) {
    return resultError(run);
  }

  const projectUpdate = projectUpdateTestRun({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
    updateRunChanges: {
      result: updateRunResult,
    },
  });

  return projectUpdate;
};
