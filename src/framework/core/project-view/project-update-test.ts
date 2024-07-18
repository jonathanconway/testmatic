import { isError } from "lodash";

import { Test } from "../test";

import { projectAddNewTagsFromUpdatedTest } from "./project-add-new-tags-from-test";
import { projectGetTestByNameOrTitle } from "./project-get-test-by-name-or-title";
import { ProjectView, createProjectView } from "./project-view";

export function projectUpdateTest({
  project,
  lookupTestNameOrTitle,
  updateTestChanges,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly updateTestChanges: Partial<Test>;
}) {
  const test = projectGetTestByNameOrTitle({
    project,
    lookupTestNameOrTitle,
  });

  if (isError(test)) {
    return test;
  }

  const updatedTest = {
    ...test,
    ...updateTestChanges,
  };

  const tests = project.tests.upsert("name", test.name, updatedTest);

  const tags = projectAddNewTagsFromUpdatedTest({
    project,
    updatedTest,
  });

  return createProjectView({
    ...project,
    tests,
    tags,
  });
}
