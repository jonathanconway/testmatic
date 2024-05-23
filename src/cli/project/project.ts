import { createCommand } from "commander";

import { cliProjectCreateCommand } from "./project-create";

export const cliProjectCommand = createCommand("project")
  .description("Manage the current project")
  .addCommand(cliProjectCreateCommand);
