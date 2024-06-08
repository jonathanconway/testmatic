import { trimWithEllipsis } from "../string.utils";

describe("string.utils", () => {
  describe("trimWithEllipsis", () => {
    it("trims the given input string to the given length and adds ellipsis only if its length exceeds the given length - 3", () => {
      expect(trimWithEllipsis("one two three four", 16)).toEqual(
        "one two three..."
      );
      expect(trimWithEllipsis("one two three", 16)).toEqual("one two three");
    });
  });
});
