import snakeCase from "lodash/snakeCase";
import { Tokens, TokensList } from "marked";

import { Tag } from "../core";
import { getNextElement, getNextElements, isNotNil } from "../utils";

import {
  getMdTextContent,
  isMdList,
  isMdListItem,
  isMdParagraph,
  toFirstChild,
} from "./markdown.utils";
import {
  getHeadingsNodesByText,
  matchExistingOrCreateTag,
} from "./parse-md.utils";

export function parseMdTestTags(
  root: TokensList,
  existingTagsByName: Record<string, Tag>
) {
  const headingsByText = getHeadingsNodesByText(root);
  const tagsHeading = headingsByText["Tags"];
  const tagsList = getNextElements(root, tagsHeading).find(isMdList);

  const tags: readonly Tag[] =
    tagsList?.items
      ?.filter(isMdListItem)
      .filter(isNotNil)
      .map(getMdTextContent)
      .map(snakeCase)
      .map(matchExistingOrCreateTag(existingTagsByName)) ?? [];

  return tags;
}
