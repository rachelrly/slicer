const { Parser } = require("../dist/types/parser");
const { UNITS } = require("../dist/types/units");

const BASIC_BREAD = `
1 package active dry yeast
3 tablespoons sugar 
2-1/4 cups warm water
1 tablespoon salt
6-1/4 cups bread flour
2 tablespoons canola oil
`;

describe("Given an array with the most simple complete ingredient string", () => {
  const INPUT = "3 tablespoons sugar";
  const TestParser = new Parser();
  TestParser.parseRecipe(INPUT);

  test("it parses ingredient parts correctly", () => {
    expect(TestParser.ingredients[0].amount.amount).toBe(3);
    expect(TestParser.ingredients[0].unit.name.short).toBe(
      Units.tablespoon.name.short
    );
    expect(TestParser.ingredients[0].ingredient.name).toBe("sugar");
  });

  test("it returns an array with one ingredient", () => {
    expect(TestParser.ingredients?.length).toBe(1);
  });
});

describe("Given a full recipe", () => {
  const TestParser = new Parser();

  test("it returns an array of the correct length", () => {
    TestParser.parseRecipe(BASIC_BREAD);
    expect(TestParser.ingredients?.length).toBe(6);
  });

  test("it parses the first two ingredients correctly and in order", () => {
    const firstIngredient = TestParser.ingredients[0];
    const secondIngredient = TestParser.ingredients[1];

    expect(firstIngredient.amount.amount).toBe(1);
    expect(firstIngredient.unit).toBeNull();
    expect(firstIngredient.ingredient.name).toBe("package active dry yeast");

    expect(secondIngredient.amount.amount).toBe(3);
    expect(secondIngredient.unit.name.short).toBe(UNITS.TABLESPOON.name.short);
    expect(secondIngredient.ingredient.name).toBe("sugar");
  });
});
