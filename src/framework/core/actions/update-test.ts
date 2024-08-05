import { isError } from "lodash";

import { Test, createProjectView } from "../entities";
import { projectGetTestByNameOrTitle } from "../queries";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { projectAddNewTagsFromTest } from "./add-new-tags-from-test";
import { ProjectAction } from "./project-action";

export type UpdateTest = Action<
  "update-test",
  {
    readonly lookupTestNameOrTitle: string;
    readonly updateTestChanges: Partial<Test>;
  }
>;

export const projectUpdateTest: ProjectAction<UpdateTest> = ({
  project,
  lookupTestNameOrTitle,
  updateTestChanges,
}) => {
  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(test)) {
    return resultError(test);
  }

  const updatedTest = {
    ...test,
    ...updateTestChanges,
  };

  const tests = project.tests.upsert("name", test.name, updatedTest);

  const tags = projectAddNewTagsFromTest({
    project,
    updatedTest,
  });

  const projectView = createProjectView({
    ...project,
    tests,
    tags,
  });

  return resultOkWithData(projectView, "Test updated.");
};
