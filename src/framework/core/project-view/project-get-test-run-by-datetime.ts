import { isError } from "lodash";

import { NotFoundError } from "../../utils";

import { projectGetTestByNameOrTitle } from "./project-get-test-by-name-or-title";
import { ProjectView } from "./project-view";

export function projectGetTestRunByDateTime({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime: string;
}) {
  const test = projectGetTestByNameOrTitle({ project, lookupTestNameOrTitle });

  if (isError(test)) {
    return test;
  }

  const run = test.runs.find((run) => run.dateTime === lookupRunDateTime);

  if (!run) {
    return new NotFoundError(
      `Cannot find run with date/time stamp matching "${lookupRunDateTime}" in test "${test.title}".`
    );
  }

  return run;
}
