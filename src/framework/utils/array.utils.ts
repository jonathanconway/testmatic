import {
  List,
  PropertyPath,
  fromPairs,
  get,
  isNil,
  uniq,
  without,
} from "lodash";

import { ScalarValue } from "./type.utils";

export function isNotNil<T>(item?: T | undefined | null | false): item is T {
  return Boolean(item);
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

export function betweenElements<T>(
  array: T[] | readonly T[],
  afterElement?: T,
  beforeElement?: T
) {
  return array
    .slice(
      afterElement ? array.indexOf(afterElement) + 1 : 0,
      beforeElement ? array.indexOf(beforeElement) : undefined
    )
    .filter(isNotNil);
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
    upsert(
      this: Array<T>,
      key: keyof T,
      matchValue: T[keyof T],
      itemToUpsert: T
    ): Array<T>;
    // todo: re-arrange to be consistent with insertAt
    upsertAt(this: Array<T>, atIndex: number, itemToUpsert: T): Array<T>;
    insertAt(this: Array<T>, itemToInsert: T, atIndex?: number): Array<T>;
  }

  interface ReadonlyArray<T> {
    toObject(this: ReadonlyArray<T>): object;
    without(this: ReadonlyArray<T>, item: T): ReadonlyArray<T>;
    uniq(this: ReadonlyArray<T>): ReadonlyArray<T>;
    upsert(
      this: ReadonlyArray<T>,
      key: keyof T,
      matchValue: T[keyof T],
      itemToUpsert: T
    ): ReadonlyArray<T>;
    // todo: use named params object
    upsertAt(
      this: ReadonlyArray<T>,
      atIndex: number,
      itemToUpsert: T
    ): ReadonlyArray<T>;
    insertAt(
      this: ReadonlyArray<T>,
      itemToInsert: T,
      atIndex?: number
    ): ReadonlyArray<T>;
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

Array.prototype.upsert = function <T>(
  this: Array<T>,
  key: keyof T,
  matchValue: T[keyof T],
  itemToUpsert: T
) {
  return upsert(this, key, matchValue, itemToUpsert);
};

export function upsert<T>(
  array: T[] | readonly T[],
  key: keyof T,
  matchValue: T[keyof T],
  itemToUpsert: T
) {
  return array.map((item) => (item[key] === matchValue ? itemToUpsert : item));
}

Array.prototype.upsertAt = function <T>(
  this: Array<T>,
  atIndex: number,
  itemToUpsert: T
) {
  return upsertAt(this, atIndex, itemToUpsert);
};

export function upsertAt<T>(
  array: T[] | readonly T[],
  atIndex: number,
  itemToUpsert: T
) {
  return array.map((item, itemIndex) =>
    itemIndex === atIndex ? itemToUpsert : item
  );
}

Array.prototype.insertAt = function <T>(
  this: Array<T>,
  itemToInsert: T,
  atIndex?: number
) {
  return insertAt(this, itemToInsert, atIndex);
};

export function insertAt<T>(
  array: T[] | readonly T[],
  itemToInsert: T,
  atIndex?: number
) {
  if (isNil(atIndex) || atIndex > array.length - 1) {
    return [...array, itemToInsert];
  }

  if (atIndex < 0) {
    return [itemToInsert, ...array];
  }

  return array
    .map((item, itemIndex) =>
      itemIndex === atIndex ? [itemToInsert, item] : [item]
    )
    .flat();
}

/**
 * Checks if array elements are unique.
 * @param array
 * @see https://stackoverflow.com/questions/57001262/jest-expect-only-unique-elements-in-an-array
 */
export function isUnique<T extends ScalarValue>(array: T[] | readonly T[]) {
  return new Set(array).size === array.length;
}
