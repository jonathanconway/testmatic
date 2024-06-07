import { existsSync, readdirSync, unlinkSync } from "fs";

import { DirFileTree } from "../../files";

/**
 * Delete all files direclty in the given path not found in the given dirFileTree.
 */
export function cleanDirFileTreeAtPath(path: string, fileTree: DirFileTree) {
  if (!existsSync(path)) {
    return;
  }

  for (const file of readdirSync(path)) {
    if (!fileTree[file]) {
      unlinkSync(`${path}/${file}`);
    }
  }
}
