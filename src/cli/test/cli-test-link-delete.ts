import { createCommand } from "commander";

import {
  projectDeleteTestLink,
  projectMdRead,
  projectMdWrite,
  throwIfError,
  throwIfResultWithDataError,
} from "../../framework";
import { PARAM_LINK_HREF } from "../link";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestDeleteParameter = [
  string /* testNameOrTitle */,
  string /* linkHrefOrTitle */
];

export const cliTestLinkDeleteCommand = createCommand("delete")
  .description("Delete a link from a test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_LINK_HREF.name, PARAM_LINK_HREF.description)
  .action(cliTestDelete);

export function cliTestDelete(
  ...[lookupTestNameOrTitle, lookupTestLinkHref]: TestDeleteParameter
) {
  const project = throwIfError(projectMdRead());

  const updatedProject = throwIfResultWithDataError(
    projectDeleteTestLink({
      project,
      lookupTestNameOrTitle,
      lookupTestLinkHref,
    })
  );

  projectMdWrite(updatedProject.data);
}
