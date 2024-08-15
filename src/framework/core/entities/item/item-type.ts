import { TypeOfConst } from "../../../utils";

export const ItemTypes = {
  Test: "test",
  Step: "step",
  Tag: "tag",
  Link: "link",
  Run: "run",
};

export type ItemType = TypeOfConst<typeof ItemTypes>;
