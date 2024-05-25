import { exec } from "child_process";
import { createCommand } from "commander";

import {
  isError,
  logError,
  projectGetTagByNameOrTitle,
  projectGetTagLinkByHrefOrTitle,
  projectMdRead,
} from "../../framework";

import { PARAM_TAG_LINK_HREF_OR_TITLE } from "./param-tag-link-href-or-title";
import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagLinkOpenParameter = [
  string /* tagNameOrTitle */,
  string /* tagLinkHrefOrTitle */
];

export const cliTagLinkOpenCommand = createCommand("open")
  .description("Open a tag link in the browser")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .argument(
    PARAM_TAG_LINK_HREF_OR_TITLE.name,
    PARAM_TAG_LINK_HREF_OR_TITLE.description
  )
  .action(cliTagOpen);

export function cliTagOpen(
  ...[tagNameOrTitle, tagLinkHrefOrTitle]: TagLinkOpenParameter
) {
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

  const link = projectGetTagLinkByHrefOrTitle({ tag, tagLinkHrefOrTitle });

  exec(`open "${link.href}"`);
}
