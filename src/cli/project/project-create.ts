import { createCommand } from "commander";

import { projectMdCreateFolders, projectMdRead } from "../../framework";

export const cliProjectCreateCommand = createCommand("create")
  .description("Create a new project in the current working directory")
  .action(cliProjectCreate);

function cliProjectCreate() {
  if (projectMdRead()) {
    console.log("Project already exists.");
    return;
  }

  projectMdCreateFolders();
}
