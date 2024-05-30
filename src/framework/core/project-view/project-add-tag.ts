import { ProjectView, createProjectView } from ".";

import { AlreadyExistsError } from "../../utils";
import { Tag } from "../tag";

export function projectAddTag({
  project,
  newTag,
}: {
  readonly project: ProjectView;
  readonly newTag: Tag;
}) {
  if (tagAlreadyExists(project, newTag)) {
    return new AlreadyExistsError(`Tag "${newTag.name}" already exists.`);
  }

  const tags = [...project.tags, newTag];

  const updatedProject = createProjectView({
    ...project,
    tags,
  });

  return updatedProject;
}

function tagAlreadyExists(project: ProjectView, tag: Tag) {
  return Boolean(project.tagsByName[tag.name]);
}
