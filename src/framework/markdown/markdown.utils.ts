import {
  Heading,
  Link,
  List,
  ListItem,
  Literal,
  Node,
  Paragraph,
  Parent,
  PhrasingContent,
  RootContent,
  Text,
} from "mdast";

export async function getRemarkParser() {
  const { unified } = await import("unified");
  const remarkParse = (await import("remark-parse")).default;

  const remarkParser = unified().use(remarkParse);
  return remarkParser;
}

export function isMdText(node: Node): node is Text {
  return node.type === "text";
}

export function isMdLink(node: Node): node is Link {
  return node.type === "link";
}

export function isMdParagraph(node: Node): node is Paragraph {
  return node.type === "paragraph";
}

export function isMdHeading(node: Node): node is Heading {
  return node.type === "heading";
}

export function isMdListItem(node: Node): node is ListItem {
  return node.type === "listItem";
}

export function isMdHavingText(node: Node): node is Literal {
  return "value" in node;
}

export function toFirstChild(node: Parent) {
  return node.children[0];
}

export function isMdHeadingLevel(depth: number) {
  return (node: Node): node is Heading => {
    return isMdHeading(node) && node.depth === depth;
  };
}

export function getMdTextContent(rootContent?: RootContent) {
  if (!rootContent) {
    return "";
  }
  return (rootContent as Text).value;
}

export function getMdListItemTexts(stepsList: List) {
  return stepsList.children
    .filter(isMdListItem)
    .map(toFirstChild)
    .filter(isMdParagraph)
    .map(toFirstChild)
    .map(getMdTextContent);
}

export function getMdText<T extends { readonly children: PhrasingContent[] }>(
  node?: T
) {
  if (!node) {
    return undefined;
  }
  return node.children.filter(isMdHavingText).map(getMdTextContent).join(" ");
}
