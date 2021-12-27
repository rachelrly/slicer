const { Ingredient } = require("../dist/types/ingredient");
const { UNITS } = require("../dist/types/units");

describe.only("Ingredient class sorts, formats, and filters ingredient input", () => {
  describe.only("Given a valid amount", () => {
    test("it sorts an integer value (1)", () => {
      const TestIngredient = new Ingredient();
      TestIngredient.sort("1");
      expect(TestIngredient.amount.amount).toBe(1);
    });

    test("it sorts fraction value (1/2)", () => {
      const TestIngredient = new Ingredient();
      TestIngredient.sort("1/2");
      expect(TestIngredient.amount.amount).toBe(0.5);
    });

    test("it sorts float value (1.5)", () => {
      const TestIngredient = new Ingredient();
      TestIngredient.sort("1.5");
      expect(TestIngredient.amount.amount).toBe(1.5);
    });

    test("it sums repeated input", () => {
      const TestIngredient = new Ingredient();
      TestIngredient.sort("1");
      TestIngredient.sort("1/2");
      TestIngredient.sort("1.5");
      expect(TestIngredient.amount.amount).toBe(3);
    });
  });

  describe.skip("Given a valid unit string as input", () => {
    const TestIngredient = new Ingredient();
    TestIngredient.sort("tsp");
    test("it sets the ingredient's unit to the correct unit", () => {
      expect(TestIngredient.unit.name.short).toBe(UNITS.TEASPOON.name.short);
    });
  });

  describe.skip("Given a string as ingredient name", () => {
    //TODO: add sad path for "undefined"
    const TestIngredient = new Ingredient();
    TestIngredient.sort("salt");

    test("it set string input that is not an amount or unit as ingredient name", () => {
      expect(TestIngredient.ingredient.name).toBe("salt");
    });

    test("it concatinates with spaces if ingredient name is already present", () => {
      TestIngredient.setIngredientName("and");
      TestIngredient.setIngredientName("pepper");
      expect(TestIngredient.ingredient.name).toBe("salt and pepper");
    });
  });

  describe("Given a valid amount, unit, and ingredient name", () => {
    const TestIngredient = new Ingredient();

    test("it is a valid ingredient", () => {
      TestIngredient.setAmount("1");
      TestIngredient.setIngredientName("water");
      expect(TestIngredient.isValidIngredient()).toBe(true);
    });

    test("it is a complete ingredient", () => {
      TestIngredient.sort("C");
      expect(TestIngredient.isCompleteIngredient()).toBe(true);
    });

    test("it sorts and sets all parts correctly", () => {
      expect(TestIngredient.amount.amount).toBe(1);
      expect(TestIngredient.unit.name.long).toBe("cup");
      expect(TestIngredient.ingredient.name).toBe("water");
    });
  });

  describe("Given an incomplete ingredient", () => {
    const TestIngredient = new Ingredient();
    TestIngredient.setAmount("1");
    TestIngredient.setUnit("cup");
    test("it is not a complete ingredient", () => {
      expect(TestIngredient.isCompleteIngredient()).toBe(false);
    });
  });
});
