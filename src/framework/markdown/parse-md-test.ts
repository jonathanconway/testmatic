import { remark } from "remark";

import { Tag, Test } from "../core";
import { convertTitleToName } from "../utils";

import { parseMdLinks } from "./parse-md-links";
import { parseMdTestSteps } from "./parse-md-test-steps";
import { parseMdTestTags } from "./parse-md-test-tags";
import { parseMdTitle } from "./parse-md-title";
import { parseDescription } from "./parse-md.utils";

export function parseMdTest(
  source: string,
  existingTagsByName: Record<string, Tag>
): Test {
  const root = remark().parse(source);

  const title = parseMdTitle(root);

  const name = convertTitleToName(title);

  const description = parseDescription(root);

  const steps = parseMdTestSteps(root, existingTagsByName);

  const links = parseMdLinks(root);

  const tags = parseMdTestTags(root, existingTagsByName);

  return {
    name,
    title,
    steps,
    links,
    description,
    tags,
    runs: [],
  };
}
