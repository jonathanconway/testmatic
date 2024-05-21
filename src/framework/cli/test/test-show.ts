import { createCommand } from "commander";

import { projectGetTestByNameOrTitle } from "../../core";
import {
  getRunFilepath,
  getTagFilename,
  getTestFilename,
} from "../../markdown";
import { sentenceCase } from "../../utils";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";
import { PARAM_TEST_NAME_OR_TITLE } from "../run/param-test-name-or-title";

type TestShowParameter = string;

export const cliTestShowCommand = createCommand("show")
  .description("Show the full details of a test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .action(cliTestShow);

export function cliTestShow(name: TestShowParameter) {
  const project = readProject();

  const test = projectGetTestByNameOrTitle({ project, testNameOrTitle: name });

  console.log(
    `
${test.title}
${test.title.asciiUnderlineDouble()}

Doc: ${getTestFilename(test)}

Description
-----------

${test.description}

Links
-----

${toAsciiTable(
  test.links.map((link) => ({
    Name: link.title,
    URL: link.href,
  })),
  ["Name", "URL"]
)}

Tags
----

${toAsciiTable(
  test.tags.map((tag) => ({
    Name: tag.title,
    Doc: getTagFilename(tag),
  })),
  ["Name", "Doc"]
)}

Runs
----

${toAsciiTable(
  test.runs.map((run) => ({
    dateTime: run.dateTime,
    result: run.result ? sentenceCase(run.result) : "-",
    folder: getRunFilepath(test, run),
  })),
  ["Date/time", "Result", "Folder"]
)}

`.trimLines()
  );
}
