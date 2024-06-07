import { createCommand } from "commander";

import {
  Tag,
  Test,
  getTagFilename,
  getTestFilename,
  isError,
  projectGetTagByNameOrTitle,
  projectGetTestsByTag,
  projectMdRead,
  sentenceCase,
} from "../../framework";
import { logError, logHeading, logTable } from "../utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagShowParameter = string /* tagNameOrTitle */;

export const cliTagShowCommand = createCommand("show")
  .description("Show the full details of a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .action(cliTagShow);

export function cliTagShow(tagNameOrTitle: TagShowParameter) {
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

  const tests = projectGetTestsByTag({ project, tag });

  logHeading(`Tag: ${tag.title}`, 1);

  logType(tag.tagType);

  logDoc(tag);

  logDescription(tag);

  logLinks(tag);

  logTests(tests);
}

function logType(type?: string) {
  if (type) {
    console.log(`Type: ${sentenceCase(type)}`);
    console.log();
  }
}

function logDoc(tag: Tag) {
  console.log(`Doc:  ${getTagFilename(tag)}`);
  console.log();
}

function logDescription(tag: Tag) {
  if (tag.description) {
    logHeading("Description", 2);

    console.log(tag.description);
    console.log();
  }
}

function logLinks(tag: Tag) {
  logHeading("Links", 2);

  const linksTable = tag.links.map((link) => ({
    name: link.title,
    url: link.href,
  }));

  logTable(linksTable);

  console.log();
}

function logTests(tests: readonly Test[]) {
  logHeading("Tests", 2);

  const testsTable = tests.map((test) => ({
    title: test.title,
    name: test.name,
    doc: getTestFilename(test),
  }));

  logTable(testsTable);

  console.log();
}
