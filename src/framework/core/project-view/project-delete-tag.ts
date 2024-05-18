import { Tag } from "../tag";

import { ProjectView, createProjectView } from "./project-view";

export function deleteProjectTag({
  project,
  tagToDelete,
}: {
  readonly project: ProjectView;
  readonly tagToDelete: Tag;
}) {
  const tags = project.tags.filter((tag) => tag.name != tagToDelete.name);

  return createProjectView({
    ...project,
    tags,
  });
}
