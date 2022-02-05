import { Recipe } from '../src'

const NO_UNITS = `
1 ingredient name
0.5 ingredient name
0.25 ingredient name
2 ingredient name
`

const recipe = new Recipe()
// const original = recipe
describe('Given an recipe with no units', () => {
  test('it parses the string and returns an array of ingredients', () => {
    recipe.setInput(NO_UNITS)
    expect(recipe.input).toBe(NO_UNITS)
    // Just checks for length of arr because validity of ingredients
    //     is tested in `parser.test.ts`
    expect(recipe.ingredients).toBeDefined()
    expect(recipe.ingredients.length).toBe(4)
  })

  test('it scales a recipe by a constant', () => {
    const CONSTANT = 2
    recipe.setConstant(CONSTANT)
    expect(recipe.constant).toBe(CONSTANT)
    expect(recipe.ingredients).toBeTruthy()
    expect(recipe.ingredients[0].amount.amount).toBe(2)
    expect(recipe.ingredients[1].amount.amount).toBe(1)
    expect(recipe.ingredients[2].amount.amount).toBe(0.5)
    expect(recipe.ingredients[3].amount.amount).toBe(4)
  })

  test('it excludes unlocked ingredients from scaling', () => {
    recipe.ingredients[0].toggleLocked()
    recipe.setConstant(0.5)
    expect(recipe.ingredients[0].amount.amount).toBe(2)
    expect(recipe.ingredients[1].amount.amount).toBe(0.5)
    expect(recipe.ingredients[2].amount.amount).toBe(0.25)
    expect(recipe.ingredients[3].amount.amount).toBe(2)
  })
})
