import { ProjectView, Tag, Test } from "../entities";

export function projectGetTestsByTag({
  project,
  tag,
}: {
  readonly project: ProjectView;
  readonly tag: Tag;
}) {
  return project.tests.filter(
    (test: Test) =>
      test.tags.some((testTag) => testTag.name === tag.name) ||
      test.steps.some((step) =>
        step.tags.some((stepTag) => stepTag.name === tag.name)
      )
  );
}
