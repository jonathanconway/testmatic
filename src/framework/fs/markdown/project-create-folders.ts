import { existsSync, mkdirSync } from "fs";

import { projectPathGet } from "../../markdown";

export function projectMdCreateFolders(projectPath = projectPathGet()) {
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
