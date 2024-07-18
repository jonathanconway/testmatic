import { Test } from "../test";

import { projectGetTestRunByDateTime } from "./project-get-test-run-by-datetime";
import { projectGetTestRunLatest } from "./project-get-test-run-latest";
import { ProjectView } from "./project-view";

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
