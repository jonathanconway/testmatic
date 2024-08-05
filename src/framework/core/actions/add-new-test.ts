import { AlreadyExistsError } from "../../utils";
import { ProjectView, Test, createProjectView } from "../entities";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { projectAddNewTagsFromTest } from "./add-new-tags-from-test";
import { ProjectAction } from "./project-action";

export type AddNewTest = Action<
  "add-new-test",
  {
    readonly newTest: Test;
  }
>;

export const projectAddNewTest: ProjectAction<AddNewTest> = ({
  project,
  newTest,
}) => {
  if (getDoesTestAlreadyExist(project, newTest)) {
    return resultError(
      new AlreadyExistsError(`Test "${newTest.title}" already exists.`)
    );
  }

  const tests = [...project.tests, newTest];

  const tags = projectAddNewTagsFromTest({
    project,
    updatedTest: newTest,
  });

  const updatedProject = createProjectView({
    tests,
    tags,
  });

  return resultOkWithData(updatedProject, "Test added.");
};

function getDoesTestAlreadyExist(project: ProjectView, test: Test) {
  return Boolean(project.testsByName[test.name]);
}
