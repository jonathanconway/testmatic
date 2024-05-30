import { array, object, string } from "zod";

import { ZOD_REGEX_START_WITH_ALPHA } from "../../utils";
import { linkValidator } from "../link";
import { runValidator } from "../run";
import { stepValidator } from "../step";
import { tagValidator } from "../tag";

export const testValidator = object({
  title: string().regex(
    ZOD_REGEX_START_WITH_ALPHA.regex,
    ZOD_REGEX_START_WITH_ALPHA.message
  ),
  description: string().optional(),
  steps: array(stepValidator).nonempty(),
  links: array(linkValidator),
  tags: array(tagValidator),
  runs: array(runValidator),
});
