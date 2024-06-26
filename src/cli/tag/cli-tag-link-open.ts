import { exec } from "child_process";
import { createCommand } from "commander";

import {
  isError,
  projectGetTagByNameOrTitle,
  projectGetTagLinkByHrefOrTitle,
  projectMdRead,
} from "../../framework";
import { PARAM_LINK_HREF_OR_TITLE } from "../link";
import { logError } from "../utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagLinkOpenParameter = [
  string /* tagNameOrTitle */,
  string /* linkHrefOrTitle */
];

export const cliTagLinkOpenCommand = createCommand("open")
  .description("Open a tag link in the browser")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .argument(PARAM_LINK_HREF_OR_TITLE.name, PARAM_LINK_HREF_OR_TITLE.description)
  .action(cliTagOpen);

export function cliTagOpen(
  ...[tagNameOrTitle, linkHrefOrTitle]: TagLinkOpenParameter
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

  const getTagLinkResult = projectGetTagLinkByHrefOrTitle({
    tag,
    linkHrefOrTitle,
  });
  if (isError(getTagLinkResult)) {
    logError(getTagLinkResult.message);
    return;
  }
  const link = getTagLinkResult;

  exec(`open "${link.href}"`);
}
