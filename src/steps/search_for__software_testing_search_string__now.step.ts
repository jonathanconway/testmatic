import { createStep } from "../framework";

export const search_for__software_testing_searchstring__now = createStep(
  "search_for__software_testing_searchstring__now",
  async () => {
    console.log("search_for__software_testing_searchstring__now");
  }
);

test(
  "search for (software testing search string) now",
  search_for__software_testing_searchstring__now.run
);
