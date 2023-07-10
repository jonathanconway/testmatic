import { createTest } from "../framework";
import {
  go_to_wikipedia,
  observe_topic_title_is__testing_searchstring__,
  search_for__software_testing_searchstring__now,
} from "../steps";

export const topic_can_be_found_by_search = createTest({
  name: "topic_can_be_found_by_search",
  steps: [
    go_to_wikipedia,
    search_for__software_testing_searchstring__now,
    observe_topic_title_is__testing_searchstring__,
  ],
});

test("topic can be found by search", topic_can_be_found_by_search.run);
