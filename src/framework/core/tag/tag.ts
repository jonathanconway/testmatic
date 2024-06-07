import { Item } from "../item";
import { Link } from "../link";

export interface Tag extends Item {
  readonly type: "tag";
  readonly name: string;
  readonly tagType?: string;
  readonly title: string;
  readonly description?: string;
  readonly links: readonly Link[];
}

export function isTag(input: object): input is Tag {
  return "type" in input && input.type === "tag";
}
