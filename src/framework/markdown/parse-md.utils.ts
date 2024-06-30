import { memoize, snakeCase } from "lodash";
import { TokensList } from "marked";

import {
  assertNotNil,
  betweenElements,
  byNot,
  byStartsWith,
  byStartsWithOneOf,
  isNotNil,
} from "../utils";

import { isMdHeadingLevel, isMdParagraph } from "./markdown.utils";

export const getHeadingNodes = memoize(
  (root: TokensList) => root.filter(isMdHeadingLevel(2)) ?? []
);

export const getHeadingsNodesByText = memoize((root: TokensList) =>
  Object.fromEntries(
    getHeadingNodes(root).map((heading) => [heading.text, heading])
  )
);

export const getTitleNode = memoize((root: TokensList) => {
  const titleNode = tryGetTitleNode(root);
  assertNotNil(titleNode, "title", { root });
  return titleNode;
});

export const tryGetTitleNode = memoize((root: TokensList) => {
  return root.find(isMdHeadingLevel(1));
});

const PARSABLE_HEADINGS = ["Links"];

export function parseDescriptionLines(root: TokensList) {
  const allHeadingNodes = getHeadingNodes(root);

  const parsableHeadingNodes = allHeadingNodes.filter((headingNode) =>
    PARSABLE_HEADINGS.includes(headingNode?.text?.trim() ?? "")
  );

  const titleNode = tryGetTitleNode(root);

  const descriptionElements = betweenElements(
    root,
    titleNode,
    parsableHeadingNodes[0]
  );
  const descriptionLines = descriptionElements.map((element) => element.raw);

  return descriptionLines;
}

export function parseDescriptionLineByPrefix(
  descriptions: readonly string[],
  prefix: string
) {
  return snakeCase(
    descriptions.find(byStartsWith(prefix))?.split(prefix)[1].trim()
  );
}

export function parseDescriptionJoinedByNotPrefix(
  descriptions: readonly string[],
  prefixes: readonly string[]
) {
  return descriptions
    .filter(byNot(byStartsWithOneOf(prefixes)))
    .join("\n")
    .trim()
    .trimLines();
}

export function parseDescription(root: TokensList) {
  const headingNodes = getHeadingNodes(root);
  const titleNode = getTitleNode(root);

  const titleNodeNextNodes = betweenElements(
    root,
    titleNode,
    headingNodes[0]
  ).filter(isNotNil);

  const descriptionNode = titleNodeNextNodes.find(isMdParagraph);
  const description = descriptionNode?.text.trim();

  return description;
}
