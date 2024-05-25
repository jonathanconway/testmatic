import { ProjectView, createProjectView } from ".";

import { AlreadyExistsError, toGot } from "../../utils";
import { Link } from "../link";
import { Test } from "../test";

export function projectAddTestLink({
  project,
  test,
  newLink,
}: {
  readonly project: ProjectView;
  readonly test: Test;
  readonly newLink: Link;
}) {
  if (testLinkAlreadyExists(project, test, newLink)) {
    return new AlreadyExistsError(
      `Link to "${newLink.href}" already exists in test "${test.title}".`
    );
  }

  const updatedLinks = [...test.links, newLink];

  const updatedTest = {
    ...test,
    links: updatedLinks,
  };

  const tests = project.tests.map((existingTest) =>
    existingTest.name === test.name ? updatedTest : existingTest
  );

  const updatedProject = createProjectView({
    ...project,
    tests,
  });

  return updatedProject;
}

function testLinkAlreadyExists(project: ProjectView, test: Test, link: Link) {
  return Boolean(
    project.tagsByName[test.name].links.map(toGot("href")).includes(link.href)
  );
}
