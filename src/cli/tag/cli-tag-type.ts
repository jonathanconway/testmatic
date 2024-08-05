import { createCommand } from "commander";

import {
  projectGetTagByNameOrTitle,
  projectMdRead,
  projectMdWrite,
  projectUpdateTag,
  throwIfError,
  throwIfResultWithDataError,
} from "../../framework";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";
import { PARAM_TAG_TYPE } from "./param-tag-type";

type TagTypeParameters = [
  string /* tagNameOrTitle       */,
  string /* tagType              */
];

export const cliTagTypeCommand = createCommand("type")
  .description("Set the type of a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .argument(PARAM_TAG_TYPE.name, PARAM_TAG_TYPE.description)
  .action(cliTagLinkAdd);

export function cliTagLinkAdd(...args: TagTypeParameters) {
  const [lookupTagNameOrTitle, tagType] = args;

  const project = throwIfError(projectMdRead());

  const tag = throwIfError(
    projectGetTagByNameOrTitle({
      project,
      lookupTagNameOrTitle,
    })
  );

  const updatedTag = {
    ...tag,
    tagType,
  };

  const { data: updatedProject } = throwIfResultWithDataError(
    projectUpdateTag({
      project,
      lookupTagNameOrTitle,
      updatedTag,
    })
  );

  projectMdWrite(updatedProject);
}
