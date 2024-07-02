import { isError } from "lodash";

import {
  RunResult,
  parseRunResult,
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
  projectUpdateTestRun,
} from "../../core";
import { projectMdRead, projectMdWrite } from "../../fs";

export function runResult({
  testNameOrTitle,
  runResultValue,
  runDateTime,
  projectPath,
}: {
  readonly testNameOrTitle: string;
  readonly runResultValue: RunResult;
  readonly runDateTime?: string;
  readonly projectPath?: string;
}) {
  const project = projectMdRead(projectPath);
  if (!project) {
    return;
  }

  const getTestResult = projectGetTestByNameOrTitle({
    project,
    testNameOrTitle,
  });
  if (isError(getTestResult)) {
    return getTestResult;
  }

  const test = getTestResult;

  const getRunResult = projectGetTestRunByDateTimeOrLatest({
    test,
    runDateTime,
  });
  if (isError(getRunResult)) {
    return getRunResult;
  }

  const run = getRunResult;

  const result = parseRunResult(runResultValue);
  const updatedRun = {
    ...run,
    result,
  };

  const updatedProject = projectUpdateTestRun({ project, test, updatedRun });

  projectMdWrite(updatedProject, projectPath);
}
