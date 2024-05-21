import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import fromPairs from "lodash/fromPairs";
import isObject from "lodash/isObject";
import isString from "lodash/isString";
import { resolve } from "path";

export type FileTree = Record<string, string>;

export interface DirOrFileTree {
  readonly [key: string]: string | DirOrFileTree;
}

export function writeFileTree(path: string, fileTree: DirOrFileTree) {
  for (const [file, contents] of Object.entries(fileTree)) {
    if (isObject(contents)) {
      writeFileTree(`${path}/${file}`, contents);
    }
    if (isString(contents)) {
      writeFileSync(`${path}/${file}`, contents);
    }
  }
}

export function getFileTree(
  dir: string,
  extensions: readonly string[]
): FileTree {
  const files = getFiles(dir, extensions);
  return fromPairs(
    files.map((file) => [file, readFileSync(`${dir}/${file}`).toString()])
  );
}

function getFiles(dir: string, extensions: readonly string[]) {
  const subdirsOrFiles = readdirSync(dir);
  const files = subdirsOrFiles.filter(
    (subdir) =>
      !statSync(resolve(dir, subdir)).isDirectory() &&
      Boolean(hasOneOfExtensions(extensions))
  );
  return files;
}

function hasOneOfExtensions(extensions: readonly string[]) {
  return (filename: string) =>
    extensions.includes(filename.split(".").slice(-1)[0].toLowerCase());
}

export function cleanupFileTree(path: string, fileTree: DirOrFileTree) {
  if (!existsSync(path)) {
    return;
  }

  for (const file of readdirSync(path)) {
    if (!fileTree[file]) {
      unlinkSync(`${path}/${file}`);
    }
  }
}
