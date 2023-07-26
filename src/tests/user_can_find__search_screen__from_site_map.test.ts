import { createTest } from "../framework";
import {
  go_to_wikipedia,
  go_to_site_map,
  observe_that__search_screen__is_listed_in_site_map,
} from "../steps";

export const user_can_find__search_screen__from_site_map = createTest({
  name: "user_can_find__search_screen__from_site_map",
  steps: [
    go_to_wikipedia,
    go_to_site_map,
    observe_that__search_screen__is_listed_in_site_map,
  ],
});

test("user can find (search screen) from site map", user_can_find__search_screen__from_site_map.run);