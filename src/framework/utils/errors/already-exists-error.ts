export class AlreadyExistsError extends Error {
  public name = "AlreadyExistsError";
}

export function isAlreadyExistsError<T>(
  input: T | AlreadyExistsError
): input is AlreadyExistsError {
  return input instanceof AlreadyExistsError;
}
