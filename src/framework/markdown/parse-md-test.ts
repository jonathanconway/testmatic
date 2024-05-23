import { marked } from "marked";

import { Tag, Test } from "../core";
import { DirTree } from "../files";
import { convertTitleToName } from "../utils";

import { parseMdLinks } from "./parse-md-links";
import { parseMdRuns } from "./parse-md-runs";
import { parseMdTestSteps } from "./parse-md-test-steps";
import { parseMdTestTags } from "./parse-md-test-tags";
import { parseMdTitle } from "./parse-md-title";
import { parseDescription } from "./parse-md.utils";

export function parseMdTest(
  source: string,
  existingTagsByName: Record<string, Tag>,
  runsDirTree: DirTree
): Test {
  const root = marked.lexer(source);

  const title = parseMdTitle(root);

  const name = convertTitleToName(title);

  const description = parseDescription(root);

  const steps = parseMdTestSteps(root, existingTagsByName);

  const links = parseMdLinks(root);

  const tags = parseMdTestTags(root, existingTagsByName);

  const runs = parseMdRuns(runsDirTree, name);

  return {
    name,
    title,
    steps,
    links,
    description,
    tags,
    runs,
  };
}
