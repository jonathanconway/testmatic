import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import fromPairs from "lodash/fromPairs";
import { resolve } from "path";

export type FileTree = Record<string, string>;

function hasOneOfExtensions(extensions: readonly string[]) {
  return (filename: string) =>
    extensions.includes(filename.split(".").slice(-1)[0].toLowerCase());
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

export function getFileTree(
  dir: string,
  extensions: readonly string[]
): FileTree {
  const files = getFiles(dir, extensions);
  return fromPairs(
    files.map((file) => [file, readFileSync(`${dir}/${file}`).toString()])
  );
}

export function writeFileTree(path: string, fileTree: FileTree) {
  for (const [file, contents] of Object.entries(fileTree)) {
    writeFileSync(`${path}/${file}`, contents);
  }
}
