import { createCommand } from "commander";

import { getTagByNameOrTitle, getTestsHavingTag } from "../../core";
import { getTagFilename, getTestFilename } from "../../markdown";
import { sentenceCase, trimLines } from "../../utils";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

type TagShowParameter = string;

export const cliTagShowCommand = createCommand("show")
  .description("Show the full details of a tag")
  .argument("<name>", "Name or title of tag to show")
  .action(cliTagShow);

export function cliTagShow(tagNameOrTitle: TagShowParameter) {
  const project = readProject();

  const tag = getTagByNameOrTitle({ project, tagNameOrTitle });

  const tests = getTestsHavingTag(project.tests, tag);

  console.log(
    trimLines(`
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

`) + "\n\n"
  );
}
