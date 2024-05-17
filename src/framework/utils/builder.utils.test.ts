import { createBuilder } from "./builder.utils";

interface Person {
  readonly name: string;
  readonly age: number;
}

describe("builder", () => {
  describe("createBuilder", () => {
    it("creates a builder which can be used to construct an object of type T by consecutive method calls", () => {
      const builder = createBuilder<Person>();

      const builder1 = builder.name("jon");
      const builder2 = builder1.age(37);

      const person = builder2.build();

      expect(person).toEqual({
        name: "jon",
        age: 37,
      });
    });
  });
});
