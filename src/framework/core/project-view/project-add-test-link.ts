import { ProjectView, createProjectView, projectGetTestByNameOrTitle } from ".";

import { isError } from "lodash";

import { AlreadyExistsError, toGot } from "../../utils";
import { Link } from "../link";
import { Test } from "../test";

export function projectAddTestLink({
  project,
  lookupTestNameOrTitle,
  newLink,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly newLink: Link;
}) {
  const projectGetTestByNameOrTitleResult = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(projectGetTestByNameOrTitleResult)) {
    return projectGetTestByNameOrTitleResult;
  }

  const test = projectGetTestByNameOrTitleResult;

  if (testLinkAlreadyExists(test, newLink)) {
    return new AlreadyExistsError(
      `Link to "${newLink.href}" already exists in test "${test.title}".`
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

  return updatedProject;
}

function testLinkAlreadyExists(test: Test, link: Link) {
  return Boolean(test.links.map(toGot("href")).includes(link.href));
}
