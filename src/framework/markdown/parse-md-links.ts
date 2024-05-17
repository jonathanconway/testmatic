import { List, Root } from "mdast";

import { Link } from "../core";
import { getNextElement } from "../utils";

import {
  isMdLink,
  isMdListItem,
  isMdParagraph,
  isMdText,
  toFirstChild,
} from "./markdown.utils";
import { getHeadingsNodesByText } from "./parse-md.utils";

export function parseMdLinks(root: Root) {
  const headingsByText = getHeadingsNodesByText(root);
  const linksHeading = headingsByText["Links"];
  const linksList = getNextElement(root.children, linksHeading) as List;
  const links: readonly Link[] = linksList.children
    .filter(isMdListItem)
    .map(toFirstChild)
    .filter(isMdParagraph)
    .map(toFirstChild)
    .filter(isMdLink)
    .map((link) => ({
      title: link.children.find(isMdText)?.value,
      href: link.url,
    }));
  return links;
}
