import snakeCase from "lodash/snakeCase";
import { List, Root } from "mdast";

import { Tag } from "../core";
import { getNextElement, isNotNil } from "../utils";

import {
  getMdTextContent,
  isMdListItem,
  isMdParagraph,
  toFirstChild,
} from "./markdown.utils";
import {
  getHeadingsNodesByText,
  matchExistingOrCreateTag,
} from "./parse-md.utils";

export function parseMdTestTags(
  root: Root,
  existingTagsByName: Record<string, Tag>
) {
  const headingsByText = getHeadingsNodesByText(root);
  const tagsHeading = headingsByText["Tags"];
  const tagsList = getNextElement(root.children, tagsHeading) as List;

  const tags: readonly Tag[] =
    tagsList?.children
      ?.filter(isMdListItem)
      .map(toFirstChild)
      .filter(isNotNil)
      .filter(isMdParagraph)
      .map(toFirstChild)
      .map(getMdTextContent)
      .map(snakeCase)
      .map(matchExistingOrCreateTag(existingTagsByName)) ?? [];

  return tags;
}
