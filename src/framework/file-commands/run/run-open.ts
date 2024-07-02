import { exec } from "child_process";
import { isError } from "lodash";

import {
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
} from "../../core";
import { projectMdRead } from "../../fs";
import { getRunFilepath, getRunsFilepath } from "../../markdown";
import { NotFoundError } from "../../utils";

export function runOpen({
  testNameOrTitle,
  runDateTime,
  projectPath,
}: {
  readonly testNameOrTitle: string;
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
  if (isError(getRunResult) && getRunResult instanceof NotFoundError) {
    exec(`open "${getRunsFilepath(test)}"`);
    return;
  }

  const run = getRunResult;

  exec(`open "${getRunFilepath(test, run)}"`);
}
