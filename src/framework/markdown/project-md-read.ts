import { existsSync } from "fs";

import { getDirTree, getFileTree } from "../files";

import { parseMd } from "./parse-md";
import { projectPathGet } from "./project-path-get";

export function projectMdRead() {
  const projectPath = projectPathGet();
  if (!existsSync(projectPath)) {
    return undefined;
  }

  const testsFileTree = getFileTree(`${projectPath}/tests`, ["md"]);
  const tagsFileTree = getFileTree(`${projectPath}/tags`, ["md"]);
  const runsDirTree = getDirTree(`${projectPath}/runs`);

  const projectView = parseMd({
    testsFileTree,
    tagsFileTree,
    runsDirTree,
  });

  return projectView;
}
