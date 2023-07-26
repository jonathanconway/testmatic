import { createStep } from "../framework";

export const observe_that__search_screen__is_listed_in_site_map = createStep(
  "observe_that__search_screen__is_listed_in_site_map",
  async () => {
    console.log("observe_that__search_screen__is_listed_in_site_map");
  }
);

test("observe that (search screen) is listed in site map", observe_that__search_screen__is_listed_in_site_map.run);