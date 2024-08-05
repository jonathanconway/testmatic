import { isError } from "lodash";

import {
  RunResult,
  isResultError,
  parseRunResult,
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
  projectUpdateTestRun,
} from "../../core";
import { projectMdRead, projectMdWrite } from "../../fs";

export function runResult({
  lookupTestNameOrTitle,
  runResultValue,
  lookupRunDateTime,
  projectPath,
}: {
  readonly lookupTestNameOrTitle: string;
  readonly runResultValue: RunResult;
  readonly lookupRunDateTime?: string;
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

  const result = parseRunResult(runResultValue);

  const updatedRun = {
    ...run,
    result,
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
