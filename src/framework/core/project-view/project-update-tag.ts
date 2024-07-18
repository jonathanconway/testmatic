import { isError } from "lodash";

import { Tag } from "../tag";

import { projectGetTagByNameOrTitle } from "./project-get-tag-by-name-or-title";
import { ProjectView, createProjectView } from "./project-view";

export function projectUpdateTag({
  project,
  lookupTagNameOrTitle,
  updatedTag,
}: {
  readonly project: ProjectView;
  readonly lookupTagNameOrTitle: string;
  readonly updatedTag: Tag;
}) {
  const tag = projectGetTagByNameOrTitle({ project, lookupTagNameOrTitle });
  if (isError(tag)) {
    return tag;
  }

  const updatedTags = project.tags.upsert("name", tag.name, updatedTag);

  return createProjectView({
    ...project,
    tags: updatedTags,
  });
}
