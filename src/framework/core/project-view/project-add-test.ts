import { ProjectView, createProjectView } from ".";

import { AlreadyExistsError } from "../../utils";
import { Test } from "../test";

import { projectAddNewTagsFromUpdatedTest } from "./project-add-new-tags-from-test";

export function projectAddTest({
  project,
  newTest,
}: {
  readonly project: ProjectView;
  readonly newTest: Test;
}) {
  if (getDoesTestAlreadyExist(project, newTest)) {
    return new AlreadyExistsError(`Test "${newTest.title}" already exists.`);
  }

  const tests = [...project.tests, newTest];

  const tags = projectAddNewTagsFromUpdatedTest({
    project,
    updatedTest: newTest,
  });

  const updatedProject = createProjectView({
    tests,
    tags,
  });

  return updatedProject;
}

function getDoesTestAlreadyExist(project: ProjectView, test: Test) {
  return Boolean(project.testsByName[test.name]);
}
