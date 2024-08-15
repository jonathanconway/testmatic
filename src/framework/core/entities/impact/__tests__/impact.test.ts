import { isUnique } from "../../../../utils";
import {
  MOCK_NEW_TAG_FOUR,
  MOCK_NEW_TAG_ONE,
  MOCK_NEW_TAG_THREE,
  MOCK_NEW_TAG_TWO,
} from "../../tag/tag.mocks";
import { MOCK_NEW_TEST, MOCK_TEST } from "../../test/test.mocks";
import { ImpactItem } from "../impact";
import { getItemAndSubItemNames } from "../impact-names";
import { pruneImpacts } from "../impact-prune";

describe("impact", () => {
  describe("pruneImpacts", () => {
    it("removes repeated sub-trees of items from impact tree", () => {
      const MOCK_IMPACT_ITEMS = [
        {
          item: MOCK_TEST,
          itemType: "test",
          items: [
            {
              item: MOCK_NEW_TAG_ONE,
              itemType: "tag",
              items: [
                {
                  item: MOCK_NEW_TAG_THREE,
                  itemType: "tag",
                  items: [],
                },
              ],
            },
            {
              item: MOCK_NEW_TAG_TWO,
              itemType: "tag",
              items: [
                {
                  item: MOCK_NEW_TAG_FOUR,
                  itemType: "tag",
                  items: [
                    {
                      item: MOCK_NEW_TAG_THREE,
                      itemType: "tag",
                      items: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          item: MOCK_NEW_TEST,
          itemType: "test",
          items: [],
        },
      ] as readonly ImpactItem[];

      const result = pruneImpacts(MOCK_IMPACT_ITEMS, []);

      result.map((result) => result.item.name);

      expect(isUnique(getItemAndSubItemNames(result))).toBe(true);
    });
  });
});
