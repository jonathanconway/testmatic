import { existsSync, mkdirSync } from "fs";

import { projectPathGet } from "./project-path-get";

export function projectMdCreateFolders() {
  const projectPath = projectPathGet();

  if (!existsSync(projectPath)) {
    mkdirSync(projectPath);
  }

  for (const subfolder of ["tests", "tags", "runs"]) {
    const subfolderPath = `${projectPath}/${subfolder}`;
    if (!existsSync(subfolderPath)) {
      mkdirSync(subfolderPath);
    }
  }
}
