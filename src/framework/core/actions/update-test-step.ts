import { isError } from "lodash";

import { createTestStepFromText } from "../entities";
import { projectGetTestByNameOrTitle } from "../queries";
import { resultError } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";
import { projectUpdateTest } from "./update-test";

export type UpdateTestStep = Action<
  "update-test-step",
  {
    readonly lookupTestNameOrTitle: string;
    readonly lookupStepIndex: number;
    readonly updatedStepText: string;
  }
>;

export const projectUpdateTestStep: ProjectAction<UpdateTestStep> = ({
  project,
  lookupTestNameOrTitle,
  lookupStepIndex,
  updatedStepText,
}) => {
  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(test)) {
    return resultError(test);
  }

  const steps = test.steps.upsertAt(
    lookupStepIndex,
    createTestStepFromText(updatedStepText)
  );

  const updatedProject = projectUpdateTest({
    project,
    lookupTestNameOrTitle,
    updateTestChanges: {
      steps,
    },
  });

  return { ...updatedProject, message: "Test step updated." };
};
