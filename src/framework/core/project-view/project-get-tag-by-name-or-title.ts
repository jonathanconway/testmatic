import { ProjectView } from "./project-view";

export function projectGetTagByNameOrTitle({
  project,
  tagNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly tagNameOrTitle: string;
}) {
  const tagByName = project.tagsByName[tagNameOrTitle];
  if (tagByName) {
    return tagByName;
  }

  const tagByTitle = project.tags.find((tag) => tag.title === tagNameOrTitle);
  if (tagByTitle) {
    return tagByTitle;
  }

  throw new Error(
    `Cannot find tag with name or title matching "${tagNameOrTitle}"`
  );
}
