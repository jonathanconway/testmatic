import { createCommand } from "commander";
import promptSync from "prompt-sync";

import {
  CreateLinkParams,
  Link,
  createLink,
  projectAddTagLink,
  projectMdRead,
  projectMdWrite,
  throwIfError,
} from "../../framework";

import { PARAM_TAG_LINK_HREF } from "./param-tag-link-href";
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
  .argument(PARAM_TAG_LINK_HREF.name, PARAM_TAG_LINK_HREF.description)
  .option(
    "-t, --title <value>",
    `
Title of the new link.

Optional.
`.trim()
  )
  .action(cliTagLinkAdd);

export function cliTagLinkAdd(...args: TagLinkAddParameters) {
  const [lookupTagNameOrTitle] = args;

  const project = throwIfError(projectMdRead());

  const newLink = createTagLinkFromArgsOrPrompts(args);

  const updatedProject = throwIfError(
    projectAddTagLink({
      project,
      lookupTagNameOrTitle,
      newLink,
    })
  );

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

  const createLinkResult = throwIfError(createLink(params as CreateLinkParams));

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
