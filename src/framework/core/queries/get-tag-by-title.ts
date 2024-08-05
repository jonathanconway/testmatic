import { NotFoundError } from "../../utils";
import { ProjectView, Tag } from "../entities";

export function projectGetTagByTitle({
  project,
  lookupTagTitle,
}: {
  readonly project: ProjectView;
  readonly lookupTagTitle: string;
}): Tag | Error {
  const tagByTitle = project.tagsByTitle[lookupTagTitle];

  if (!tagByTitle) {
    return new NotFoundError(
      `Cannot find tag with title matching "${lookupTagTitle}".`
    );
  }

  return tagByTitle as Tag;
}
