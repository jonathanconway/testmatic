import { isError, orderBy } from "lodash";

import { NotFoundError } from "../../utils";
import { ProjectView } from "../entities";

import { projectGetTestByNameOrTitle } from "./get-test-by-name-or-title";

export function projectGetTestRunLatest({
  project,
  lookupTestNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
}) {
  const test = projectGetTestByNameOrTitle({ project, lookupTestNameOrTitle });

  if (isError(test)) {
    return test;
  }

  const run = orderBy(test.runs, "dateTime", "desc")?.[0];

  if (!run) {
    return new NotFoundError(`No runs can be found in test "${test.title}".`);
  }

  return run;
}
