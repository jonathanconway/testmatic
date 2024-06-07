import { fromPairs, isString } from "lodash";

import { DirFileTree } from "../files";

import { parseMdTag } from "./parse-md-tag";

export function parseMdTags(fileTree: DirFileTree) {
  const tagsSources = Object.values(fileTree).filter(isString);

  const tags = tagsSources.map(parseMdTag);

  const tagsByName = fromPairs(tags.map((tag) => [tag.name, tag]));

  return { tags, tagsByName };
}
