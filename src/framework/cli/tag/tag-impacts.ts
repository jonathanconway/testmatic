import { createCommand } from "commander";

import {
  getTagByNameOrTitle,
  getTagsReferencingTag,
  getTestsReferencingTag,
} from "../../core";
import { getTagFilename, getTestFilename } from "../../markdown";
import { trimLines } from "../../utils";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

type TagImpactsParameter = string;

export const cliTagImpactsCommand = createCommand("impacts")
  .description("List the tests and tags that are related to a tag")
  .argument("<name>", "Name or title of tag to list impacts of")
  .action(cliTagImpacts);

export function cliTagImpacts(tagNameOrTitle: TagImpactsParameter) {
  const project = readProject();

  const tag = getTagByNameOrTitle({ project, tagNameOrTitle });

  const tests = getTestsReferencingTag(project.tests, tag);
  const tags = getTagsReferencingTag(project.tags, tag);

  console.log(
    trimLines(`
${tag.title}
${"=".repeat(tag.title.length)}

Impacted tests
--------------

${toAsciiTable(
  tests.map((test) => ({
    Name: test.title,
    Doc: getTestFilename(test),
  })),
  ["Name", "Doc"]
)}

Impacted tags
-------------

${toAsciiTable(
  tags.map((tag) => ({
    Name: tag.title,
    Doc: getTagFilename(tag),
  })),
  ["Name", "Doc"]
)}

`) + "\n\n"
  );
}
