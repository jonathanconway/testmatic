import { projectGetTestRunLatest } from "./project-get-test-run-latest";
import { ProjectView } from "./project-view";

export function getRunByTestNameOrTitleAndDatetimeOrLatest({
  project,
  testNameOrTitle,
  runDateTime,
}: {
  readonly project: ProjectView;
  readonly testNameOrTitle: string;
  readonly runDateTime: string;
}) {
  const test = project.testsByName[testNameOrTitle];

  if (!test) {
    throw new Error(`Cannot find test with name or title matching "${test}"`);
  }

  const run = runDateTime
    ? test.runs.find((run) => run.dateTime === runDateTime)
    : projectGetTestRunLatest(test);

  if (!run) {
    throw new Error(
      `Cannot find run with date/time stamp matching "${runDateTime}"`
    );
  }

  return { test, run };
}
