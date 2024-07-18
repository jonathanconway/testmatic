import { isError } from "lodash";

import { createTestStepFromText } from "../step";

import { projectGetTestByNameOrTitle } from "./project-get-test-by-name-or-title";
import { projectUpdateTest } from "./project-update-test";
import { ProjectView } from "./project-view";

export function projectUpdateTestStep({
  project,
  lookupTestNameOrTitle,
  lookupStepIndex,
  updatedStepText,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly lookupStepIndex: number;
  readonly updatedStepText: string;
}) {
  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(test)) {
    return test;
  }

  const steps = test.steps.upsertAt(
    lookupStepIndex,
    createTestStepFromText(updatedStepText)
  );

  return projectUpdateTest({
    project,
    lookupTestNameOrTitle,
    updateTestChanges: {
      steps,
    },
  });
}
