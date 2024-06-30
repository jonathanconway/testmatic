import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { partition } from "lodash";
import { resolve } from "path";

import { DirFileTree } from "../../files";
import { hasOneOfExtensions } from "../../utils";

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
