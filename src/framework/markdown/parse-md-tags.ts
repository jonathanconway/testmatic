import { fromPairs } from "lodash";

import { FileTree } from "../files";

import { parseMdTag } from "./parse-md-tag";

export function parseMdTags(fileTree: FileTree) {
  const tagsSources = Object.values(fileTree);

  const tags = tagsSources.map(parseMdTag);

  const tagsByName = fromPairs(tags.map((tag) => [tag.name, tag]));

  return { tags, tagsByName };
}
