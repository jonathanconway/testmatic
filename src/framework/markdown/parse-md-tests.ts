import fromPairs from "lodash/fromPairs";

import { Tag } from "../core";
import { FileTree } from "../files";

import { parseMdTest } from "./parse-md-test";

export function parseMdTests(
  fileTree: FileTree,
  tagsByName: Record<string, Tag>
) {
  const testsSources = Object.values(fileTree);

  const tests = testsSources.map((testSource) =>
    parseMdTest(testSource, tagsByName)
  );
  const testsByName = fromPairs(tests.map((test) => [test.name, test]));

  return { tests, testsByName };
}
