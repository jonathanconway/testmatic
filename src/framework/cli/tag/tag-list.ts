import { createCommand } from "commander";

import { getTagFilename } from "../../markdown";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

export const cliTagListCommand = createCommand("list")
  .description("List tags in the current project")
  .action(cliTagList);

export function cliTagList() {
  const { tags } = readProject();

  console.log(
    toAsciiTable(
      Object.values(tags).map((tag) => ({
        Name: tag.title,
        Doc: getTagFilename(tag),
      }))
    )
  );
}
