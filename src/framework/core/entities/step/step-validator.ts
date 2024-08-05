import { array, object, string } from "zod";

import { tagValidator } from "../tag";

export const stepValidator = object({
  text: string(),
  tags: array(tagValidator),
});
