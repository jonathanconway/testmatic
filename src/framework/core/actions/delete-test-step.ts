import { isError } from "lodash";

import { createProjectView } from "../entities";
import { projectGetTestByNameOrTitle } from "../queries/get-test-by-name-or-title";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";

export type DeleteTestStep = Action<
  "delete-test-step",
  {
    readonly lookupTestNameOrTitle: string;
    readonly lookupStepIndex: number;
  }
>;

export const projectDeleteTestStep: ProjectAction<DeleteTestStep> = ({
  project,
  lookupTestNameOrTitle,
  lookupStepIndex,
}) => {
  const test = projectGetTestByNameOrTitle({ project, lookupTestNameOrTitle });

  if (isError(test)) {
    return resultError(test);
  }

  const updatedTest = {
    ...test,
    steps: test.steps.filter((_, stepIndex) => stepIndex !== lookupStepIndex),
  };

  const tests = project.tests.upsert("name", test.name, updatedTest);

  const projectView = createProjectView({
    ...project,
    tests,
  });

  return resultOkWithData(projectView, "Test step deleted.");
};
