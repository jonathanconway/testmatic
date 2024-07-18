import { createCommand } from "commander";

import {
  projectDeleteTagLink,
  projectMdRead,
  projectMdWrite,
  throwIfError,
} from "../../framework";
import { PARAM_LINK_HREF } from "../link";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagLinkDeleteParameter = [
  string /* tagNameOrTitle */,
  string /* linkHrefOrTitle */
];

export const cliTagLinkDeleteCommand = createCommand("delete")
  .description("Delete a link from a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .argument(PARAM_LINK_HREF.name, PARAM_LINK_HREF.description)
  .action(cliTagDelete);

export function cliTagDelete(
  ...[lookupTagNameOrTitle, lookupLinkHref]: TagLinkDeleteParameter
) {
  const project = throwIfError(projectMdRead());

  const updatedProject = throwIfError(
    projectDeleteTagLink({
      project,
      lookupTagNameOrTitle,
      lookupLinkHref,
    })
  );

  projectMdWrite(updatedProject);
}
