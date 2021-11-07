const { Ingredient } = require("../dist/types/ingredient");

describe("sorts, formats, and filters ingredient input", () => {
  describe("correctly handles amount input", () => {
    test("sorts integer as amount", () => {
      const TestIngredient = new Ingredient();
      expect(TestIngredient.sort("1")).toBe("amount");
    });

    test("sorts fraction as amount", () => {
      const TestIngredient = new Ingredient();
      expect(TestIngredient.sort("1/2")).toBe("amount");
    });

    test("sorts fraction and converts to decimal", () => {
      const TestIngredient = new Ingredient();
      expect(TestIngredient.sort("1.5")).toBe("amount");
    });

    test("sums input with repeated numeric input", () => {
      const TestIngredient = new Ingredient();
      TestIngredient.setAmount("1");
      TestIngredient.setAmount("2");
      expect(TestIngredient.amount.amount).toBe(3);
    });
  });

  describe("correctly handles unit input in isolation", () => {
    const TestIngredient = new Ingredient();

    test("sorts short unit as unit", () => {
      expect(TestIngredient.sort("tsp")).toBe("unit");
    });

    test("sorts plural unit as unit", () => {
      expect(TestIngredient.sort("tsps")).toBe("unit");
    });

    test("sorts unit ending with period as unit", () => {
      expect(TestIngredient.sort("tsp.")).toBe("unit");
    });
  });

  describe("correctly handles ingredient name input in isolation", () => {
    //TODO: add sad path for "undefined"
    const TestIngredient = new Ingredient();

    test("sorts ingredient name as ingredient", () => {
      expect(TestIngredient.sort("salt")).toBe("ingredient");
    });

    test("concatinates repeated ingredient input seperated by spaces", () => {
      TestIngredient.setIngredient("salt");
      TestIngredient.setIngredient("and");
      TestIngredient.setIngredient("pepper");
      expect(TestIngredient.ingredient.name).toBe("salt and pepper");
    });
  });

  describe("given a valid amount, unit, and ingredient name, it fills an ingredient", () => {
    const TestIngredient = new Ingredient();

    test("given valid ingredient without unit, returns valid unit is true", () => {
      TestIngredient.setAmount("1");
      TestIngredient.setIngredient("water");
      expect(TestIngredient.isValidIngredient()).toBe(true);
    });

    test("given incomplete input, returns false for isCompleteInput()", () => {
      expect(TestIngredient.isCompleteIngredient()).toBe(false);
    });

    test("given valid three part input sorts all three parts correctly", () => {
      TestIngredient.setUnit("cup");

      expect(TestIngredient.amount.amount).toBe(1);
      expect(TestIngredient.unit.name.long).toBe("cup");
      expect(TestIngredient.ingredient.name).toBe("water");
    });

    test("given all parts, isCompleteInput() returns true", () => {
      expect(TestIngredient.isCompleteIngredient()).toBe(true);
    });
  });
});
