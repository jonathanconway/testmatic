import { deleteProjectTest, getTestByNameOrTitle } from "../../core";
import { exportMdTest } from "../../markdown/export-md-test";
import { readProject } from "../project.utils";

export function cliTestDelete([name]: readonly string[]) {
  if (!name) {
    throw new Error("Please provide name parameter.");
  }

  const project = readProject();

  const test = getTestByNameOrTitle(project, name);

  deleteProjectTest(project)(test);

  const mdTest = exportMdTest(test);

  console.log(`\n${mdTest}\n`);
}
