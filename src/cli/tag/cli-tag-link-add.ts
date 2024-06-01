import { createCommand } from "commander";
import promptSync from "prompt-sync";

import {
  CreateLinkParams,
  Link,
  createLink,
  isError,
  isValidationError,
  projectAddTagLink,
  projectGetTagByNameOrTitle,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { logError } from "../utils";

import { PARAM_TAG_NAME_OR_TITLE } from "./param-tag-name-or-title";

type TagLinkAddParameters = [
  string /* tagNameOrTitle */,
  string /* tagLinkHref */,
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

  const newLink = createTagLinkFromArgsOrPrompts(args);

  const addTagLinkResult = projectAddTagLink({ project, tag, newLink });
  if (isError(addTagLinkResult)) {
    logError(addTagLinkResult.message);
    return;
  }

  const updatedProject = addTagLinkResult;

  projectMdWrite(updatedProject);
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
