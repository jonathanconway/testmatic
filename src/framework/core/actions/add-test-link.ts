import { isError } from "lodash";

import { AlreadyExistsError } from "../../utils";
import { Link, Test, createProjectView } from "../entities";
import { projectGetTestByNameOrTitle } from "../queries/get-test-by-name-or-title";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";

export type AddTestLink = Action<
  "add-test-link",
  {
    readonly lookupTestNameOrTitle: string;
    readonly newLink: Link;
  }
>;

export const projectAddTestLink: ProjectAction<AddTestLink> = ({
  project,
  lookupTestNameOrTitle,
  newLink,
}) => {
  const projectGetTestByNameOrTitleResult = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(projectGetTestByNameOrTitleResult)) {
    return resultError(projectGetTestByNameOrTitleResult);
  }

  const test = projectGetTestByNameOrTitleResult;

  if (testLinkAlreadyExists(test, newLink)) {
    return resultError(
      new AlreadyExistsError(
        `Link to "${newLink.href}" already exists in test "${test.title}".`
      )
    );
  }

  const updatedLinks = [...test.links, newLink];

  const updatedTest = {
    ...test,
    links: updatedLinks,
  };

  const tests = project.tests.upsert("name", test.name, updatedTest);

  const updatedProject = createProjectView({
    ...project,
    tests,
  });

  return resultOkWithData(updatedProject, "Test link added.");
};

function testLinkAlreadyExists(test: Test, link: Link) {
  return Boolean(
    test.links.map((testLink) => testLink.href).includes(link.href)
  );
}
