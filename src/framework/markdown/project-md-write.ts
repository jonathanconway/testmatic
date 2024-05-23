import { ProjectView } from "../core";
import { DirOrFileTree, cleanupFileTree, writeFileTree } from "../files";

import { exportMd } from "./export-md";
import { projectPathGet } from "./project-path-get";

export function projectMdWrite(project: ProjectView) {
  const projectPath = projectPathGet();

  const newFileTree = exportMd(project);

  writeFileTree(`${projectPath}/tests`, newFileTree.tests);
  cleanupFileTree(`${projectPath}/tests`, newFileTree.tests);

  writeFileTree(`${projectPath}/tags`, newFileTree.tags as DirOrFileTree);
  cleanupFileTree(`${projectPath}/tags`, newFileTree.tags);

  writeFileTree(`${projectPath}/runs`, newFileTree.runs as DirOrFileTree);
}
