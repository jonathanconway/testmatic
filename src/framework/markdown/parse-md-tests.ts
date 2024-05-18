import fromPairs from "lodash/fromPairs";

import { Tag } from "../core";
import { DirTree, FileTree } from "../files";

import { parseMdTest } from "./parse-md-test";

export function parseMdTests(
  fileTree: FileTree,
  runsDirTree: DirTree,
  tagsByName: Record<string, Tag>
) {
  const testsSources = Object.values(fileTree);

  const tests = testsSources.map((testSource) =>
    parseMdTest(testSource, tagsByName, runsDirTree)
  );

  const testsByName = fromPairs(tests.map((test) => [test.name, test]));

  const testTags = tests.flatMap((test) => [
    ...test.tags,
    ...test.steps.flatMap((step) => step.tags),
  ]);

  return { tests, testsByName, testTags };
}
