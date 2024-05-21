import { Tag } from "../tag";

import { ProjectView } from "./project-view";

export function projectGetTestsByTag({
  project,
  tag,
}: {
  readonly project: ProjectView;
  readonly tag: Tag;
}) {
  return project.tests.filter((test) => test.tags.includes(tag));
}
