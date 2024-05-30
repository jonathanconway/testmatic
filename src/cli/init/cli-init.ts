import { createCommand } from "commander";

import { projectCreate } from "../project";

export const cliInitCommand = createCommand("init")
  .description("Create a new project in the current working directory")
  .action(cliInit);

function cliInit() {
  projectCreate();
}
