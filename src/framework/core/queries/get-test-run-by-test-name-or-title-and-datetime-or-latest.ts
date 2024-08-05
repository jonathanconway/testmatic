import {
  DateTime,
  ProjectView,
  RUN_DATE_TIME_LATEST,
  RunDateTimeLatest,
} from "../entities";

import { projectGetTestRunByDateTime } from "./get-test-run-by-datetime";
import { projectGetTestRunLatest } from "./get-test-run-latest";

export function getTestRunByTestNameOrTitleAndDateTimeOrLatest({
  project,
  lookupTestNameOrTitle,
  lookupRunDateTime,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime: DateTime | RunDateTimeLatest;
}) {
  if (lookupRunDateTime === RUN_DATE_TIME_LATEST) {
    return projectGetTestRunLatest({
      project,
      lookupTestNameOrTitle,
    });
  } else {
    return projectGetTestRunByDateTime({
      project,
      lookupTestNameOrTitle,
      lookupRunDateTime,
    });
  }
}
