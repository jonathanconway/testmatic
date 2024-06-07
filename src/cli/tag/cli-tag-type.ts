import { createCommand } from "commander";

import {
  isError,
  projectGetTagByNameOrTitle,
  projectMdRead,
  projectMdWrite,
  projectUpdateTag,
} from "../../framework";
import { logError } from "../utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";
import { PARAM_TAG_TYPE } from "./param-tag-type";

type TagTypeParameters = [string /* tagNameOrTitle */, string /* tagType */];

export const cliTagTypeCommand = createCommand("type")
  .description("Set the type of a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .argument(PARAM_TAG_TYPE.name, PARAM_TAG_TYPE.description)
  .action(cliTagLinkAdd);

export function cliTagLinkAdd(...args: TagTypeParameters) {
  const [tagNameOrTitle, tagType] = args;

  const project = projectMdRead();

  if (!project) {
    return;
  }

  const getTagResult = projectGetTagByNameOrTitle({ project, tagNameOrTitle });
  if (isError(getTagResult)) {
    logError(getTagResult.message);
    return;
  }

  const tag = getTagResult;

  const updatedTag = {
    ...tag,
    tagType,
  };

  const updatedProject = projectUpdateTag({
    project,
    tagNameOrTitle,
    updatedTag,
  });

  projectMdWrite(updatedProject);
}
