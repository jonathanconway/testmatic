import { createCommand } from "commander";

import { readProject, writeProject } from "../project.utils";

export const cliGenDocsCommand = createCommand("docs")
  .description("Generate test docs")
  .action(cliGenDocs);

export function cliGenDocs() {
  writeProject(readProject());
}
