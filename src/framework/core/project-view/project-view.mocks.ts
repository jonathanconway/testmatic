import fromPairs from "lodash/fromPairs";

import { MOCK_TAGS } from "../tag";
import { MOCK_TESTS } from "../test";

import { ProjectView } from "./project-view";

export const MOCK_PROJECT_VIEW: ProjectView = {
  tests: MOCK_TESTS,
  testsByName: fromPairs(MOCK_TESTS.map((test) => [test.name, test])),
  tags: MOCK_TAGS,
  tagsByName: fromPairs(MOCK_TAGS.map((tag) => [tag.name, tag])),
};
