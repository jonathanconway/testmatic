import { ProjectView, createProjectView, projectGetTagByNameOrTitle } from ".";

import { isError } from "lodash";

import { AlreadyExistsError, toGot } from "../../utils";
import { Link } from "../link";
import { Tag } from "../tag";

export function projectAddTagLink({
  project,
  lookupTagNameOrTitle,
  newLink,
}: {
  readonly project: ProjectView;
  readonly lookupTagNameOrTitle: string;
  readonly newLink: Link;
}) {
  const projectGetTagByNameOrTitleResult = projectGetTagByNameOrTitle({
    project,
    lookupTagNameOrTitle,
  });

  if (isError(projectGetTagByNameOrTitleResult)) {
    return projectGetTagByNameOrTitleResult;
  }

  const tag = projectGetTagByNameOrTitleResult;

  if (tagLinkAlreadyExists(project, tag, newLink)) {
    return new AlreadyExistsError(
      `Link "${newLink.href}" already exists in tag "${tag.title}".`
    );
  }

  const updatedLinks = [...tag.links, newLink];

  const updatedTag = {
    ...tag,
    links: updatedLinks,
  };

  const tags = project.tags.upsert("name", lookupTagNameOrTitle, updatedTag);

  const updatedProject = createProjectView({
    ...project,
    tags,
  });

  return updatedProject;
}

function tagLinkAlreadyExists(project: ProjectView, tag: Tag, link: Link) {
  return Boolean(
    project.tagsByName[tag.name].links.map(toGot("href")).includes(link.href)
  );
}
