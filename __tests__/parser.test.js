const { Parser } = require("../dist/types/parser");
const { Units } = require("../dist/types/units");

const BASIC_BREAD = `1 package active dry yeast
3 tablespoons sugar 
2-1/4 cups warm water
1 tablespoon salt
6-1/4 cups bread flour
2 tablespoons canola oil`;

describe("Parser class parses input data correctly", () => {
  const TestParser = new Parser();
  const recipe = TestParser.parse(BASIC_BREAD);

  test("given valid input with a given number of ingredients, it returns an array of ingredients with that length", () => {
    expect(recipe.ingredients?.length).toBe(6);
  });

  test("given a valid recipe input, it parses ingredients correctly and in order", () => {
    const firstIngredient = recipe.ingredients[0];
    const secondIngredient = recipe.ingredients[1];

    expect(firstIngredient.amount.amount).toBe(1);
    expect(firstIngredient.unit).toBeNull();
    expect(firstIngredient.ingredient.name).toBe("package active dry yeast");

    expect(secondIngredient.amount.amount).toBe(3);
    expect(secondIngredient.unit.name.short).toBe(Units.tablespoon.name.short);
    expect(secondIngredient.ingredient.name).toBe("sugar");
  });
});
