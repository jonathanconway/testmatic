import { Link } from "../link";
import { ProjectView, createProjectView } from "../project-view/project-view";

export function addProjectTag() {}

export function addProjectTagLink({
  project,
  tagName,
  newLink,
}: {
  project: ProjectView;
  tagName: string;
  newLink: Link;
}): ProjectView {
  const updatedTag = {
    ...project.tagsByName[tagName],
    links: [...project.tagsByName[tagName].links, newLink],
  };

  const tags = project.tags.map((tag) =>
    tag.name === tagName ? updatedTag : tag
  );

  return createProjectView({
    ...project,
    tags,
  });
}
