import { createTest } from "../framework";
import {
  go_to_wikipedia,
  observe_that_recent_topics_are_listed,
} from "../steps";

export const recent_topics_are_listed = createTest({
  name: "recent_topics_are_listed",
  steps: [go_to_wikipedia, observe_that_recent_topics_are_listed],
});

test("recent topics are listed", recent_topics_are_listed.run);
