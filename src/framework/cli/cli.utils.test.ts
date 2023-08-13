import { convertToAsciiTable } from "./cli.utils";

describe("cli.utils", () => {
  describe("convertToAsciiTable", () => {
    it("converts an array of key-value pairs to a cleanly formatted ascii table", () => {
      const output = convertToAsciiTable([
        {
          ["Column One"]: "Row 1 Test Value for One",
          ["Column Two"]: "Row 1 Test Value for Two",
          ["Column Three"]: "Row 1 Test Value for Three",
        },
        {
          ["Column One"]: "Row 2 Test Value for One",
          ["Column Two"]: "Row 2 Test Value for Two",
          ["Column Three"]: "Row 2 Test Value for Three",
        },
        {
          ["Column One"]: "Row 3 Test Value for One",
          ["Column Two"]: "Row 3 Test Value for Two With Extra Text Thrown In",
          ["Column Three"]: "Row 3 Test Value for Three",
        },
      ]);

      expect(output).toEqual(
        `
COLUMN ONE                COLUMN TWO                                          COLUMN THREE              
Row 1 Test Value for One  Row 1 Test Value for Two                            Row 1 Test Value for Three
Row 2 Test Value for One  Row 2 Test Value for Two                            Row 2 Test Value for Three
Row 3 Test Value for One  Row 3 Test Value for Two With Extra Text Thrown In  Row 3 Test Value for Three
      `.trim()
      );
    });
  });
});
