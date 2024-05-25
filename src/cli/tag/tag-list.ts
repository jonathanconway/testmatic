import { createCommand } from "commander";

import { getTagFilename, logTable, projectMdRead } from "../../framework";

export const cliTagListCommand = createCommand("list")
  .description("List tags in the current project")
  .action(cliTagList);

export function cliTagList() {
  const project = projectMdRead();
  if (!project) {
    return;
  }

  const { tags } = project;
  const tagsTable = Object.values(tags).map((tag) => ({
    title: tag.title,
    name: tag.name,
    doc: getTagFilename(tag),
  }));

  logTable(tagsTable);

  console.log();
}
