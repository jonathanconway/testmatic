import { Item } from "../item";
import { Link } from "../link";
import { MarkdownSource } from "../markdown";
import { Run } from "../run";
import { Step } from "../step";
import { Tag } from "../tag";

export interface Test extends Item {
  readonly type: "test";
  readonly name: string;
  readonly title: MarkdownSource;
  readonly description?: MarkdownSource;
  readonly steps: readonly Step[];
  readonly links: readonly Link[];
  readonly tags: readonly Tag[];
  readonly runs: readonly Run[];
}

export function isTest(input: object): input is Test {
  return "type" in input && input.type === "test";
}
