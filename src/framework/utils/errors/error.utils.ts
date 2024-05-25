import { isError as _isError } from "lodash";
import { ValidationError } from "zod-validation-error";

import { CancelledError } from "./cancelled-error";
import { NotFoundError } from "./not-found-error";

export function isError<T>(input: T | Error): input is Error {
  return (
    _isError(input) ||
    input instanceof NotFoundError ||
    input instanceof CancelledError ||
    input instanceof ValidationError
  );
}
