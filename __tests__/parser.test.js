const { Parser } = require("../dist/types/parser");
const { Units } = require("../dist/types/units");

const BASIC_BREAD = `
1 package active dry yeast
3 tablespoons sugar 
2-1/4 cups warm water
1 tablespoon salt
6-1/4 cups bread flour
2 tablespoons canola oil
`;

describe("Parser class parses a single ingredient correctly and adds to list", () => {
  const INPUT = "3 tablespoons sugar";
  const TestParser = new Parser();
  TestParser.parse(INPUT);

  test("Given a single ingredient, it parses correctly and returns an array with one Ingredient", () => {
    expect(TestParser.ingredients?.length).toBe(1);
    expect(TestParser.ingredients[0].amount.amount).toBe(3);
    expect(TestParser.ingredients[0].unit.name.short).toBe(
      Units.tablespoon.name.short
    );
    expect(TestParser.ingredients[0].ingredient.name).toBe("sugar");
  });
});

describe("Parser class parses input data correctly", () => {
  const TestParser = new Parser();

  test("given valid input with a given number of ingredients, it returns an array of ingredients with that length", () => {
    TestParser.parse(BASIC_BREAD);
    expect(TestParser.ingredients?.length).toBe(6);
  });

  test("given a valid recipe input, it parses ingredients correctly and in order", () => {
    const firstIngredient = TestParser.ingredients[0];
    const secondIngredient = TestParser.ingredients[1];

    expect(firstIngredient.amount.amount).toBe(1);
    expect(firstIngredient.unit).toBeNull();
    expect(firstIngredient.ingredient.name).toBe("package active dry yeast");

    expect(secondIngredient.amount.amount).toBe(3);
    expect(secondIngredient.unit.name.short).toBe(Units.tablespoon.name.short);
    expect(secondIngredient.ingredient.name).toBe("sugar");
  });
});
