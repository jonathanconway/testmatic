import { createCommand } from "commander";
import { isError } from "lodash";
import promptSync from "prompt-sync";

import {
  CreateTestParams,
  createTag,
  exportMdTag,
  isValidationError,
  projectAddTag,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { logError } from "../utils";

interface TagAddParameters {
  readonly title: string;
  readonly type?: string;
  readonly description?: string;
  readonly steps: readonly string[];
  readonly links: readonly string[];
}

export const cliTagAddCommand = createCommand("add")
  .description("Add a new tag to the project")
  .option(
    "-t, --title <value>",
    `
Title of the tag.
Also used to generate an underscored filename used to refer to the test in short-hand.
Titles must be unique.
Titles should briefly describe the tag.

Required - must be provided, either via prompt or command line.
`.trim()
  )
  .option(
    "-y, --type <value>",
    `
Type of the tag.
Used to categorise one or more similar tags.
E.g. "page" for tags that refer to a page in an website.

Optional.
`.trim()
  )
  .option(
    "-d, --description <value>",
    `
Description of the test.
Longer than the title, provides a more detailed description of the tag.

Optional.
`.trim()
  )
  .option(
    "-l, --links [links...]",
    `
List of links to attach to the tag.
For example, a deep link to the web page being tested or relevant documentation.

Add each link href in quotes separated by a space.
E.g.: "http://product.com/login" "http://wiki.com/login-flow".

Links can be prefixed with text separated by a pipe "|".
E.g. "Login page|http://product.com/login" "Login flow docs|http://wiki.com/login-flow"

Optional.
`.trim()
  )
  .action(cliTagAdd);

export function cliTagAdd(args: TagAddParameters) {
  const project = projectMdRead();

  if (!project) {
    return;
  }

  const createTagResult = createTagFromArgsOrPrompts(args);

  if (isValidationError(createTagResult)) {
    logError(createTagResult.message);
    return;
  }

  const newTag = createTagResult;

  const addTagResult = projectAddTag({ project, newTag });
  if (isError(addTagResult)) {
    logError(addTagResult.message);
    return;
  }

  const updatedProject = addTagResult;

  projectMdWrite(updatedProject);

  const mdTest = exportMdTag(newTag);

  console.log(`\n${mdTest}\n`);
}

function createTagFromArgsOrPrompts(args: TagAddParameters) {
  const paramsFromArgs = args;

  const paramsFromPrompts = getTagAddParamsFromPrompts(paramsFromArgs);

  const params = {
    ...paramsFromArgs,
    ...paramsFromPrompts,
  };

  const createTagResult = createTag(params);

  return createTagResult;
}

function getTagAddParamsFromPrompts(paramsSoFar: Partial<CreateTestParams>) {
  let params: Partial<CreateTestParams> = {};

  if (!paramsSoFar.title) {
    const title = getTagAddTitleFromPrompt();
    params = {
      ...params,
      title,
    };
  }
  return params;
}

const prompt = promptSync();

function getTagAddTitleFromPrompt() {
  return prompt("Please enter tag title: ");
}
