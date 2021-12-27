const { parse } = require("../dist/types/parse");
const { UNITS } = require("../dist/types/units");

const BASIC_BREAD = `
1 package active dry yeast
2-1/4 cups warm water
1 tablespoon salt
6-1/4 cups bread flour
2 tablespoons canola oil
3 tablespoons sugar
`;

const PANCAKES = `1 cup milk
1/2 cup sour cream
1/4 cup granulated sugar
2 large eggs
1 teaspoon vanilla extract
1 1/2 cups all purpose flour
2 teaspoons baking powder
1 teaspoon salt
Butter for greasing the pan`;

describe("Given an array with the most simple complete ingredient string", () => {
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

describe("Given a full recipe", () => {
  const recipe = parse(BASIC_BREAD);

  test("it returns an array of the correct length", () => {
    expect(recipe.length).toBe(6);
  });

  test("it parses the first ingredient correctly", () => {
    const firstIngredient = recipe[5];

    expect(firstIngredient.amount.amount).toBe(3);
    expect(firstIngredient.unit).toMatchObject(UNITS.TABLESPOON);
    expect(firstIngredient.ingredient.name).toBe("sugar");
  });

  test("it parses the second ingredient correctly", () => {
    const secondIngredient = recipe[1];

    expect(secondIngredient.amount.amount).toBe(2.25);
    expect(secondIngredient.unit).toMatchObject(UNITS.CUP);
    expect(secondIngredient.ingredient.name).toBe("warm water");
  });

  test("it parses the third ingredient correctly", () => {
    const thirdIngredient = recipe[2];

    expect(thirdIngredient.amount.amount).toBe(1);
    expect(thirdIngredient.unit).toMatchObject(UNITS.TABLESPOON);
    expect(thirdIngredient.ingredient.name).toBe("salt");
  });

  test("it parses the fourth ingredient correctly", () => {
    const fourthIngredient = recipe[3];

    expect(fourthIngredient.amount.amount).toBe(6.25);
    expect(fourthIngredient.unit).toMatchObject(UNITS.CUP);
    expect(fourthIngredient.ingredient.name).toBe("bread flour");
  });

  test("it parses the fifth ingredient correctly", () => {
    const fifthIngredient = recipe[4];

    expect(fifthIngredient.amount.amount).toBe(2);
    expect(fifthIngredient.unit).toMatchObject(UNITS.TABLESPOON);
    expect(fifthIngredient.ingredient.name).toBe("canola oil");
  });

  test("it parses the sixth ingredient correctly", () => {
    const sixthIngredient = recipe[0];

    expect(sixthIngredient.amount.amount).toBe(1);
    expect(sixthIngredient.unit).toBeUndefined();
    expect(sixthIngredient.ingredient.name).toBe("package active dry yeast");
  });

  describe("Given recipes with complex units", () => {
    const pancakes = parse(PANCAKES);
    test("it returns an array with expected length", () => {
      expect(pancakes.length).toBe(8);
    });
  });
});
