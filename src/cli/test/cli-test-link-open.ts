import { exec } from "child_process";
import { createCommand } from "commander";

import {
  projectGetTestByNameOrTitle,
  projectGetTestLinkByHrefOrTitle,
  projectMdRead,
  throwIfError,
} from "../../framework";
import { PARAM_LINK_HREF } from "../link";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestLinkOpenParameter = [
  string /* testNameOrTitle */,
  string /* linkHrefOrTitle */
];

export const cliTestLinkOpenCommand = createCommand("open")
  .description("Open a test link in the browser")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_LINK_HREF.name, PARAM_LINK_HREF.description)
  .action(cliTestOpen);

export function cliTestOpen(
  ...[lookupTestNameOrTitle, lookupLinkHref]: TestLinkOpenParameter
) {
  const project = throwIfError(projectMdRead());

  const test = throwIfError(
    projectGetTestByNameOrTitle({
      project,
      lookupTestNameOrTitle,
    })
  );

  const link = throwIfError(
    projectGetTestLinkByHrefOrTitle({
      test,
      lookupLinkHref,
    })
  );

  exec(`open "${link.href}"`);
}
