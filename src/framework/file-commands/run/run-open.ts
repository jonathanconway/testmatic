import { exec } from "child_process";
import { isError } from "lodash";

import {
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
} from "../../core";
import { projectMdRead } from "../../fs";
import { getRunFilepath, getRunsFilepath } from "../../markdown";
import { NotFoundError } from "../../utils";

export function runOpen({
  lookupTestNameOrTitle,
  lookupRunDateTime,
  projectPath,
}: {
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime?: string;
  readonly projectPath?: string;
}) {
  const project = projectMdRead(projectPath);
  if (isError(project)) {
    return project;
  }

  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });
  if (isError(test)) {
    return test;
  }

  const run = projectGetTestRunByDateTimeOrLatest({
    project,
    lookupTestNameOrTitle,
    test,
    lookupRunDateTime,
  });
  if (isError(run)) {
    if (run instanceof NotFoundError) {
      exec(`open "${getRunsFilepath(test)}"`);
      return;
    } else {
      return run;
    }
  }

  exec(`open "${getRunFilepath(test, run)}"`);
}
