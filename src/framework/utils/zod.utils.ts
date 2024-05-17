import { memoize } from "lodash";
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

  console.log("getErrorFields", { validationResult });

  if ("error" in validationResult) {
    return validationResult.error.errors
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
