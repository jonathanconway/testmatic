import { ProjectView, createProjectView, projectGetTestByNameOrTitle } from ".";

import { isError } from "lodash";

import { Step } from "../step";

import { projectAddNewTagsFromUpdatedTest } from "./project-add-new-tags-from-test";

//todo: rename to projectAddNewTestStep
export function projectAddTestStep({
  project,
  lookupTestNameOrTitle,
  lookupBeforeStepIndex,
  newStep,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly lookupBeforeStepIndex?: number;
  readonly newStep: Step;
}) {
  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(test)) {
    return test;
  }

  const steps = test.steps.insertAt(newStep, lookupBeforeStepIndex);

  const updatedTest = {
    ...test,
    steps,
  };

  const tests = project.tests.upsert("name", test.name, updatedTest);

  const tags = projectAddNewTagsFromUpdatedTest({
    project,
    updatedTest,
  });

  const updatedProject = createProjectView({
    tests,
    tags,
  });

  return updatedProject;
}
