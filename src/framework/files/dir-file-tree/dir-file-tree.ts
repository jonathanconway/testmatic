/**
 * Representation of a directory structure with files and subdirectories.
 */
export interface DirFileTree {
  readonly [key: string]: string | DirFileTree | undefined;
}
