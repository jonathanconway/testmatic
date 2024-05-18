import { createCommand } from "commander";

import { deleteProjectTest, getTestByNameOrTitle } from "../../core";
import { readProject, writeProject } from "../project.utils";

type TestDeleteParameter = string;

export const cliTestDeleteCommand = createCommand("delete")
  .description("Delete a test")
  .argument("<name>", "Name or title of test to delete")
  .action(cliTestDelete);

export function cliTestDelete(name: TestDeleteParameter) {
  const project = readProject();

  const testToDelete = getTestByNameOrTitle({ project, nameOrTitle: name });

  const updatedProject = deleteProjectTest({ project, testToDelete });

  writeProject(updatedProject);
}
