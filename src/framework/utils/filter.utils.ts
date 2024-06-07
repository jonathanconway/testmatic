export function byNot<T>(fn: (input: T) => boolean) {
  return (item: T) => !fn(item);
}

export function byStartsWith<T extends string>(input: string) {
  return (item: T) => item.startsWith(input);
}

export function byStartsWithOneOf<T extends string>(inputs: readonly string[]) {
  return (item: T) => Boolean(inputs.find((input) => item.startsWith(input)));
}
