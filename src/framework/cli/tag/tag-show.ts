import { ProjectView } from "../../core";
import { exportMdTag } from "../../markdown/export-md-tag";
import { exportMdTest } from "../../markdown/export-md-test";
import { readProject } from "../project.utils";

function getTagByNameOrTitle(projectView: ProjectView, nameOrTitle: string) {
  const tagByName = projectView.tagsByName[nameOrTitle];
  if (tagByName) {
    return tagByName;
  }

  const tagByTitle = projectView.tags.find((tag) => tag.title === nameOrTitle);
  if (tagByTitle) {
    return tagByTitle;
  }

  throw new Error(
    `Cannot find tag with name or title matching "${nameOrTitle}"`
  );
}

export function cliTagShow([name]: readonly string[]) {
  if (!name) {
    throw new Error("Please provide name parameter.");
  }

  const project = readProject();

  const tag = getTagByNameOrTitle(project, name);

  const mdTag = exportMdTag(tag);

  console.log(`\n${mdTag}\n`);
}
