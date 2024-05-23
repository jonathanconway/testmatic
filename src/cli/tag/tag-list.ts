import { createCommand } from "commander";

import { getTagFilename, projectMdRead } from "../../framework";
import { toAsciiTable } from "../ascii.utils";

export const cliTagListCommand = createCommand("list")
  .description("List tags in the current project")
  .action(cliTagList);

export function cliTagList() {
  const project = projectMdRead();

  if (!project) {
    return;
  }

  const { tags } = project;

  console.log(
    toAsciiTable(
      Object.values(tags).map((tag) => ({
        Name: tag.title,
        Doc: getTagFilename(tag),
      }))
    )
  );
}
