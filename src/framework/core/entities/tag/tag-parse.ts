import { removeBrackets } from "../../../utils";

import { Tag, isTag } from "./tag";
import { createTagFromName } from "./tag-create";

export function parseTags(input: string): readonly Tag[] {
  return parseTagNames(input).map(createTagFromName).filter(isTag);
}

// todo: rename to parseTagTitles and make sure it works consistently everywhere it's used
export function parseTagNames(input: string) {
  const outerBracketsPattern = new RegExp(/\((.*?)\)/g);

  const tagNames = Array.from(input.matchAll(outerBracketsPattern))
    .map((match) => match[0])
    .map(removeBrackets);

  return tagNames;
}
