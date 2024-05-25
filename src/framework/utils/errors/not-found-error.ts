export class NotFoundError extends Error {
  public name = "NotFoundError";
}

export function isNotFoundError<T>(
  input: T | NotFoundError
): input is NotFoundError {
  return input instanceof NotFoundError;
}
