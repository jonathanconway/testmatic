import { snakeCase } from "lodash";
import { marked } from "marked";

import { MarkdownSource, Tag } from "../core";
import { byNot, byStartsWith } from "../utils";

import { parseMdLinks } from "./parse-md-links";
import { parseMdTitle } from "./parse-md-title";
import { parseDescriptionLines } from "./parse-md.utils";

const TYPE_LINE_PREFIX = "Type:";

export function parseMdTag(source: MarkdownSource): Tag {
  const root = marked.lexer(source);

  const title = parseMdTitle(root);
  const name = snakeCase(title);

  const descriptions = parseDescriptionLines(root);
  const description = descriptions
    .filter(byNot(byStartsWith(TYPE_LINE_PREFIX)))
    .join("\n")
    .trim()
    .trimLines();

  const type = parseMdTagType(descriptions);

  const links = parseMdLinks(root);

  return {
    title,
    name,
    description,
    type,
    links,
  };
}

function parseMdTagType(descriptions: readonly string[]) {
  return snakeCase(
    descriptions
      .find(byStartsWith(TYPE_LINE_PREFIX))
      ?.split(TYPE_LINE_PREFIX)[1]
      .trim()
  );
}
