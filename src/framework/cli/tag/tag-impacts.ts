import { createCommand } from "commander";

import {
  getTagsReferencingTag,
  getTestsReferencingTag,
  projectGetTagByNameOrTitle,
} from "../../core";
import { getTagFilename, getTestFilename } from "../../markdown";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagImpactsParameter = string;

export const cliTagImpactsCommand = createCommand("impacts")
  .description("List the tests and tags that are related to a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTagImpacts);

export function cliTagImpacts(tagNameOrTitle: TagImpactsParameter) {
  const project = readProject();

  const tag = projectGetTagByNameOrTitle({ project, tagNameOrTitle });

  const tests = getTestsReferencingTag(project.tests, tag);

  const tags = getTagsReferencingTag(project.tags, tag);

  const title = `${tag.title} - Impacts`;

  console.log(
    `
${title}
${"=".repeat(title.length)}

Tests
-----

${toAsciiTable(
  tests.map((test) => ({
    Name: test.title,
    Doc: getTestFilename(test),
  })),
  ["Name", "Doc"]
)}

Tags
----

${toAsciiTable(
  tags.map((tag) => ({
    Name: tag.title,
    Doc: getTagFilename(tag),
  })),
  ["Name", "Doc"]
)}

`.trimLines()
  );
}
