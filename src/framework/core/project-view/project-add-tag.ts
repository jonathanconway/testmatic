import { ProjectView, createProjectView } from ".";

import { Tag } from "../tag";

export function addProjectTag({
  project,
  newTag,
}: {
  readonly project: ProjectView;
  readonly newTag: Tag;
}) {
  if (tagAlreadyExists(project, newTag)) {
    throw new Error(`Tag ${newTag.name} already exists.`);
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
