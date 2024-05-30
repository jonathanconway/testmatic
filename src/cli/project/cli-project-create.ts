import { createCommand } from "commander";

import { projectCreate } from "./project-create";

export const cliProjectCreateCommand = createCommand("create")
  .description(
    "Create a new project in the current working directory (same as `testmatic init`)"
  )
  .action(cliProjectCreate);

function cliProjectCreate() {
  projectCreate();
}
