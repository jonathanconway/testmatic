import { createCommand } from "commander";

import {
  isError,
  projectDeleteTagLink,
  projectGetTagByNameOrTitle,
  projectGetTagLinkByHrefOrTitle,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { PARAM_LINK_HREF_OR_TITLE } from "../link";
import { logError } from "../utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagDeleteParameter = [
  string /* tagNameOrTitle */,
  string /* linkHrefOrTitle */
];

export const cliTagLinkDeleteCommand = createCommand("delete")
  .description("Delete a link from a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .argument(PARAM_LINK_HREF_OR_TITLE.name, PARAM_LINK_HREF_OR_TITLE.description)
  .action(cliTagDelete);

export function cliTagDelete(
  ...[tagNameOrTitle, linkHrefOrTitle]: TagDeleteParameter
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
  const linkToDelete = getTagLinkResult;

  const updatedProject = projectDeleteTagLink({ project, tag, linkToDelete });

  projectMdWrite(updatedProject);
}
