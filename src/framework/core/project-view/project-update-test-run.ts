import { isError } from "lodash";

import { Run } from "../run";

import { projectGetTestByNameOrTitle } from "./project-get-test-by-name-or-title";
import { projectGetTestRunByDateTime } from "./project-get-test-run-by-datetime";
import { projectUpdateTest } from "./project-update-test";
import { ProjectView } from "./project-view";

// todo: allow latest
export function projectUpdateTestRun({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
  updateRunChanges,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime: string;
  readonly updateRunChanges: Partial<Run>;
}) {
  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(test)) {
    return test;
  }

  const run = projectGetTestRunByDateTime({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
  });

  if (isError(run)) {
    return run;
  }

  const updatedRun: Run = {
    ...run,
    ...updateRunChanges,
  };

  const runs = test.runs.upsert("dateTime", lookupRunDateTime, updatedRun);

  return projectUpdateTest({
    project,
    lookupTestNameOrTitle,
    updateTestChanges: {
      runs,
    },
  });
}
