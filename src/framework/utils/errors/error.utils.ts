import { isError } from "lodash";

import {
  Result,
  ResultOkWithData,
  ResultWithData,
  isResultError,
} from "../../core";

import { TestmaticError } from "./testmatic-error";

export function isTestmaticError<T>(input: T | Error): input is TestmaticError {
  return input instanceof TestmaticError;
}

export function throwIfError<T>(input: T | Error) {
  if (isError(input)) {
    throw input;
  }
  return input;
}

export function throwIfResultError<TData extends object = object>(
  input: Result<TData>
) {
  if (isResultError(input)) {
    throw input.error;
  }
  return input;
}

export function throwIfResultWithDataError<TData extends object = object>(
  input: ResultWithData<TData>
): ResultOkWithData<TData> {
  if (isResultError(input)) {
    throw input.error ?? new Error();
  }
  return input as ResultOkWithData<TData>;
}
