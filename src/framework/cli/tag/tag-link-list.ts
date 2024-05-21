import { createCommand } from "commander";

import { projectGetTagByNameOrTitle } from "../../core";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagLinkListParameters = string;

export const cliTagLinkListCommand = createCommand("list")
  .description("List tag links")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTagList);

export function cliTagList(tagNameOrTitle: TagLinkListParameters) {
  const project = readProject();

  const tag = projectGetTagByNameOrTitle({ project, tagNameOrTitle });

  console.log(
    `
Tag: ${tag.title}
  
Links
-----

${toAsciiTable(
  tag.links.map((link) => ({
    Name: link.title,
    URL: link.href,
  })),
  ["Name", "URL"]
)}
`.trimLines()
  );
}
