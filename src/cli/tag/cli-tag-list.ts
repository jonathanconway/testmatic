import { createCommand } from "commander";

import { projectMdRead, throwIfError } from "../../framework";
import { logTable } from "../utils";

import { convertTagToOutputRow } from "./tag-list-output-row";

export const cliTagListCommand = createCommand("list")
  .description("List tags in the current project")
  .action(cliTagList);

export function cliTagList() {
  const project = throwIfError(projectMdRead());

  const { tags } = project;

  const tagsTable = tags.map(convertTagToOutputRow);

  logTable(tagsTable);

  console.log();
}
