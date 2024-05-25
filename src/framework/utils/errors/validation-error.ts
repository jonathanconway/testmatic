export class ValidationError extends Error {
  public name = "ValidationError";
}

export function isValidationError<T>(
  input: T | ValidationError
): input is ValidationError {
  return input instanceof ValidationError;
}
