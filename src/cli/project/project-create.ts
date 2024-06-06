import { projectMdCreateFolders, projectMdRead } from "../../framework";
import { logError } from "../utils";

export function projectCreate() {
  if (projectMdRead()) {
    logError("Project already exists.");
    return;
  }

  projectMdCreateFolders();
}
