import { isError } from "lodash";

import { Step, createProjectView } from "../entities";
import { projectGetTestByNameOrTitle } from "../queries/get-test-by-name-or-title";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { projectAddNewTagsFromTest } from "./add-new-tags-from-test";
import { ProjectAction } from "./project-action";

export type AddNewTestStep = Action<
  "add-new-test-step",
  {
    readonly lookupTestNameOrTitle: string;
    readonly lookupBeforeStepIndex?: number;
    readonly newStep: Step;
  }
>;

export const projectAddNewTestStep: ProjectAction<AddNewTestStep> = ({
  project,
  lookupTestNameOrTitle,
  lookupBeforeStepIndex,
  newStep,
}) => {
  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(test)) {
    return resultError(test);
  }

  const steps = test.steps.insertAt(newStep, lookupBeforeStepIndex);

  const updatedTest = {
    ...test,
    steps,
  };

  const tests = project.tests.upsert("name", test.name, updatedTest);

  const tags = projectAddNewTagsFromTest({
    project,
    updatedTest,
  });

  const updatedProject = createProjectView({
    tests,
    tags,
  });

  return resultOkWithData(updatedProject, "Test step added.");
};
