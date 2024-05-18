import { createCommand } from "commander";

import { deleteProjectTag, getTagByNameOrTitle } from "../../core";
import { readProject, writeProject } from "../project.utils";

type TagDeleteParameter = string;

export const cliTagDeleteCommand = createCommand("delete")
  .description("Delete a tag")
  .argument("<name>", "Name or title of tag to delete")
  .action(cliTagDelete);

export function cliTagDelete(tagNameOrTitle: TagDeleteParameter) {
  const project = readProject();

  const tagToDelete = getTagByNameOrTitle({ project, tagNameOrTitle });

  const updatedProject = deleteProjectTag({ project, tagToDelete });

  writeProject(updatedProject);
}
