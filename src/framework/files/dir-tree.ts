import { Stats, readdirSync, statSync } from "fs";
import { resolve } from "path";

import { isNotNil } from "../utils";

export type DirTree = Record<string, Record<string, readonly string[]>>;

export function getDirTree(path: string) {
  let tree: any = {};

  // dir
  const dirsOrFiles = readdirSync(path);
  const dirs = dirsOrFiles.filter((subdir) =>
    statSync(resolve(path, subdir)).isDirectory()
  );

  for (const dir of dirs) {
    // subdirs
    const subdirsOrFiles = readdirSync(`${path}/${dir}`);
    const subDirs = subdirsOrFiles.filter((subDir) =>
      statSync(resolve(path, dir, subDir)).isDirectory()
    );

    // files
    for (const subDir of subDirs) {
      const subSubdirsOrFiles = readdirSync(`${path}/${dir}/${subDir}`);
      const files = subSubdirsOrFiles
        .map((subDir) => ({
          subDir,
          stat: statSync(resolve(dir, subDir), {
            throwIfNoEntry: false,
          }),
        }))
        .filter(
          ({ stat }) =>
            isNotNil(stat) &&
            !stat.isDirectory() &&
            stat.isFile() &&
            subDir.trim() !== ".DS_Store"
        )
        .map(({ subDir }) => subDir);

      tree[dir] = tree[dir] ?? {};
      tree[dir][subDir] = tree[dir][subDir] ?? [];
      tree[dir][subDir].push(...files);
    }
  }

  return tree;
}
