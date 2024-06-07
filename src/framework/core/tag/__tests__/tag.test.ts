import { createTagFromName } from "../tag-create";
import { parseTagNames, parseTags } from "../tag-parse";

describe("tag", () => {
  describe("createTagFromName", () => {
    it("creates a new tag from provided name", () => {
      const tag = createTagFromName("username_field");

      expect(tag).toEqual({
        type: "tag",
        links: [],
        name: "username_field",
        title: "Username field",
      });
    });
  });

  describe("parseTags", () => {
    it("returns tags found in input which are surrounded by brackets - (a, ...)", () => {
      const tags = parseTags(
        "Enter email address into (username field) and click (submit button) on form"
      );

      expect(tags).toEqual([
        {
          type: "tag",
          links: [],
          name: "username_field",
          title: "Username field",
        },
        {
          type: "tag",
          links: [],
          name: "submit_button",
          title: "Submit button",
        },
      ]);
    });
  });

  describe("parseTagNames", () => {
    it("returns tag names found in input which are surrounded by brackets - (a, ...)", () => {
      const tagNames = parseTagNames(
        "Enter email address into (username field) and click (submit button) on form"
      );

      expect(tagNames).toEqual(["username field", "submit button"]);
    });
  });
});
