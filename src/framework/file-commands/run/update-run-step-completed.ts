import { isError, isNil } from "lodash";

import {
  isResultError,
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
  projectUpdateTestRun,
} from "../../core";
import { projectMdRead, projectMdWrite } from "../../fs";

export function updateRunStepCompleted({
  projectPath,
  lookupTestNameOrTitle,
  lookupRunDateTime,
  lookupRunStepIndex,
  runStepIsCompleted,
}: {
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime?: string;
  readonly lookupRunStepIndex: number;
  readonly runStepIsCompleted?: boolean;
  readonly projectPath?: string;
}) {
  const project = projectMdRead(projectPath);

  if (isError(project)) {
    return project;
  }

  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(test)) {
    return test;
  }

  const run = projectGetTestRunByDateTimeOrLatest({
    project,
    test,
    lookupRunDateTime,
    lookupTestNameOrTitle,
  });

  if (isError(run)) {
    return run;
  }

  const runSteps = run.steps;

  const runStep = runSteps[lookupRunStepIndex];

  const updatedRunStep = {
    ...runStep,
    isCompleted: isNil(runStepIsCompleted)
      ? !runStep.isCompleted /* toggle if not provided */
      : runStepIsCompleted,
  };

  const updatedRunSteps = runSteps.upsertAt(lookupRunStepIndex, updatedRunStep);

  const updatedRun = {
    ...run,
    steps: updatedRunSteps,
  };

  const updatedProject = projectUpdateTestRun({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime: run.dateTime,
    updateRunChanges: updatedRun,
  });

  if (isResultError(updatedProject)) {
    return updatedProject;
  }

  projectMdWrite(updatedProject.data, projectPath);
}
