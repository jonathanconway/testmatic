import { projectMdCreateFolders, projectMdRead } from "../../framework";

export function projectCreate() {
  if (projectMdRead()) {
    console.log("Project already exists.");
    return;
  }

  projectMdCreateFolders();
}
