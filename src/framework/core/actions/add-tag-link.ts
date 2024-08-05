import { isError } from "lodash";

import { AlreadyExistsError } from "../../utils";
import { Link, ProjectView, Tag, createProjectView } from "../entities";
import { projectGetTagByNameOrTitle } from "../queries/get-tag-by-name-or-title";
import { resultError, resultOk, resultOkWithData } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";

export type AddTagLink = Action<
  "add-tag-link",
  {
    readonly lookupTagNameOrTitle: string;
    readonly newLink: Link;
  }
>;

export const projectAddTagLink: ProjectAction<AddTagLink> = ({
  project,
  lookupTagNameOrTitle,
  newLink,
}) => {
  const tag = projectGetTagByNameOrTitle({
    project,
    lookupTagNameOrTitle,
  });

  if (isError(tag)) {
    return resultError(tag);
  }

  if (tagLinkAlreadyExists(project, tag, newLink)) {
    return resultError(
      new AlreadyExistsError(
        `Link "${newLink.href}" already exists in tag "${tag.title}".`
      )
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

  return resultOkWithData(updatedProject, "Tag link added.");
};

function tagLinkAlreadyExists(project: ProjectView, tag: Tag, link: Link) {
  const matchedTag = project.tagsByName[tag.name];
  return Boolean(
    matchedTag.links.map((tagLink: Link) => tagLink.href).includes(link.href)
  );
}
