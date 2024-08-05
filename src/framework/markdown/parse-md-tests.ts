import { fromPairs, isString } from "lodash";

import { ProjectView, testGetTags } from "../core";
import { DirFileTree } from "../files";

import { parseMdTest } from "./parse-md-test";

// todo: change to param object
export function parseMdTests(
  testsDirFileTree: DirFileTree,
  runsDirFileTree: DirFileTree,
  project: ProjectView
) {
  const testsSources = Object.values(testsDirFileTree).filter(isString);

  const tests = testsSources.map((testSource) =>
    parseMdTest(testSource, project, runsDirFileTree)
  );

  const testsByName = fromPairs(tests.map((test) => [test.name, test]));

  const testTags = tests.flatMap(testGetTags);

  return { tests, testsByName, testTags };
}
