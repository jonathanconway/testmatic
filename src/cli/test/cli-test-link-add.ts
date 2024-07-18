import { createCommand } from "commander";
import promptSync from "prompt-sync";

import {
  CreateLinkParams,
  Link,
  createLink,
  isValidationError,
  projectAddTestLink,
  projectMdRead,
  projectMdWrite,
  throwIfError,
} from "../../framework";
import { PARAM_LINK_HREF } from "../link";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestLinkAddParameters = [
  string /* testNameOrTitle */,
  string /* linkHrefOrTitle */,
  {
    readonly testName: string;
    readonly href: string;
    readonly title?: string;
  }
];

export const cliTestLinkAddCommand = createCommand("add")
  .description("Add a new link to a test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_LINK_HREF.name, PARAM_LINK_HREF.description)
  .option(
    "-t, --title <value>",
    `
Title of the new link.

Optional.
`.trim()
  )
  .action(cliTestLinkAdd);

export function cliTestLinkAdd(...args: TestLinkAddParameters) {
  const [lookupTestNameOrTitle] = args;

  const project = throwIfError(projectMdRead());

  const newLink = createTestLinkFromArgsOrPrompts(args);

  const updatedProject = throwIfError(
    projectAddTestLink({
      project,
      lookupTestNameOrTitle,
      newLink,
    })
  );

  projectMdWrite(updatedProject);
}

function createTestLinkFromArgsOrPrompts(args: TestLinkAddParameters): Link {
  const [, href, { title }] = args;

  const paramsFromArgs = { href, title };

  const paramsFromPrompts = getTestAddParamsFromPrompts({
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

function getTestAddParamsFromPrompts(paramsSoFar: Partial<CreateLinkParams>) {
  let params: Partial<CreateLinkParams> = {};

  if (!paramsSoFar.href) {
    const href = getTestAddHrefFromPrompt();
    params = {
      ...params,
      href,
    };
  }

  if (!paramsSoFar.href && !paramsSoFar.title) {
    const title = getTestAddTitleFromPrompt();
    params = {
      ...params,
      title,
    };
  }

  return params;
}

const prompt = promptSync();

function getTestAddHrefFromPrompt() {
  return prompt("Please enter link href: ");
}

function getTestAddTitleFromPrompt() {
  return prompt("Please enter link title:\n(Empty line to skip)\n");
}
