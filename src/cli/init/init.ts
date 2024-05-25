import { createCommand } from "commander";

import { projectMdCreateFolders, projectMdRead } from "../../framework";

export const cliInitCommand = createCommand("init")
  .description("Create a new project in the current working directory")
  .action(cliInit);

function cliInit() {
  if (projectMdRead()) {
    console.log("Project already exists.");
    return;
  }

  projectMdCreateFolders();
}
