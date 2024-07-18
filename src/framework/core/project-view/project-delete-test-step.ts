import { isError } from "lodash";

import { projectGetTestByNameOrTitle } from "./project-get-test-by-name-or-title";
import { ProjectView, createProjectView } from "./project-view";

export function projectDeleteTestStep({
  project,
  lookupTestNameOrTitle,
  lookupStepIndex,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly lookupStepIndex: number;
}) {
  const test = projectGetTestByNameOrTitle({ project, lookupTestNameOrTitle });
  if (isError(test)) {
    return test;
  }

  const updatedTest = {
    ...test,
    steps: test.steps.filter((_, stepIndex) => stepIndex !== lookupStepIndex),
  };

  const tests = project.tests.upsert("name", test.name, updatedTest);

  return createProjectView({
    ...project,
    tests,
  });
}
