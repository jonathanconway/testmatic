import { createCommand } from "commander";

import {
  projectDeleteTag,
  projectGetTagByNameOrTitle,
  projectMdRead,
  projectMdWrite,
} from "../../framework";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagDeleteParameter = string;

export const cliTagDeleteCommand = createCommand("delete")
  .description("Delete a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTagDelete);

export function cliTagDelete(tagNameOrTitle: TagDeleteParameter) {
  const project = projectMdRead();

  if (!project) {
    return;
  }

  const tagToDelete = projectGetTagByNameOrTitle({ project, tagNameOrTitle });

  const updatedProject = projectDeleteTag({ project, tagToDelete });

  projectMdWrite(updatedProject);
}
