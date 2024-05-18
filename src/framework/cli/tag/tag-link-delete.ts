import { createCommand } from "commander";

import { deleteProjectTagLink, getTagByNameOrTitle } from "../../core";
import { getTagLinkByHrefOrTitle } from "../../core";
import { readProject, writeProject } from "../project.utils";

type TagDeleteParameter = [string, string];

export const cliTagLinkDeleteCommand = createCommand("delete")
  .description("Delete a link from a tag")
  .argument("<tagName>", "Name of the tag")
  .argument("<href>", "Href or title of the link to delete")
  .action(cliTagDelete);

export function cliTagDelete(
  ...[tagNameOrTitle, linkHrefOrTitle]: TagDeleteParameter
) {
  const project = readProject();

  const tag = getTagByNameOrTitle({ project, tagNameOrTitle });

  const linkToDelete = getTagLinkByHrefOrTitle({ tag, linkHrefOrTitle });

  const updatedProject = deleteProjectTagLink({ project, tag, linkToDelete });

  writeProject(updatedProject);
}
