import { existsSync } from "fs";

import { parseMd, projectPathGet } from "../../markdown";
import { readDirFileTree } from "../dir-file-tree/read-dir-file-tree";

export function projectMdRead(projectPath = projectPathGet()) {
  if (!existsSync(projectPath)) {
    return undefined;
  }

  const projectFileTree = readDirFileTree(projectPath, ["md"]);

  const projectView = parseMd({
    projectFileTree,
  });

  return projectView;
}
