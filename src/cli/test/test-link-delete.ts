import { createCommand } from "commander";

import {
  isError,
  logError,
  projectDeleteTestLink,
  projectGetTestByNameOrTitle,
  projectGetTestLinkByHrefOrTitle,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { PARAM_LINK_HREF_OR_TITLE } from "../link";
import { PARAM_TEST_NAME_OR_TITLE } from "../run/param-test-name-or-title";

type TestDeleteParameter = [string, string];

export const cliTestLinkDeleteCommand = createCommand("delete")
  .description("Delete a link from a test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_LINK_HREF_OR_TITLE.name, PARAM_LINK_HREF_OR_TITLE.description)
  .action(cliTestDelete);

export function cliTestDelete(
  ...[testNameOrTitle, linkHrefOrTitle]: TestDeleteParameter
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

  const linkToDelete = projectGetTestLinkByHrefOrTitle({
    test,
    linkHrefOrTitle,
  });

  const updatedProject = projectDeleteTestLink({
    project,
    test,
    linkToDelete,
  });

  projectMdWrite(updatedProject);
}