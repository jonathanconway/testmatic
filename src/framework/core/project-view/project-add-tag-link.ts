import { ProjectView, createProjectView } from ".";

import { toGot } from "../../utils";
import { Link } from "../link";
import { Tag } from "../tag";

export function addProjectTagLink({
  project,
  tag,
  newLink,
}: {
  readonly project: ProjectView;
  readonly tag: Tag;
  readonly newLink: Link;
}) {
  if (tagLinkAlreadyExists(project, tag, newLink)) {
    throw new Error(
      `Link to ${newLink.href} already exists in tag ${tag.title}.`
    );
  }

  const updatedLinks = [...tag.links, newLink];

  const updatedTag = {
    ...tag,
    links: updatedLinks,
  };

  const tags = project.tags.map((existingTag) =>
    existingTag.name === tag.name ? updatedTag : existingTag
  );

  const updatedProject = createProjectView({
    ...project,
    tags,
  });

  return updatedProject;
}

function tagLinkAlreadyExists(project: ProjectView, tag: Tag, link: Link) {
  console.log(
    "tagLinkAlreadyExists",
    project.tagsByName[tag.name].links.map(toGot("href"))
  );
  return Boolean(
    project.tagsByName[tag.name].links.map(toGot("href")).includes(link.href)
  );
}
