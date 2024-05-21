import { Link } from "../link";
import { Tag } from "../tag";

import { ProjectView, createProjectView } from "./project-view";

export function projectDeleteTagLink({
  project,
  tag,
  linkToDelete,
}: {
  readonly project: ProjectView;
  readonly tag: Tag;
  readonly linkToDelete: Link;
}) {
  const updatedTag = {
    ...tag,
    links: tag.links.filter((link) => link.href !== linkToDelete.href),
  };

  const tags = project.tags.map((tag) =>
    tag.name === updatedTag.name ? updatedTag : tag
  );

  return createProjectView({
    ...project,
    tags,
  });
}
