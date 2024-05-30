export function assertTruthy<T>(
  value: T,
  message: string,
  data?: Object
): asserts value is NonNullable<T> {
  if (!value) {
    const details = JSON.stringify({ value, data });

    throw new Error(`${message}. ${details}`);
  }
}

export function assertType<T, TT extends T>(
  value: T | TT,
  checker: (value: T | TT) => boolean,
  typeName: string,
  data?: Object
): asserts value is TT {
  if (!checker(value)) {
    const details = JSON.stringify({
      value,
      data,
    });

    throw new Error(`Expected object to be of type ${typeName}. ${details}`);
  }
}

export function assertNotNil<T>(
  value: T,
  name: string,
  data?: Object
): asserts value is NonNullable<T> {
  assertTruthy(value, `Expected ${name} to be non-nil.`, data);
}

export function assertExists<T>(
  value: T,
  name: string,
  data?: Object
): asserts value is NonNullable<T> {
  assertTruthy(value, `Expected ${name} to exist.`, data);
}

export function assertHasText<T>(
  value: T,
  name: string,
  data?: Object
): asserts value is NonNullable<T> {
  assertTruthy(value, `Expected ${name} to have text.`, data);
}

export function assertNotEmptyString<T extends string>(
  value: T,
  name: string,
  data?: Object
): asserts value is NonNullable<T> {
  assertTruthy(value.trim(), `Expected ${name} to have text.`, data);
}

export function assertHasElements<T>(
  value: T,
  name: string,
  data?: Object
): asserts value is NonNullable<T> {
  assertTruthy(value, `Expected ${name} to have elements.`, data);
}
