import { createCommand } from "commander";

import { getTestsHavingTag, projectGetTagByNameOrTitle } from "../../core";
import { getTagFilename, getTestFilename } from "../../markdown";
import { sentenceCase } from "../../utils";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagShowParameter = string;

export const cliTagShowCommand = createCommand("show")
  .description("Show the full details of a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTagShow);

export function cliTagShow(tagNameOrTitle: TagShowParameter) {
  const project = readProject();

  const tag = projectGetTagByNameOrTitle({ project, tagNameOrTitle });

  const tests = getTestsHavingTag(project.tests, tag);

  console.log(
    `
${tag.title}
${"=".repeat(tag.title.length)}

${tag.type ? `Type: ${sentenceCase(tag.type)}` : ``}

Doc: ${getTagFilename(tag)}

Description
-----------

${tag.description}

Links
-----

${toAsciiTable(
  tag.links.map((link) => ({
    Name: link.title,
    URL: link.href,
  })),
  ["Name", "URL"]
)}

Tests
-----

${toAsciiTable(
  tests.map((test) => ({
    Name: test.title,
    Doc: getTestFilename(test),
  })),
  ["Name", "Doc"]
)}

`.trimLines()
  );
}
