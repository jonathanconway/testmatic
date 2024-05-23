import { createCommand } from "commander";

import { projectMdRead, projectMdWrite } from "../../framework";

export const cliGenDocsCommand = createCommand("docs")
  .description("Generate test docs")
  .action(cliGenDocs);

export function cliGenDocs() {
  const project = projectMdRead();

  if (!project) {
    return;
  }

  projectMdWrite(project);
}
