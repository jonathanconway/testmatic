import { createCommand } from "commander";

import {
  projectDeleteTag,
  projectMdRead,
  projectMdWrite,
  throwIfError,
} from "../../framework";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagDeleteParameter = string /* tagNameOrTitle */;

export const cliTagDeleteCommand = createCommand("delete")
  .description("Delete a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTagDelete);

export function cliTagDelete(tagNameOrTitle: TagDeleteParameter) {
  const project = throwIfError(projectMdRead());

  const updatedProject = throwIfError(
    projectDeleteTag({
      project,
      lookupTagNameOrTitle: tagNameOrTitle,
    })
  );

  projectMdWrite(updatedProject);
}
