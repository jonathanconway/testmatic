import { ZodError, fromZodError } from "zod-validation-error";

import { ValidationError } from "./errors";

export function createValidationErrorFromZodError(zodError: ZodError) {
  const message = fromZodError(zodError).toString();

  return new ValidationError(message);
}
