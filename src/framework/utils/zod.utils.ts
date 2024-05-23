import { ZodObject, ZodRawShape } from "zod";

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

export const ZOD_REGEX_ALPHA_NUMBERS_UNDERSCORES = {
  regex: /^[a-zA-Z0-9_]*$/,
  message: "Should contain only letters, numbers and underscores (_).",
};

export const ZOD_REGEX_START_WITH_ALPHA = {
  regex: /^[a-zA-Z]/,
  message: "Should start with a letter.",
};
