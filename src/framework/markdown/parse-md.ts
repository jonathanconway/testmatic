import { isObject, uniq, uniqBy } from "lodash";

import { ProjectView, createProjectView } from "../core";
import { DirFileTree } from "../files";

import { parseMdTags } from "./parse-md-tags";
import { parseMdTests } from "./parse-md-tests";

export function parseMd({
  projectFileTree,
}: {
  projectFileTree: DirFileTree;
}): ProjectView {
  const tagsDirFileTree = isObject(projectFileTree["tags"])
    ? projectFileTree["tags"]
    : {};

  const { tags, tagsByName, tagsByTitle } = parseMdTags(tagsDirFileTree);

  const testsDirFileTree = isObject(projectFileTree["tests"])
    ? projectFileTree["tests"]
    : {};

  const runsDirFileTree = isObject(projectFileTree["runs"])
    ? projectFileTree["runs"]
    : {};

  const { tests, testTags } = parseMdTests(testsDirFileTree, runsDirFileTree, {
    tests: [],
    testsByName: {},
    tags,
    tagsByName,
    tagsByTitle,
  } as ProjectView);

  return createProjectView({
    tests,

    tags: uniqBy([...tags, ...testTags], (tag) => tag.name),
  });
}
