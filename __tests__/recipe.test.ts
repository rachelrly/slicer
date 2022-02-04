import { Recipe } from '../src'
const BASIC_BREAD = `
1 package active dry yeast
2-1/4 cups warm water
1 tablespoon salt
6-1/4 cups bread flour
2 tablespoons canola oil
3 tablespoons sugar
`

describe('Given a valid input string', () => {
  const recipe = new Recipe()
  recipe.setInput(BASIC_BREAD)
  const original = recipe

  test('it parses the string and returns an array of ingredients', () => {
    expect(recipe.input).toBe(BASIC_BREAD)
    // Just checks for length of arr because validity of ingredients
    //     is tested in `parser.test.ts`
    expect(recipe.ingredients).toBeDefined()
    expect(recipe.ingredients.length).toBe(6)
  })
  test('it scales a recipe by a constant', () => {
    const CONSTANT = 2
    recipe.setConstant(CONSTANT)
    recipe.ingredients.forEach((ingredient, index) => {
      const oldIngredient = original.ingredients[index]
      const newAmount = oldIngredient.amount.amount * CONSTANT
      expect(ingredient.amount.amount).toBe(newAmount)
    })
  })
})
