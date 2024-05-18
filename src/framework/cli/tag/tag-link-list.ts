import { createCommand } from "commander";

import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

type TagLinkListParameters = string;

export const cliTagLinkListCommand = createCommand("list")
  .description("List tag links")
  .argument("<tagName>", "Name of the tag")
  .action(cliTagList);

export function cliTagList(tagName: TagLinkListParameters) {
  const { tagsByName } = readProject();
  const tag = tagsByName[tagName];

  console.log(`Tag: ${tag.title}
  
Links:`);

  console.log(
    toAsciiTable(
      tag.links.map((link) => ({
        Name: link.title,
        URL: link.href,
      })),
      ["Name", "URL"]
    )
  );
}
