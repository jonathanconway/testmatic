import { AlreadyExistsError } from "../../utils";
import { ProjectView, Tag, createProjectView } from "../entities";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";

export type AddNewTag = Action<
  "add-new-tag",
  {
    readonly newTag: Tag;
  }
>;

export const projectAddTag: ProjectAction<AddNewTag> = ({
  project,
  newTag,
}) => {
  if (tagAlreadyExists(project, newTag)) {
    return resultError(
      new AlreadyExistsError(`Tag "${newTag.title}" already exists.`)
    );
  }

  const tags = [...project.tags, newTag];

  const updatedProject = createProjectView({
    ...project,
    tags,
  });

  return resultOkWithData(updatedProject, "Tag added.");
};

function tagAlreadyExists(project: ProjectView, tag: Tag) {
  return Boolean(project.tagsByName[tag.name]);
}
