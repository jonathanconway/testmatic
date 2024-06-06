import { fromPairs } from "lodash";

import { MOCK_TAGS } from "../tag/tag.mocks";
import { MOCK_TESTS } from "../test/test.mocks";

import { ProjectView } from "./project-view";

export const MOCK_PROJECT_VIEW: ProjectView = {
  tests: MOCK_TESTS,
  testsByName: fromPairs(MOCK_TESTS.map((test) => [test.name, test])),
  tags: MOCK_TAGS,
  tagsByName: fromPairs(MOCK_TAGS.map((tag) => [tag.name, tag])),
  tagsByTitle: fromPairs(MOCK_TAGS.map((tag) => [tag.title, tag])),
};
