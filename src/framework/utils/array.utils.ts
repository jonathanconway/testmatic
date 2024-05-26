import { List, Many, PropertyPath, uniq, without } from "lodash";
import fromPairs from "lodash/fromPairs";
import get from "lodash/get";
import pick from "lodash/pick";
import { Token } from "marked";

export function isNotNil<T>(item?: T | undefined | null | false): item is T {
  return Boolean(item);
}

export function toPicked<T extends object, U extends keyof T>(
  ...props: Array<Many<U>>
) {
  return (item: T) => pick(item, ...props);
}

export function toGot<T extends object, U extends keyof T>(path: U | [U]) {
  return (item: T) => get(item, path);
}

export function byEquals<T extends object, U extends keyof T>(
  field: PropertyPath,
  value: T[U]
) {
  return (item: T) => get(item, field) === value;
}

export function byHas<T extends object>(predicate: (item: T) => boolean) {
  return (item: T) => predicate(item);
}

export function betweenElements<T>(
  array: T[] | readonly T[],
  afterElement: T,
  beforeElement?: T
) {
  return array.slice(
    array.indexOf(afterElement) + 1,
    beforeElement ? array.indexOf(beforeElement) : undefined
  );
}

export function getNextElement<T>(array: T[] | readonly T[], element: T) {
  return array[array.indexOf(element) + 1];
}

export function getNextElements<T>(array: T[] | readonly T[], element: T) {
  return array.slice(array.indexOf(element) + 1);
}

declare global {
  interface Array<T> {
    toObject(this: Array<T>): object;
    without(this: Array<T>, item: T): Array<T>;
    uniq(this: Array<T>): Array<T>;
  }
}

Array.prototype.toObject = function <T>(this: Array<T>) {
  return fromPairs(this as List<[]>);
};

Array.prototype.without = function <T>(this: Array<T>, item: T) {
  return without(this, item);
};

Array.prototype.uniq = function <T>(this: Array<T>) {
  return uniq(this);
};
