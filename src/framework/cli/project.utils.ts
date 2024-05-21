import { Project, ProjectView } from "../core";
import {
  DirOrFileTree,
  cleanupFileTree,
  getDirTree,
  getFileTree,
  writeFileTree,
} from "../files";
import { exportMd, parseMd } from "../markdown";

export function convertProjectToProjectView(project: Project) {
  const testsByName = Object.fromEntries(
    project.tests.map((test) => [test.name, test])
  );
  const tagsByName = Object.fromEntries(
    project.tags.map((tag) => [tag.name, tag])
  );

  return {
    ...project,
    testsByName,
    tagsByName,
  };
}

function getProjectPath() {
  return `${process.cwd()}/.testmatic`;
}

export function readProject(): ProjectView {
  const projectPath = getProjectPath();

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

export function writeProject(project: ProjectView) {
  const projectPath = getProjectPath();

  const newFileTree = exportMd(project);

  writeFileTree(`${projectPath}/tests`, newFileTree.tests);
  cleanupFileTree(`${projectPath}/tests`, newFileTree.tests);

  writeFileTree(`${projectPath}/tags`, newFileTree.tags as DirOrFileTree);
  cleanupFileTree(`${projectPath}/tags`, newFileTree.tags);

  writeFileTree(`${projectPath}/runs`, newFileTree.runs as DirOrFileTree);
}
