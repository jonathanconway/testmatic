import { Tag } from "../tag";
import { Test } from "../test";

export interface Project {
  readonly tests: ReadonlyArray<Test>;
  readonly tags: ReadonlyArray<Tag>;
}
