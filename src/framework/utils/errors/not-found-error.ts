import { TestmaticError } from "./testmatic-error";

/**
 * Cannot find the specified entity.
 */
export class NotFoundError extends TestmaticError {
  public name = "NotFoundError";
}

export function isNotFoundError<T>(
  input: T | NotFoundError
): input is NotFoundError {
  return input instanceof NotFoundError;
}
