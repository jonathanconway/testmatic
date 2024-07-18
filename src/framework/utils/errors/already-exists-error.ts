import { TestmaticError } from "./testmatic-error";

export class AlreadyExistsError extends TestmaticError {
  public name = "AlreadyExistsError";
}

export function isAlreadyExistsError<T>(
  input: T | AlreadyExistsError
): input is AlreadyExistsError {
  return input instanceof AlreadyExistsError;
}
