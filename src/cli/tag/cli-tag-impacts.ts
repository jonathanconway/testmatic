import { createCommand } from "commander";

import {
  Tag,
  getTagImpactedTests,
  projectGetTagByNameOrTitle,
  projectMdRead,
  pruneImpactItems,
  throwIfError,
} from "../../framework";
import { logHeading, logImpacts } from "../utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagImpactsParameter = string /* tagNameOrTitle */;

export const cliTagImpactsCommand = createCommand("impacts")
  .description("List the tests and tags that are impacted by a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTagImpacts);

export function cliTagImpacts(lookupTagNameOrTitle: TagImpactsParameter) {
  const project = throwIfError(projectMdRead());

  const tag = throwIfError(
    projectGetTagByNameOrTitle({
      project,
      lookupTagNameOrTitle,
    })
  );

  const impacts = pruneImpactItems(
    getTagImpactedTests({
      tests: project.tests,
      tag,
      depth: 2,
    })
  );

  logTitle(tag);

  logImpacts(impacts);
}

function logTitle(tag: Tag) {
  const title = `Tag: ${tag.title}`;

  logHeading(title, 1);

  logHeading("Impacts", 2);
}
