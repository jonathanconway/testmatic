import { createStep } from "../framework";

export const search_for_topic = createStep(
  "search_for_topic",
  undefined,
  async () => {
    console.log("search_for_topic");
  }
);

test("search for topic", search_for_topic.run);
