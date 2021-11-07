const { Ingredient } = require("../dist/types/ingredient");
const { Units } = require("../dist/types/units");

describe("It scales an individual ingredient as expected", () => {
  test("It scales down ingredient correctly without unit switch", () => {
    const TestIngredient = new Ingredient();
    TestIngredient.setAmount("1");
    TestIngredient.setUnit("cup");
    TestIngredient.setIngredient("water");

    expect(TestIngredient.scale(2).amount.amount).toBe(2);
    TestIngredient.scale(0.5);

    expect(TestIngredient.amount.amount).toBe(0.5);
    TestIngredient.scale(0.2);

    expect(TestIngredient.unit.name.short).toBe(Units.cup.name.short);
    expect(TestIngredient.scale(100).unit.name.short).toBe(
      Units.gallon.name.short
    );
  });
});
