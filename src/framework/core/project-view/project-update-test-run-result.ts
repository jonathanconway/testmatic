import { isError } from "lodash";

import { RunResult } from "../run";

import { projectGetTestRunByDateTime } from "./project-get-test-run-by-datetime";
import { projectUpdateTestRun } from "./project-update-test-run";
import { ProjectView } from "./project-view";

// todo: allow latest
export function projectUpdateTestRunResult({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
  updateRunResult,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime: string;
  readonly updateRunResult: RunResult;
}) {
  const run = projectGetTestRunByDateTime({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
  });

  if (isError(run)) {
    return run;
  }

  return projectUpdateTestRun({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
    updateRunChanges: {
      result: updateRunResult,
    },
  });
}
