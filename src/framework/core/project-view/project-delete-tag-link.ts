import { isError } from "lodash";

import { projectGetTagByNameOrTitle } from "./project-get-tag-by-name-or-title";
import { ProjectView, createProjectView } from "./project-view";

export function projectDeleteTagLink({
  project,
  lookupTagNameOrTitle,
  lookupLinkHref,
}: {
  readonly project: ProjectView;
  readonly lookupTagNameOrTitle: string;
  readonly lookupLinkHref: string;
}) {
  const projectGetTagByNameOrTitleResult = projectGetTagByNameOrTitle({
    project,
    lookupTagNameOrTitle,
  });
  if (isError(projectGetTagByNameOrTitleResult)) {
    return projectGetTagByNameOrTitleResult;
  }

  const tag = projectGetTagByNameOrTitleResult;

  const updatedTag = {
    ...tag,
    links: tag.links.filter((link) => link.href !== lookupLinkHref),
  };

  const tags = project.tags.upsert("name", updatedTag.name, updatedTag);

  return createProjectView({
    ...project,
    tags,
  });
}
