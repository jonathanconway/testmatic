import { createTest } from "../framework";
import {
  go_to_wikipedia,
  observe_topic_title_is,
  search_for_topic,
} from "../steps";
import { software_testing } from "../tokens";

export const topic_can_be_found_by_search = createTest(
  "topic_can_be_found_by_search",
  undefined,
  [
    [go_to_wikipedia],
    [search_for_topic, [software_testing]],
    [observe_topic_title_is, [software_testing]],
  ]
);
