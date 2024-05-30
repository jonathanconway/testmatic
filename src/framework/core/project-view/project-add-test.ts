import { ProjectView, createProjectView } from ".";

import { AlreadyExistsError } from "../../utils";
import { Test } from "../test";

export function projectAddTest({
  project,
  newTest,
}: {
  readonly project: ProjectView;
  readonly newTest: Test;
}) {
  if (testAlreadyExists(project, newTest)) {
    return new AlreadyExistsError(`Test "${newTest.title}" already exists.`);
  }

  const tests = [...project.tests, newTest];

  const newTestTags = newTest.tags.map(
    (newTestTag) => project.tagsByName[newTestTag.name] ?? newTestTag
  );

  const newTestStepTags = newTest.steps
    .flatMap((step) => step.tags)
    .map(
      (newTestStepTag) =>
        project.tagsByName[newTestStepTag.name] ?? newTestStepTag
    );

  const newTags = [...newTestTags, ...newTestStepTags];

  const newTagsByName = Object.fromEntries(
    newTags.map((newTag) => [newTag.name, newTag])
  );

  const matchedExistingTags = project.tags.map(
    (tag) => newTagsByName[tag.name] ?? project.tagsByName[tag.name]
  );
  const notMatchedNewTags = newTags.filter(
    (tag) => !project.tagsByName[tag.name]
  );

  const tags = [...matchedExistingTags, ...notMatchedNewTags];

  const updatedProject = createProjectView({
    tests,
    tags,
  });

  return updatedProject;
}

function testAlreadyExists(project: ProjectView, test: Test) {
  return Boolean(project.testsByName[test.name]);
}
