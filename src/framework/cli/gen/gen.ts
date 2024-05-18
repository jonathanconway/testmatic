import { createCommand } from "commander";

import { cliGenDocsCommand } from "./gen-docs";

export const cliGenCommand = createCommand("gen")
  .description("Generate files")
  .addCommand(cliGenDocsCommand);
