import { fromPairs, isString } from "lodash";

import { Tag, testGetTags } from "../core";
import { DirFileTree } from "../files";

import { parseMdTest } from "./parse-md-test";

export function parseMdTests(
  testsDirFileTree: DirFileTree,
  runsDirFileTree: DirFileTree,
  tagsByName: Record<string, Tag>
) {
  const testsSources = Object.values(testsDirFileTree).filter(isString);

  const tests = testsSources.map((testSource) =>
    parseMdTest(testSource, tagsByName, runsDirFileTree)
  );

  const testsByName = fromPairs(tests.map((test) => [test.name, test]));

  const testTags = tests.flatMap(testGetTags);

  return { tests, testsByName, testTags };
}
