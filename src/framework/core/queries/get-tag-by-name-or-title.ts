import { NotFoundError } from "../../utils";
import { ProjectView, Tag } from "../entities";

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

  const tagByTitle: Tag = project.tags.find(
    (tag) => tag.title.toLowerCase().trim() === tagNameOrTitleLowerTrimmed
  )!;

  if (!tagByTitle) {
    return new NotFoundError(
      `Cannot find tag with name or title matching "${lookupTagNameOrTitle}".`
    );
  }

  return tagByTitle;
}
