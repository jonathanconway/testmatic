import { snakeCase } from "lodash";
import { marked } from "marked";

import { MarkdownSource, Tag } from "../core";

import { TYPE_LINE_PREFIX } from "./md-tag";
import { parseMdLinks } from "./parse-md-links";
import { parseMdTitle } from "./parse-md-title";
import {
  parseDescriptionJoinedByNotPrefix,
  parseDescriptionLineByPrefix,
  parseDescriptionLines,
} from "./parse-md.utils";

export function parseMdTag(source: MarkdownSource): Tag {
  const root = marked.lexer(source);

  const title = parseMdTitle(root);
  const name = snakeCase(title);
  const type = "tag";

  const descriptions = parseDescriptionLines(root);
  const description = parseDescriptionJoinedByNotPrefix(descriptions, [
    TYPE_LINE_PREFIX,
  ]);

  const tagType = parseMdTagType(descriptions);

  const links = parseMdLinks(root);

  return {
    title,
    type,
    name,
    description,
    tagType,
    links,
  };
}

function parseMdTagType(descriptions: readonly string[]) {
  return parseDescriptionLineByPrefix(descriptions, TYPE_LINE_PREFIX);
}
