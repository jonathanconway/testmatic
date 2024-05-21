import { createCommand } from "commander";
import promptSync from "prompt-sync";

import {
  CreateLinkParams,
  Link,
  createLink,
  projectAddTagLink,
  projectGetTagByNameOrTitle,
} from "../../core";
import { exportMdTag } from "../../markdown";
import { isValidationError } from "../../utils";
import { readProject, writeProject } from "../project.utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagLinkAddParameters = [
  string,
  string,
  {
    readonly tagName: string;
    readonly href: string;
    readonly title?: string;
  }
];

export const cliTagLinkAddCommand = createCommand("add")
  .description("Add a new link to a tag")
  .argument(PARAM_TAG_NAME_OR_TITLE.name, PARAM_TAG_NAME_OR_TITLE.description)
  .argument("<tagLinkHref>", "Href of the tag link to add")
  .option(
    "-t, --title <value>",
    `
Title of the new link.

Optional.
`.trim()
  )
  .action(cliTagLinkAdd);

export function cliTagLinkAdd(...args: TagLinkAddParameters) {
  const [tagNameOrTitle] = args;

  const project = readProject();

  const tag = projectGetTagByNameOrTitle({ project, tagNameOrTitle });

  const newLink = createTagLinkFromArgsOrPrompts(args);

  const updatedProject = projectAddTagLink({ project, tag, newLink });

  writeProject(updatedProject);

  const mdTest = exportMdTag(tag);

  console.log(`\n${mdTest}\n`);
}

function createTagLinkFromArgsOrPrompts(args: TagLinkAddParameters): Link {
  const [, href, { title }] = args;

  const paramsFromArgs = { href, title };

  const paramsFromPrompts = getTagAddParamsFromPrompts({
    href,
    title,
  });

  const params = {
    ...paramsFromArgs,
    ...paramsFromPrompts,
  };

  const createLinkResult = createLink(params as CreateLinkParams);

  if (isValidationError(createLinkResult)) {
    throw createLinkResult.message;
  }

  return createLinkResult;
}

function getTagAddParamsFromPrompts(paramsSoFar: Partial<CreateLinkParams>) {
  let params: Partial<CreateLinkParams> = {};

  if (!paramsSoFar.href) {
    const href = getTagAddHrefFromPrompt();
    params = {
      ...params,
      href,
    };
  }

  if (!paramsSoFar.href && !paramsSoFar.title) {
    const title = getTagAddTitleFromPrompt();
    params = {
      ...params,
      title,
    };
  }

  return params;
}

const prompt = promptSync();

function getTagAddHrefFromPrompt() {
  return prompt("Please enter link href: ");
}

function getTagAddTitleFromPrompt() {
  return prompt("Please enter link title:\n(Empty line to skip)\n");
}
