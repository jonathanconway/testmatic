import { NotFoundError } from "../../utils";
import { Tag } from "../tag";

import { ProjectView } from "./project-view";

export function projectGetTagByNameOrTitle({
  project,
  lookupTagNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly lookupTagNameOrTitle: string;
}): Tag | Error {
  const tagByName = project.tagsByName[lookupTagNameOrTitle];
  if (tagByName) {
    return tagByName;
  }

  // todo: optimise
  const tagNameOrTitleLowerTrimmed = lookupTagNameOrTitle.toLowerCase().trim();
  const tagByTitle = project.tags.find(
    (tag) => tag.title.toLowerCase().trim() === tagNameOrTitleLowerTrimmed
  );

  if (!tagByTitle) {
    return new NotFoundError(
      `Cannot find tag with name or title matching "${lookupTagNameOrTitle}".`
    );
  }

  return tagByTitle;
}
