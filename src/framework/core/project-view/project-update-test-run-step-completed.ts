import { isError } from "lodash";

import { projectGetTestRunByDateTime } from "./project-get-test-run-by-datetime";
import { projectUpdateTestRun } from "./project-update-test-run";
import { ProjectView } from "./project-view";

export function projectUpdateTestRunStepCompleted({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
  lookupStepIndex,
  updatedStepIsCompleted,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime: string;
  readonly lookupStepIndex: number;
  readonly updatedStepIsCompleted: boolean;
}) {
  const run = projectGetTestRunByDateTime({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
  });

  if (isError(run)) {
    return run;
  }

  const updatedStep = {
    ...run.steps[lookupStepIndex],
    isCompleted: updatedStepIsCompleted,
  };

  return projectUpdateTestRun({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
    updateRunChanges: {
      steps: run.steps.upsertAt(lookupStepIndex, updatedStep),
    },
  });
}
