import { exec } from "child_process";
import { createCommand } from "commander";

import { getTagByNameOrTitle, getTagLinkByHrefOrTitle } from "../../core";
import { readProject } from "../project.utils";

type TagLinkOpenParameter = [string, string];

export const cliTagLinkOpenCommand = createCommand("open")
  .description("Open a tag link in the browser")
  .argument("<tagName>", "Name of the tag")
  .argument("<name>", "Name or title of tag link to open")
  .action(cliTagOpen);

export function cliTagOpen(
  ...[tagNameOrTitle, linkHrefOrTitle]: TagLinkOpenParameter
) {
  const project = readProject();

  const tag = getTagByNameOrTitle({ project, tagNameOrTitle });

  const link = getTagLinkByHrefOrTitle({ tag, linkHrefOrTitle });

  exec(`open "${link.href}"`);
}
