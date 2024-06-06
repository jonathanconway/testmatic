import { createCommand } from "commander";

import {
  isError,
  projectDeleteTag,
  projectGetTagByNameOrTitle,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { logError } from "../utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagDeleteParameter = string /* tagNameOrTitle */;

export const cliTagDeleteCommand = createCommand("delete")
  .description("Delete a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTagDelete);

export function cliTagDelete(tagNameOrTitle: TagDeleteParameter) {
  const project = projectMdRead();
  if (!project) {
    return;
  }

  const getTagResult = projectGetTagByNameOrTitle({ project, tagNameOrTitle });
  if (isError(getTagResult)) {
    logError(getTagResult.message);
    return;
  }

  const tagToDelete = getTagResult;

  const updatedProject = projectDeleteTag({ project, tagToDelete });

  projectMdWrite(updatedProject);
}
