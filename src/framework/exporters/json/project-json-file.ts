import { readFileSync, writeFileSync } from "fs";
import { ProjectJSON } from "./project-json";

const PROJECT_FILENAME = "project.json";

export function readProjectFile() {
  return JSON.parse(readFileSync(PROJECT_FILENAME).toString()) as ProjectJSON;
}

export function writeProjectFile(project: ProjectJSON) {
  writeFileSync(PROJECT_FILENAME, JSON.stringify(project, undefined, "  "));
}
