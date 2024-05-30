import { createCommand } from "commander";

import {
  isError,
  logError,
  projectDeleteTagLink,
  projectGetTagByNameOrTitle,
  projectGetTagLinkByHrefOrTitle,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { PARAM_LINK_HREF_OR_TITLE } from "../link";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagDeleteParameter = [string, string];

export const cliTagLinkDeleteCommand = createCommand("delete")
  .description("Delete a link from a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .argument(PARAM_LINK_HREF_OR_TITLE.name, PARAM_LINK_HREF_OR_TITLE.description)
  .action(cliTagDelete);

export function cliTagDelete(
  ...[tagNameOrTitle, tagLinkHrefOrTitle]: TagDeleteParameter
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
    linkHrefOrTitle: tagLinkHrefOrTitle,
  });
  if (isError(getTagLinkResult)) {
    logError(getTagLinkResult.message);
    return;
  }
  const linkToDelete = getTagLinkResult;

  const updatedProject = projectDeleteTagLink({ project, tag, linkToDelete });

  projectMdWrite(updatedProject);
}
