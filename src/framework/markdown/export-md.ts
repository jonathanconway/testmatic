import fromPairs from "lodash/fromPairs";

import { ProjectView } from "../core";

import { exportMdTag } from "./export-md-tag";
import { exportMdTest } from "./export-md-test";

export function exportMd(projectView: ProjectView) {
  return {
    tests: fromPairs(
      projectView.tests.map((test) => [`${test.name}.md`, exportMdTest(test)])
    ),
    tags: fromPairs(
      projectView.tags.map((tag) => [`${tag.name}.md`, exportMdTag(tag)])
    ),
  };
}
