import { isError } from "lodash";

import { DateTime } from "../entities";
import { projectGetTestRunByDateTime } from "../queries";
import { resultError } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";
import { projectUpdateTestRun } from "./update-test-run";

export type UpdateTestRunStepCompleted = Action<
  "update-test-run-step-completed",
  {
    readonly lookupTestNameOrTitle: string;
    readonly lookupRunDateTime: DateTime;
    readonly lookupStepIndex: number;
    readonly updatedStepIsCompleted: boolean;
  }
>;

export const projectUpdateTestRunStepCompleted: ProjectAction<
  UpdateTestRunStepCompleted
> = ({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
  lookupStepIndex,
  updatedStepIsCompleted,
}) => {
  const run = projectGetTestRunByDateTime({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
  });

  if (isError(run)) {
    return resultError(run);
  }

  const updatedStep = {
    ...run.steps[lookupStepIndex],
    isCompleted: updatedStepIsCompleted,
  };

  const updatedProject = projectUpdateTestRun({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
    updateRunChanges: {
      steps: run.steps.upsertAt(lookupStepIndex, updatedStep),
    },
  });

  return { ...updatedProject, message: "Update test run step status." };
};
