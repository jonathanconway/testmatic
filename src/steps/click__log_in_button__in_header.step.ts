import { createStep } from "../framework";

export const click__log_in_button__in_header = createStep(
  "click__log_in_button__in_header",
  async () => {
    console.log("click__log_in_button__in_header");
  }
);

test("click (log in button) in header", click__log_in_button__in_header.run);
