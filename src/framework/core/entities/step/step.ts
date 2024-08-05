import { MarkdownSource } from "../markdown";
import { Tag } from "../tag";

export interface Step {
  readonly text: MarkdownSource;
  readonly tags: readonly Tag[];
}
