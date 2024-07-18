import { createCommand } from "commander";

import { projectMdRead, projectMdWrite, throwIfError } from "../../framework";

export const cliGenDocsCommand = createCommand("docs")
  .description("Generate test docs")
  .action(cliGenDocs);

export function cliGenDocs() {
  const project = throwIfError(projectMdRead());

  projectMdWrite(project);
}
