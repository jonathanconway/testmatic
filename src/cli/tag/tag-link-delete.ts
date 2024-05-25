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

import { PARAM_TAG_LINK_HREF_OR_TITLE } from "./param-tag-link-href-or-title";
import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagDeleteParameter = [string, string];

export const cliTagLinkDeleteCommand = createCommand("delete")
  .description("Delete a link from a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .argument(
    PARAM_TAG_LINK_HREF_OR_TITLE.name,
    PARAM_TAG_LINK_HREF_OR_TITLE.description
  )
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

  const linkToDelete = projectGetTagLinkByHrefOrTitle({
    tag,
    tagLinkHrefOrTitle,
  });

  const updatedProject = projectDeleteTagLink({ project, tag, linkToDelete });

  projectMdWrite(updatedProject);
}
