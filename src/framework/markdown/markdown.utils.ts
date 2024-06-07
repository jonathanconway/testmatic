import { Token, Tokens } from "marked";

const NodeTypes = {
  Heading: "heading",
  Link: "link",
  List: "list",
  ListItem: "list_item",
  Paragraph: "paragraph",
  Text: "text",
} as const;

export function isMdText(node: Token): node is Tokens.Text {
  return node.type === NodeTypes.Text;
}

export function isMdLink(node: Token): node is Tokens.Link {
  return node.type === NodeTypes.Link;
}

export function isMdParagraph(node: Token): node is Tokens.Paragraph {
  return node.type === NodeTypes.Paragraph;
}

export function isMdHeading(node: Token): node is Tokens.Heading {
  return node.type === NodeTypes.Heading;
}

export function isMdList(node: Token): node is Tokens.List {
  return node.type === NodeTypes.List;
}

export function isMdListItem(node: Token): node is Tokens.ListItem {
  return node.type === NodeTypes.ListItem;
}

export function isMdHavingText(node: Token): node is TokenWithText {
  return "text" in node;
}

type TokenWithChildren = Tokens.ListItem | Tokens.Paragraph | Tokens.Text;

export function toFirstChild(node: TokenWithChildren) {
  return node.tokens?.[0];
}

export function isMdHeadingLevel(depth: number) {
  return (node: Token): node is Tokens.Heading => {
    return isMdHeading(node) && node.depth === depth;
  };
}

type TokenWithText = Token & {
  text: string;
};

export function getMdTextContent(token?: Token) {
  if (!token) {
    return "";
  }
  if (!("text" in token)) {
    return "";
  }
  return token.text;
}

export function getMdListItemTexts(stepsList: Tokens.List) {
  return stepsList.items.filter(isMdListItem).map(getMdTextContent);
}
