import { createStep } from "../framework";
import { searchScreen } from "../screens";

export const search_for_topic = createStep(
  "search_for_topic",
  undefined,
  async ([topic]) => {
    console.log(`search_for_topic ${topic}`);
    // console.log(search.searchInput);
    // console.log(search.searchButton);
  },
  [searchScreen]
);

// test("search_for_topic", async () => {
//   search_for_topic.run("test");
// });
