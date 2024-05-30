import { createCommand } from "commander";

import { projectCreate } from "./project-create";

export const cliProjectCommand = createCommand("project")
  .description("Manage the current project")
  .action(cliProjectCreate);

function cliProjectCreate() {
  projectCreate();
}
