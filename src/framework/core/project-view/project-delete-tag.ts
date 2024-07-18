import { isError } from "lodash";

import { projectGetTagByNameOrTitle } from "./project-get-tag-by-name-or-title";
import { ProjectView, createProjectView } from "./project-view";

export function projectDeleteTag({
  project,
  lookupTagNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly lookupTagNameOrTitle: string;
}) {
  const projectGetTagByNameOrTitleResult = projectGetTagByNameOrTitle({
    project,
    lookupTagNameOrTitle,
  });
  if (isError(projectGetTagByNameOrTitleResult)) {
    return projectGetTagByNameOrTitleResult;
  }

  const tags = project.tags.filter((tag) => tag.name !== lookupTagNameOrTitle);

  return createProjectView({
    ...project,
    tags,
  });
}
