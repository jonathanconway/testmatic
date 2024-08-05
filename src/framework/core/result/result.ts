import { TypeOfConst } from "../../utils";

export const ResultTypes = {
  Ok: "ok",
  Error: "error",
} as const;

export type ResultType = TypeOfConst<typeof ResultTypes>;

export interface ResultBase<TResultData extends object = object> {
  readonly type: ResultType;
  readonly message?: string;
  readonly data?: TResultData;
}

export interface ResultOk<TData extends object = object>
  extends ResultBase<TData> {
  readonly type: "ok";
}

export interface ResultOkWithData<TData extends object = object>
  extends Omit<ResultBase<TData>, "data"> {
  readonly type: "ok";
  readonly data: TData;
}

export function resultOk<TData extends object = object>(
  message?: string
): ResultOk<TData> {
  return { type: "ok", message };
}

export function resultOkWithData<TData extends object = object>(
  data: TData,
  message?: string
): ResultOkWithData<TData> {
  return { type: "ok", data, message };
}

export interface ResultError<TError extends object = object>
  extends ResultBase {
  readonly type: "error";
  readonly error?: TError;
}

export function resultError<TError extends object = object>(
  error?: TError
): ResultError<TError> {
  return {
    type: "error",
    error,
  };
}

export function isResultError(result: Result): result is ResultError {
  return result.type === "error";
}

export type Result<TData extends object = object> =
  | ResultOk<TData>
  | ResultError;

export type ResultWithData<TData extends object = object> =
  | ResultOkWithData<TData>
  | ResultError;
