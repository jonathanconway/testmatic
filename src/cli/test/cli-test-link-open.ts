import { exec } from "child_process";
import { createCommand } from "commander";

import {
  isError,
  projectGetTestByNameOrTitle,
  projectGetTestLinkByHrefOrTitle,
  projectMdRead,
} from "../../framework";
import { PARAM_LINK_HREF_OR_TITLE } from "../link";
import { logError } from "../utils";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestLinkOpenParameter = [
  string /* testNameOrTitle */,
  string /* linkHrefOrTitle */
];

export const cliTestLinkOpenCommand = createCommand("open")
  .description("Open a test link in the browser")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_LINK_HREF_OR_TITLE.name, PARAM_LINK_HREF_OR_TITLE.description)
  .action(cliTestOpen);

export function cliTestOpen(
  ...[testNameOrTitle, linkHrefOrTitle]: TestLinkOpenParameter
) {
  const project = projectMdRead();

  if (!project) {
    return;
  }

  const getTestResult = projectGetTestByNameOrTitle({
    project,
    testNameOrTitle,
  });
  if (isError(getTestResult)) {
    logError(getTestResult.message);
    return;
  }

  const test = getTestResult;

  const getTestLinkResult = projectGetTestLinkByHrefOrTitle({
    test,
    linkHrefOrTitle,
  });
  if (isError(getTestLinkResult)) {
    logError(getTestLinkResult.message);
    return;
  }
  const link = getTestLinkResult;

  exec(`open "${link.href}"`);
}
