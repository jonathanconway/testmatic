import { cleanDirFileTreeAtPath, writeFileTree } from "..";

import { ProjectView } from "../../core";
import { DirFileTree } from "../../files";
import { exportMd, projectPathGet } from "../../markdown";

export function projectMdWrite(project: ProjectView) {
  const projectPath = projectPathGet();

  const newFileTree = exportMd(project);

  writeFileTree(`${projectPath}/tests`, newFileTree.tests);
  cleanDirFileTreeAtPath(`${projectPath}/tests`, newFileTree.tests);

  writeFileTree(`${projectPath}/tags`, newFileTree.tags as DirFileTree);
  cleanDirFileTreeAtPath(`${projectPath}/tags`, newFileTree.tags);

  writeFileTree(`${projectPath}/runs`, newFileTree.runs as DirFileTree);
}
