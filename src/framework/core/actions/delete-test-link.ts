import { isError } from "lodash";

import { createProjectView } from "../entities";
import { projectGetTestByNameOrTitle } from "../queries/get-test-by-name-or-title";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";

export type DeleteTestLink = Action<
  "delete-test-link",
  {
    readonly lookupTestNameOrTitle: string;
    readonly lookupTestLinkHref: string;
  }
>;

export const projectDeleteTestLink: ProjectAction<DeleteTestLink> = ({
  project,
  lookupTestNameOrTitle,
  lookupTestLinkHref,
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
    links: test.links.filter((link) => link.href !== lookupTestLinkHref),
  };

  const tests = project.tests.upsert("name", test.name, updatedTest);

  const projectView = createProjectView({
    ...project,
    tests,
  });

  return resultOkWithData(projectView, "Test link deleted.");
};
