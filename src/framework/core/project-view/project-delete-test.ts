import omit from "lodash/omit";

import { Test } from "../test";

import { ProjectView } from "./project-view";

export function deleteProjectTest(project: ProjectView) {
  return (testToDelete: Test): ProjectView => {
    const tests = project.tests.filter(
      (test) => test.name != testToDelete.name
    );

    const testsByName = omit(project.testsByName, testToDelete.name);

    return {
      ...project,
      tests,
      testsByName,
    };
  };
}
