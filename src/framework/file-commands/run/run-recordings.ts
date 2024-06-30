import { isError } from "lodash";

import {
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
} from "../../core";
import { projectMdRead } from "../../fs";

export function runRecordings({
  testNameOrTitle,
  runDateTime,
}: {
  readonly testNameOrTitle: string;
  readonly runDateTime?: string;
}) {
  const project = projectMdRead();

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

  return run.recordings;
}
