import {
  readFileSync,
  readdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import fromPairs from "lodash/fromPairs";
import { resolve } from "path";

export type DirTree = Record<string, Record<string, readonly string[]>>;

export function getDirTree(path: string) {
  let tree: any = {};

  // dir
  const dirsOrFiles = readdirSync(path);
  const dirs = dirsOrFiles.filter((subdir) =>
    statSync(resolve(path, subdir)).isDirectory()
  );
  // .map((dir) => `${path}/${dir}`);

  for (const dir of dirs) {
    // subdirs
    const subdirsOrFiles = readdirSync(`${path}/${dir}`);
    const subDirs = subdirsOrFiles.filter((subDir) =>
      statSync(resolve(path, dir, subDir)).isDirectory()
    );
    // .map((subDir) => `${dir}/${subDir}`);

    // files
    for (const subDir of subDirs) {
      const subSubdirsOrFiles = readdirSync(`${path}/${dir}/${subDir}`);
      const files = subSubdirsOrFiles.filter(
        (subDir) => !statSync(resolve(path, dir, subDir)).isDirectory()
      );
      // .map((subSubDir) => `${subDir}/${subSubDir}`);
      // console.log("1", subDirs);

      tree[dir] = tree[dir] ?? {};
      tree[dir][subDir] = tree[dir][subDir] ?? [];
      tree[dir][subDir].push(...files);
    }
  }

  return tree;
}

export type FileTree = Record<string, string>;

export function writeFileTree(path: string, fileTree: FileTree) {
  for (const [file, contents] of Object.entries(fileTree)) {
    writeFileSync(`${path}/${file}`, contents);
  }

  cleanupFileTree(path, fileTree);
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

function cleanupFileTree(path: string, fileTree: FileTree) {
  for (const file of readdirSync(path)) {
    if (!fileTree[file]) {
      unlinkSync(`${path}/${file}`);
    }
  }
}
