import { Link } from "../link";
import { MarkdownSource } from "../markdown";
import { Run } from "../run";
import { Step } from "../step";
import { Tag } from "../tag";

export interface Test {
  readonly name: string;
  readonly title: MarkdownSource;
  readonly description?: MarkdownSource;
  readonly steps: readonly Step[];
  readonly links: readonly Link[];
  readonly tags: readonly Tag[];
  readonly runs: readonly Run[];
}
