import { Test } from "../test";

import { ProjectView } from "./project-view";

export function projectAddNewTagsFromUpdatedTest({
  project,
  updatedTest,
}: {
  readonly project: ProjectView;
  readonly updatedTest: Test;
}) {
  const newTestTags = updatedTest.tags.map(
    (newTestTag) => project.tagsByName[newTestTag.name] ?? newTestTag
  );

  const newTestStepTags = updatedTest.steps
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

  return tags;
}
