import { projectGetTestRunByDateTime } from "./project-get-test-run-by-datetime";
import { projectGetTestRunLatest } from "./project-get-test-run-latest";
import { ProjectView } from "./project-view";

export function getRunByTestNameOrTitleAndDateTimeOrLatest({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime?: string;
}) {
  if (lookupRunDateTime) {
    return projectGetTestRunByDateTime({
      project,
      lookupTestNameOrTitle,
      lookupRunDateTime,
    });
  } else {
    return projectGetTestRunLatest({
      project,
      lookupTestNameOrTitle,
    });
  }
}
