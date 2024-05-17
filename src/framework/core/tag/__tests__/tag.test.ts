import { createTagFromName, parseTagNames, parseTags } from "../tag";

describe("tag", () => {
  describe("createTagFromName", () => {
    it("creates a new tag from provided name", () => {
      const tag = createTagFromName("username_field");

      expect(tag).toEqual({
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
          links: [],
          name: "username_field",
          title: "Username field",
        },
        {
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

      expect(tagNames).toEqual(["username_field", "submit_button"]);
    });
  });
});
