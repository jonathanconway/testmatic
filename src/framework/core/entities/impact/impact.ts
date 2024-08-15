import { Tag } from "../tag";
import { Test } from "../test";

export interface ImpactItem {
  readonly item: Tag | Test;
  readonly itemType: "test" | "tag";
  readonly items: readonly ImpactItem[];
}
