import { createStep } from "../framework";

export const search_for_topic = createStep("search_for_topic", async () => {
  console.log("search_for_topic");
});

test("search for topic", search_for_topic.run);
