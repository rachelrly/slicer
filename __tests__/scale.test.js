const { Ingredient } = require("../dist/types/ingredient");
const { Recipe } = require("../dist/types/recipe");
const { Units } = require("../dist/types/units");

describe.skip("It parses a recipe from a string and multiplies it by a constant", () => {
  const BASIC_BREAD = `
1 package active dry yeast
3 tablespoons sugar 
2-1/4 cups warm water
1 tablespoon salt
6-1/4 cups bread flour
2 tablespoons canola oil
`;
  test("It sets the recipe array based on input", () => {
    const TestRecipe = new Recipe();
    TestRecipe.setInput(BASIC_BREAD);
    expect(TestRecipe.recipe.length).toBe(6);
  });

  test("It returns the same recipe when scaled with the default constant of 1", () => {
    const TestRecipe = new Recipe();
    TestRecipe.setInput(BASIC_BREAD);
    TestRecipe.scaleRecipe();
    const recipe = TestRecipe.recipe;
    const newRecipe = TestRecipe.scaledRecipe;

    recipe.forEach((ingredient, index) => {
      const newIngredient = newRecipe[index];
      expect(ingredient.amount.amount).toBe(newIngredient.amount.amount);
      expect(ingredient.ingredient.name).toBe(newIngredient.ingredient.name);
      if (ingredient?.unit)
        expect(ingredient.unit.name.long).toBe(newIngredient.unit.name.long);
    });
  });

  test("It returns a scaled up recipe with the default constant of 2", () => {
    const TestRecipe = new Recipe();
    TestRecipe.setInput(BASIC_BREAD);
    TestRecipe.setConstant(2);
    console.log("THIS IS CONSTANT SANITY CHECK", TestRecipe.constant);
    TestRecipe.scaleRecipe();
    const recipe = TestRecipe.recipe;
    const newRecipe = TestRecipe.scaledRecipe;

    recipe.forEach((ingredient, index) => {
      console.log(
        index,
        "AT THIS INGREDIENT, AT THIS INDEX",
        ingredient,
        newRecipe[index]
      );
      expect(ingredient.amount.amount).toBe(newRecipe[index].amount.amount * 2);
    });
  });

  test.skip("It scales down ingredient correctly without unit switch", () => {
    // OLD TESTS
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
