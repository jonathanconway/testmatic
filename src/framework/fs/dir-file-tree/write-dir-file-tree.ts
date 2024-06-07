import { existsSync, mkdirSync, writeFileSync } from "fs";
import { isObject, isString } from "lodash";

import { DirFileTree } from "../../files";

/**
 * Non-destructively write the given DirFileTree structure to the file system at the given path.
 */
export function writeFileTree(path: string, fileTree: DirFileTree) {
  for (const [file, contents] of Object.entries(fileTree)) {
    if (isObject(contents)) {
      if (!existsSync(`${path}/${file}`)) {
        mkdirSync(`${path}/${file}`);
      }

      writeFileTree(`${path}/${file}`, contents);
    }
    if (isString(contents)) {
      writeFileSync(`${path}/${file}`, contents);
    }
  }
}
