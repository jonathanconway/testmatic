import { Tag } from "../tag";

import { ProjectView } from "./project-view";

export function projectGetTagByNameOrTitle({
  project,
  tagNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly tagNameOrTitle: string;
}): Tag | Error {
  const tagByName = project.tagsByName[tagNameOrTitle];
  if (tagByName) {
    return tagByName;
  }

  const tagNameOrTitleLowerTrimmed = tagNameOrTitle.toLowerCase().trim();
  const tagByTitle = project.tags.find(
    (tag) => tag.title.toLowerCase().trim() === tagNameOrTitleLowerTrimmed
  );

  if (tagByTitle) {
    return tagByTitle;
  }

  return new Error(
    `Cannot find tag with name or title matching "${tagNameOrTitle}"`
  );
}
