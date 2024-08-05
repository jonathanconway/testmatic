import { TestmaticError } from "./testmatic-error";

/**
 * Cannot create the entity because a different entity with the same identification already exists.
 */
export class AlreadyExistsError extends TestmaticError {
  public name = "AlreadyExistsError";
}

export function isAlreadyExistsError<T>(
  input: T | AlreadyExistsError
): input is AlreadyExistsError {
  return input instanceof AlreadyExistsError;
}
