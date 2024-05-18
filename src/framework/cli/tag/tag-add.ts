import { createCommand } from "commander";
import promptSync from "prompt-sync";

import { CreateTestParams, Tag, createTag } from "../../core";
import { addProjectTag } from "../../core/project-view/project-add-tag";
import { exportMdTag } from "../../markdown/export-md-tag";
import { isValidationError } from "../../utils";
import { readProject, writeProject } from "../project.utils";

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
  const project = readProject();

  const newTag = createTagFromArgsOrPrompts(args);

  const updatedProject = addProjectTag({ project, newTag });

  writeProject(updatedProject);

  const mdTest = exportMdTag(newTag);

  console.log(`\n${mdTest}\n`);
}

function createTagFromArgsOrPrompts(args: TagAddParameters): Tag {
  const paramsFromArgs = args;

  const paramsFromPrompts = getTagAddParamsFromPrompts(paramsFromArgs);

  const params = {
    ...paramsFromArgs,
    ...paramsFromPrompts,
  };

  const createTagResult = createTag(params);

  if (isValidationError(createTagResult)) {
    throw createTagResult.message;
  }

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
