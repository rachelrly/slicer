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

  describe.skip("correctly handles ingredient name input in isolation", () => {
    const TestIngredient = new Ingredient();

    test("adds ingredient name", () => {
      TestIngredient.sort("salt");
      expect(TestIngredient.ingredient.name).toBe("salt");
    });

    test("continues to add ingredient name items seperated by spaces", () => {
      TestIngredient.sort("and");
      TestIngredient.sort("pepper");
      expect(TestIngredient.ingredient.name).toBe("salt and pepper");
    });
  });

  describe.skip("given a valid amount, unit, and ingredient name, it fills an ingredient", () => {
    const TestIngredient = new Ingredient();

    test("given valid ingredient without unit, returns valid unit is true", () => {
      TestIngredient.sort("1");
      TestIngredient.sort("water");
      expect(TestIngredient.isValidIngredient()).toBe(true);
    });

    test("given incomplete input, returns false for isCompleteInput()", () => {
      expect(TestIngredient.isCompleteIngredient()).toBe(false);
    });

    test("given valid three part input sorts all three parts correctly", () => {
      TestIngredient.sort("cup");

      expect(TestIngredient.amount.amount).toBe(1);
      expect(TestIngredient.unit.name.long).toBe("cup");
      expect(TestIngredient.ingredient.name).toBe("water");
    });

    test("given all parts, isCompleteInput() returns true", () => {
      expect(TestIngredient.isCompleteIngredient()).toBe(true);
    });
  });
});
