import { createStep } from "../framework";

export const go_to_wikipedia = createStep("go_to_wikipedia", async () => {
  console.log(`browser.url("https://en.wikipedia.org/wiki/Main_Page");`);
});

test("go_to_wikipedia", go_to_wikipedia.run);
