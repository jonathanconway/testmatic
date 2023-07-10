import { createStep } from "../framework";

export const observe_that_recent_topics_are_listed = createStep(
  "observe_that_recent_topics_are_listed",
  async () => {
    console.log("observe_that_recent_topics_are_listed");
  }
);

test(
  "observe that recent topics are listed",
  observe_that_recent_topics_are_listed.run
);
