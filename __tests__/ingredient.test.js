const { Ingredient } = require("../dist/types/ingredient");
const { UNITS } = require("../dist/types/units");

describe("Ingredient class sorts, formats, and filters ingredient input", () => {
  describe("Given valid input for this.amount", () => {
    test("it sorts an integer as amount", () => {
      const TestIngredient = new Ingredient();
      expect(TestIngredient.sort("1")).toBe("amount");
    });

    test("it sorts fraction as amount", () => {
      const TestIngredient = new Ingredient();
      expect(TestIngredient.sort("1/2")).toBe("amount");
    });

    test("it converts to decimal", () => {
      const TestIngredient = new Ingredient();
      expect(TestIngredient.sort("1.5")).toBe("amount");
    });

    test("it sums repeated numeric input", () => {
      const TestIngredient = new Ingredient();
      TestIngredient.setAmount("1");
      TestIngredient.setAmount("2");
      expect(TestIngredient.amount.amount).toBe(3);
    });
  });

  describe("Given a valid unit string as input", () => {
    const TestIngredient = new Ingredient();

    test("it sets the ingredient's unit to the correct unit", () => {
      expect(TestIngredient.sort("tsp").unit.name.short).toBe(
        UNITS.TEASPOON.name.short
      );
    });
  });

  describe("Given a string as ingredient name", () => {
    //TODO: add sad path for "undefined"
    const TestIngredient = new Ingredient();

    test("it set ingredient name as ingredient", () => {
      expect(TestIngredient.sort("salt")).toBe("ingredient");
    });

    test("it concatinates with spaces if ingredient name is already present", () => {
      TestIngredient.setIngredientName("salt");
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
      expect(TestIngredient.isCompleteIngredient()).toBe(true);
    });

    test("it sorts and sets all parts correctly", () => {
      TestIngredient.setUnit("cup");

      expect(TestIngredient.amount.amount).toBe(1);
      expect(TestIngredient.unit.name.long).toBe("cup");
      expect(TestIngredient.ingredient.name).toBe("water");
    });
  });

  describe("Given an incomplete ingredient", () => {
    const TestIngredient = new Ingredient();
    TestIngredient.setAmount("1");
    TestIngredient.setUnit("cup");
    TestIngredient.setIngredientName("water");
    test("it is not a complete ingredient", () => {
      expect(TestIngredient.isCompleteIngredient()).toBe(false);
    });
  });
});
