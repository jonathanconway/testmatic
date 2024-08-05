import { array, object } from "zod";

import { tagValidator } from "../tag";
import { testValidator } from "../test";

export const projectValidator = object({
  tests: array(testValidator),
  tags: array(tagValidator),
});
