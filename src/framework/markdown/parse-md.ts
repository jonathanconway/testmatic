import { ProjectView, createProjectView } from "../core";
import { DirTree, FileTree } from "../files";

import { parseMdTags } from "./parse-md-tags";
import { parseMdTests } from "./parse-md-tests";

export function parseMd({
  testsFileTree,
  tagsFileTree,
  runsDirTree,
}: {
  readonly testsFileTree: FileTree;
  readonly tagsFileTree: FileTree;
  readonly runsDirTree: DirTree;
}): ProjectView {
  const { tags, tagsByName } = parseMdTags(tagsFileTree);

  const { tests, testTags } = parseMdTests(
    testsFileTree,
    runsDirTree,
    tagsByName
  );

  return createProjectView({
    tests,

    tags: [...tags, ...testTags],
  });
}
