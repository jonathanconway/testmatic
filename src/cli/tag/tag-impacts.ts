import { createCommand } from "commander";

import {
  getTagFilename,
  getTagsReferencingTag,
  getTestFilename,
  getTestsReferencingTag,
  isError,
  logError,
  logTable,
  projectGetTagByNameOrTitle,
  projectMdRead,
} from "../../framework";
import { toAsciiTable } from "../utils/ascii/ascii.utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagImpactsParameter = string;

export const cliTagImpactsCommand = createCommand("impacts")
  .description("List the tests and tags that are related to a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTagImpacts);

export function cliTagImpacts(tagNameOrTitle: TagImpactsParameter) {
  const project = projectMdRead();
  if (!project) {
    return;
  }

  const getTagResult = projectGetTagByNameOrTitle({ project, tagNameOrTitle });
  if (isError(getTagResult)) {
    logError(getTagResult.message);
    return;
  }

  const tag = getTagResult;

  const tests = getTestsReferencingTag(project.tests, tag);
  const testsTable = tests.map((test) => ({
    name: test.title,
    doc: getTestFilename(test),
  }));

  const tags = getTagsReferencingTag(project.tags, tag);
  const tagsTable = tags.map((tag) => ({
    Name: tag.title,
    Doc: getTagFilename(tag),
  }));

  const title = `${tag.title} - Impacts`;

  console.log(
    `
${title}
${title.asciiUnderlineDouble()}
`
  );

  console.log(`
Tests
-----
`);

  logTable(testsTable);

  // ${toAsciiTable(
  //   tests.map((test) => ({
  //     Name: test.title,
  //     Doc: getTestFilename(test),
  //   })),
  //   ["Name", "Doc"]
  // )}

  console.log(`
Tags
----
`);

  logTable(tagsTable);

  // ${toAsciiTable(
  //   tags.map((tag) => ({
  //     Name: tag.title,
  //     Doc: getTagFilename(tag),
  //   })),
  //   ["Name", "Doc"]
  // )}

  // `.trimLines()
  // );
}
