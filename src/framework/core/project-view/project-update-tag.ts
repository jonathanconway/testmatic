import { Tag } from "../tag";

import { ProjectView, createProjectView } from "./project-view";

export function projectUpdateTag({
  project,
  tagNameOrTitle,
  updatedTag,
}: {
  readonly project: ProjectView;
  readonly tagNameOrTitle: string;
  readonly updatedTag: Tag;
}) {
  const tag =
    project.tagsByName[tagNameOrTitle] ?? project.tagsByTitle[tagNameOrTitle];

  const updatedTags = project.tags.map((existingTag) =>
    existingTag.name === tag.name ? updatedTag : existingTag
  );

  return createProjectView({
    ...project,
    tags: updatedTags,
  });
}
