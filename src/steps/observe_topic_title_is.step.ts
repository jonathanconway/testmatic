import { createStep } from "../framework";
import { searchScreen } from "../screens";

export const observe_topic_title_is = createStep(
  "observe_topic_title_is",
  undefined,
  async (title: string) => {
    console.log(`page.querySelector('h2').textContent === "${title}";`);
  },
  [searchScreen]
);

// test("observe_topic_title_is", async () => {
//   observe_topic_title_is.run("test");
// });
