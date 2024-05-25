import { array, object, string, enum as zEnum } from "zod";

import { ZOD_REGEX_DATE_TIME_STRING } from "../../utils";
import { linkValidator } from "../link";

import { RunResults } from "./run-result";

export const runValidator = object({
  dateTime: string().regex(
    ZOD_REGEX_DATE_TIME_STRING.regex,
    ZOD_REGEX_DATE_TIME_STRING.message
  ),
  result: zEnum([
    RunResults.Passed,
    RunResults.Mixed,
    RunResults.Failed,
  ] as const).optional(),
  links: array(linkValidator),
});
