import { createCommand } from "commander";

import {
  projectDeleteTagLink,
  projectGetTagByNameOrTitle,
} from "../../framework/core";
import { projectGetTagLinkByHrefOrTitle } from "../../framework/core";
import { readProject, writeProject } from "../project.utils";

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
  const project = readProject();

  const tag = projectGetTagByNameOrTitle({ project, tagNameOrTitle });

  const linkToDelete = projectGetTagLinkByHrefOrTitle({
    tag,
    tagLinkHrefOrTitle,
  });

  const updatedProject = projectDeleteTagLink({ project, tag, linkToDelete });

  writeProject(updatedProject);
}
