import { existsSync } from "fs";

import { parseMd, projectPathGet } from "../../markdown";
import { NotFoundError } from "../../utils";
import { readDirFileTree } from "../dir-file-tree/read-dir-file-tree";

export function projectMdRead(projectPath = projectPathGet()) {
  if (!existsSync(projectPath)) {
    return new NotFoundError(
      "Project cannot be found. Please create a new project using the `init` command."
    );
  }

  const projectFileTree = readDirFileTree(projectPath, ["md"]);

  const projectView = parseMd({
    projectFileTree,
  });

  return projectView;
}
