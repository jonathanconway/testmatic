import { createStep } from "../framework";

export const observe_topic_title_is__testing_searchstring__ = createStep(
  "observe_topic_title_is__testing_searchstring__",
  async () => {
    console.log("observe_topic_title_is__testing_searchstring__");
  }
);

test(
  "observe topic title is (testing searchstring)",
  observe_topic_title_is__testing_searchstring__.run
);
