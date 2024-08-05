import { isError } from "lodash";

import { createProjectView } from "../entities";
import { projectGetTestByNameOrTitle } from "../queries";
import { resultError, resultOk, resultOkWithData } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";

export type DeleteTest = Action<
  "delete-test",
  {
    readonly lookupTestNameOrTitle: string;
  }
>;

export const projectDeleteTest: ProjectAction<DeleteTest> = ({
  project,
  lookupTestNameOrTitle,
}) => {
  const lookupTest = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(lookupTest)) {
    return resultError(lookupTest);
  }

  const tests = project.tests.filter((test) => test.name != lookupTest.name);

  const updatedProject = createProjectView({
    ...project,
    tests,
  });

  return resultOkWithData(updatedProject);
};
