import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { partition } from "lodash";
import { resolve } from "path";

import { DirFileTree } from "../../files";

export function readDirFileTree(
  path: string,
  fileExtensions: readonly string[]
): DirFileTree {
  const dirsAndFiles = readdirSync(path).filter((subdir) =>
    existsSync(resolve(path, subdir))
  );

  const [dirs, files] = partition(dirsAndFiles, (subdir) =>
    statSync(resolve(path, subdir)).isDirectory()
  );

  const dirFileTree = Object.fromEntries([
    ...dirs.map((subdir) => [
      subdir,
      readDirFileTree(resolve(path, subdir), fileExtensions),
    ]),
    ...files.map((file) => [
      file,
      hasOneOfExtensions(fileExtensions)(file)
        ? readFileSync(resolve(path, file)).toString()
        : undefined,
    ]),
  ]);

  return dirFileTree;
}

function hasOneOfExtensions(extensions: readonly string[]) {
  return (filename: string) =>
    extensions.includes(filename.split(".").slice(-1)[0].toLowerCase());
}
