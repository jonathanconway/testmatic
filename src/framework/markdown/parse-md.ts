import { ProjectView } from "../core";
import { FileTree } from "../files/file-tree";

import { parseMdTags } from "./parse-md-tags";
import { parseMdTests } from "./parse-md-tests";

export function parseMd({
  testsFileTree,
  tagsFileTree,
}: {
  readonly testsFileTree: FileTree;
  readonly tagsFileTree: FileTree;
}): ProjectView {
  const { tags, tagsByName } = parseMdTags(tagsFileTree);

  const { tests, testsByName } = parseMdTests(testsFileTree, tagsByName);

  return {
    tests,
    testsByName,

    tags,
    tagsByName,
  };
}
