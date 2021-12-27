const { parse } = require("../dist/types/parse");
const { UNITS } = require("../dist/types/units");

const BASIC_BREAD = `
1 package active dry yeast
3 tablespoons sugar 
2-1/4 cups warm water
1 tablespoon salt
6-1/4 cups bread flour
2 tablespoons canola oil
`;

describe.skip("Given an array with the most simple complete ingredient string", () => {
  const INPUT = "3 tablespoons sugar";
  const recipe = parse(INPUT);

  test("it parses ingredient parts correctly", () => {
    expect(recipe[0].amount.amount).toBe(3);
    expect(recipe[0].unit).toMatchObject(UNITS.TABLESPOON);
    expect(recipe[0].ingredient.name).toBe("sugar");
  });

  test("it returns an array with one ingredient", () => {
    expect(recipe?.length).toBe(1);
  });
});

describe.skip("Given a full recipe", () => {
  const recipe = parse(BASIC_BREAD);

  test("it returns an array of the correct length", () => {
    expect(recipe.ingredients?.length).toBe(6);
  });

  test("it parses the first two ingredients correctly and in order", () => {
    const firstIngredient = recipe.ingredients[0];
    const secondIngredient = recipe.ingredients[1];

    expect(firstIngredient.amount.amount).toBe(1);
    expect(firstIngredient.unit).toBeUndefined();
    expect(firstIngredient.ingredient.name).toBe("package active dry yeast");

    expect(secondIngredient.amount.amount).toBe(3);
    expect(secondIngredient.unit.name.short).toBe(UNITS.TABLESPOON.name.short);
    expect(secondIngredient.ingredient.name).toBe("sugar");
  });
});
