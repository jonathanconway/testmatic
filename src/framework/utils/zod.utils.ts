import { ZodObject, ZodRawShape } from "zod";
import { ZodError, fromZodError } from "zod-validation-error";
import { errorUtil } from "zod/lib/helpers/errorUtil";

import { ValidationError } from "./errors";

export const hasErrorFields = <T extends object, Z extends ZodRawShape>(
  validator: ZodObject<Z>,
  input: Partial<T>
) => getErrorFields(validator, input).length > 0;

export const getErrorFields = <T extends object, Z extends ZodRawShape>(
  validator: ZodObject<Z>,
  input: Partial<T>
): readonly (keyof T)[] => {
  const validationResult = validator.safeParse(input);

  if ("error" in validationResult) {
    return (validationResult.error?.errors ?? [])
      .flatMap((error) => error.path)
      .map((field) => field as keyof T);
  }

  return [];
};

export function throwIfFieldsError<T extends object, Z extends ZodRawShape>(
  validator: ZodObject<Z>,
  input: Partial<T>
): asserts input is T {
  const errorFields = getErrorFields(validator, input);
  if (errorFields.length > 0) {
    throw new Error(`Validation error for fields: ${errorFields.join(", ")}`);
  }
}

type ZodRegexParams = [RegExp, errorUtil.ErrMessage];

export const ZOD_REGEX_START_WITH_ALPHA: ZodRegexParams = [
  /^[a-zA-Z]/,
  "Should start with a letter.",
];

// todo: move to separate files, e.g. date ones to date files

export const ZOD_REGEX_DATE_TIME_STRING: ZodRegexParams = [
  /[0-9]{4}-[0-9]{2}-[0-9]{2}_[0-9]{2}-[0-9]{2}/,
  "Should be a date/time string in the format: yyyy-MM-dd_hh-mm.",
];

export function createValidationErrorFromZodError(zodError: ZodError) {
  const message = fromZodError(zodError).toString();

  return new ValidationError(message);
}
