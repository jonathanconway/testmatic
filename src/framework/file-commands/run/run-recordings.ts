import { isError } from "lodash";

import { logError } from "../../../cli";
import {
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
} from "../../core";
import { projectMdRead } from "../../fs";

export function runRecordings({
  lookupTestNameOrTitle,
  lookupRunDateTime,
}: {
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime?: string;
}) {
  const project = projectMdRead();

  if (isError(project)) {
    logError(project.message);
    return;
  }

  const getTestResult = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(getTestResult)) {
    return getTestResult;
  }

  const test = getTestResult;

  const getRunResult = projectGetTestRunByDateTimeOrLatest({
    project,
    test,
    lookupRunDateTime,
    lookupTestNameOrTitle,
  });

  if (isError(getRunResult)) {
    return getRunResult;
  }

  const run = getRunResult;

  return run.recordings;
}
