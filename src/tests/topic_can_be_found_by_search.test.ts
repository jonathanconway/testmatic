import { createTest } from "../framework";
import {
  go_to_wikipedia,
  observe_topic_title_is,
  search_for_topic,
} from "../steps";
import { software_testing_search_string } from "../tokens";

export const topic_can_be_found_by_search = createTest({
  name: "topic_can_be_found_by_search",
  testStepAndParamPairs: [
    [go_to_wikipedia],
    [search_for_topic, [software_testing_search_string]],
    [observe_topic_title_is, [software_testing_search_string]],
  ],
});

test("topic can be found by search", topic_can_be_found_by_search.run);
