import { ProjectView, Test } from "../entities";

import { projectGetTestRunByDateTime } from "./get-test-run-by-datetime";
import { projectGetTestRunLatest } from "./get-test-run-latest";

// todo: remove if no longer used
export function projectGetTestRunByDateTimeOrLatest({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly test: Test;
  readonly lookupRunDateTime?: string;
}) {
  return lookupRunDateTime
    ? projectGetTestRunByDateTime({
        project,
        lookupTestNameOrTitle,
        lookupRunDateTime,
      })
    : projectGetTestRunLatest({ project, lookupTestNameOrTitle });
}
