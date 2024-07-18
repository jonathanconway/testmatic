import { exec } from "child_process";
import { createCommand } from "commander";

import {
  projectGetTagByNameOrTitle,
  projectGetTagLinkByHrefOrTitle,
  projectMdRead,
  throwIfError,
} from "../../framework";
import { PARAM_LINK_HREF } from "../link";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagLinkOpenParameter = [
  string /* tagNameOrTitle */,
  string /* linkHrefOrTitle */
];

export const cliTagLinkOpenCommand = createCommand("open")
  .description("Open a tag link in the browser")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .argument(PARAM_LINK_HREF.name, PARAM_LINK_HREF.description)
  .action(cliTagOpen);

export function cliTagOpen(
  ...[lookupTagNameOrTitle, lookupLinkHref]: TagLinkOpenParameter
) {
  const project = throwIfError(projectMdRead());

  const tag = throwIfError(
    projectGetTagByNameOrTitle({
      project,
      lookupTagNameOrTitle,
    })
  );

  const link = throwIfError(
    projectGetTagLinkByHrefOrTitle({
      tag,
      lookupLinkHref,
    })
  );

  exec(`open "${link.href}"`);
}
