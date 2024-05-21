import { Run } from "../run";
import { Test } from "../test";

import { projectGetTestRunByDateTime } from "./project-get-test-run-by-datetime";
import { projectGetTestRunLatest } from "./project-get-test-run-latest";

export function projectGetTestRunByDateTimeOrLatest({
  test,
  runDateTime,
}: {
  readonly test: Test;
  readonly runDateTime?: string;
}): Run {
  const run = runDateTime
    ? projectGetTestRunByDateTime(test, runDateTime)
    : projectGetTestRunLatest(test);

  if (!run) {
    if (runDateTime) {
      throw new Error(
        `Run with date/time stamp "${runDateTime}" in test "${test.title}" cannot be found.`
      );
    } else {
      throw new Error(`No runs can be found in test "${test.title}".`);
    }
  }

  return run;
}
