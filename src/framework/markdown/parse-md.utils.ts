import memoize from "lodash/memoize";
import { Root } from "mdast";

import { MarkdownSource, Tag } from "../core";
import {
  assertNotNil,
  betweenElements,
  isNotNil,
  sentenceCase,
} from "../utils";

import {
  getMdText,
  getMdTextContent,
  isMdHeadingLevel,
  isMdParagraph,
  toFirstChild,
} from "./markdown.utils";

export const getHeadingNodes = memoize(
  (root: Root) => root?.children.filter(isMdHeadingLevel(2)) ?? []
);

export const getHeadingsNodesByText = memoize((root: Root) =>
  Object.fromEntries(
    getHeadingNodes(root).map((heading) => [
      getMdTextContent(toFirstChild(heading)).trim(),
      heading,
    ])
  )
);

export const getTitleNode = memoize((root: Root) => {
  const titleNode = root?.children.find(isMdHeadingLevel(1));
  assertNotNil(titleNode, "title", { root });
  return titleNode;
});

const PARSABLE_HEADINGS = ["Links"];

export function parseDescriptionLines(root: Root, source: MarkdownSource) {
  const allHeadingNodes = getHeadingNodes(root);

  const parsableHeadingNodes = allHeadingNodes.filter((headingNode) =>
    PARSABLE_HEADINGS.includes(getMdText(headingNode)?.trim() ?? "")
  );

  const titleNode = getTitleNode(root);

  const start = titleNode?.position?.end?.offset ?? 0;
  const end = parsableHeadingNodes[0]?.position?.start?.offset;

  const descriptionLines = source.substring(start, end).split("\n");

  return descriptionLines;
}

export function parseDescription(root: Root) {
  const headingNodes = getHeadingNodes(root);
  const titleNode = getTitleNode(root);

  const titleNodeNextNodes = betweenElements(
    root?.children,
    titleNode,
    headingNodes[0]
  ).filter(isNotNil);

  const descriptionNode = titleNodeNextNodes.find(isMdParagraph);
  const description = getMdText(descriptionNode);

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
