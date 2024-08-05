import { isError } from "lodash";

import { createProjectView } from "../entities";
import { projectGetTagByNameOrTitle } from "../queries/get-tag-by-name-or-title";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";

export type DeleteTagLink = Action<
  "delete-tag-link",
  {
    readonly lookupTagNameOrTitle: string;
    readonly lookupLinkHref: string;
  }
>;

export const projectDeleteTagLink: ProjectAction<DeleteTagLink> = ({
  project,

  lookupTagNameOrTitle,
  lookupLinkHref,
}) => {
  const projectGetTagByNameOrTitleResult = projectGetTagByNameOrTitle({
    project,
    lookupTagNameOrTitle,
  });

  if (isError(projectGetTagByNameOrTitleResult)) {
    return resultError(projectGetTagByNameOrTitleResult);
  }

  const tag = projectGetTagByNameOrTitleResult;

  const updatedTag = {
    ...tag,
    links: tag.links.filter((link) => link.href !== lookupLinkHref),
  };

  const tags = project.tags.upsert("name", updatedTag.name, updatedTag);

  const projectView = createProjectView({
    ...project,
    tags,
  });

  return resultOkWithData(projectView, "Tag link deleted.");
};
