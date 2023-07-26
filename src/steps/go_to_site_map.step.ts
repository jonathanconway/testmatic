import { createStep } from "../framework";

export const go_to_site_map = createStep(
  "go_to_site_map",
  async () => {
    console.log("go_to_site_map");
  }
);

test("go to site map", go_to_site_map.run);