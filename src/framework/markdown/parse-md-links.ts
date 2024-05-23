import { Tokens, TokensList } from "marked";

import { Link } from "../core";
import { getNextElement, getNextElements, isNotNil } from "../utils";

import {
  isMdLink,
  isMdList,
  isMdListItem,
  isMdText,
  toFirstChild,
} from "./markdown.utils";
import { getHeadingsNodesByText } from "./parse-md.utils";

export function parseMdLinks(root: TokensList) {
  const headingsByText = getHeadingsNodesByText(root);
  const linksHeading = headingsByText["Links"];
  const linksList = getNextElements(root, linksHeading).find(isMdList);

  const links: readonly Link[] =
    linksList?.items
      .filter(isMdListItem)
      .map(toFirstChild)
      .filter(isNotNil)
      .filter(isMdText)
      .map(toFirstChild)
      .filter(isNotNil)
      .filter(isMdLink)
      .map((link) => ({
        title: link.text,
        href: link.href,
      })) ?? [];
  return links;
}
