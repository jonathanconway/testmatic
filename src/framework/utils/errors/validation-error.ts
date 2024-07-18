import { TestmaticError } from "./testmatic-error";

export class ValidationError extends TestmaticError {
  public name = "ValidationError";
}

export function isValidationError<T>(
  input: T | ValidationError
): input is ValidationError {
  return input instanceof ValidationError;
}
