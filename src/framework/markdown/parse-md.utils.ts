import memoize from "lodash/memoize";
import { TokensList } from "marked";

import { MarkdownSource, Tag } from "../core";
import {
  assertNotNil,
  betweenElements,
  isNotNil,
  sentenceCase,
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
  const titleNode = root.find(isMdHeadingLevel(1));
  assertNotNil(titleNode, "title", { root });
  return titleNode;
});

const PARSABLE_HEADINGS = ["Links"];

export function parseDescriptionLines(root: TokensList) {
  const allHeadingNodes = getHeadingNodes(root);

  const parsableHeadingNodes = allHeadingNodes.filter((headingNode) =>
    PARSABLE_HEADINGS.includes(headingNode?.text?.trim() ?? "")
  );

  const titleNode = getTitleNode(root);

  const descriptionElements = betweenElements(
    root,
    titleNode,
    parsableHeadingNodes[0]
  );
  const descriptionLines = descriptionElements.map((element) => element.raw);

  return descriptionLines;
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

export function matchExistingOrCreateTag(
  existingTagsByName: Record<string, Tag>
) {
  return (tagName: string) => {
    return (
      existingTagsByName[tagName] ?? {
        name: tagName,
        links: [],
        title: sentenceCase(tagName),
      }
    );
  };
}
