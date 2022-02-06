import { Recipe } from '../src'
import { UNITS } from '../src/types'

const NO_UNITS = `
1 ingredient name
0.5 ingredient name
0.25 ingredient name
2 ingredient name
`

// Sample recipe from Sliced web app
const SLICED = `1/2 cup butter 
0.75 c sugar 
3 large eggs 
3 tbsps lemon juice 
1 c plain flour 
2 tsp baking powder 
1 cup ricotta 1/4 c milk`

const recipe = new Recipe()
// const original = recipe
describe('Given an recipe with no units', () => {
  test('it parses the string and returns an array of ingredients', () => {
    recipe.set(NO_UNITS)
    expect(recipe.input).toBe(NO_UNITS)
    // Just checks for length of arr because validity of ingredients
    //     is tested in `parser.test.ts`
    expect(recipe.ingredients).toBeDefined()
    expect(recipe.ingredients.length).toBe(4)
  })

  test.skip('it scales a recipe by a constant', () => {
    const CONSTANT = 2
    recipe.scale(CONSTANT)
    expect(recipe.constant).toBe(CONSTANT)
    expect(recipe.ingredients).toBeTruthy()
    expect(recipe.ingredients[0].amount.base).toBe(2)
    expect(recipe.ingredients[1].amount.base).toBe(1)
    expect(recipe.ingredients[2].amount.base).toBe(0.5)
    expect(recipe.ingredients[3].amount.base).toBe(4)
  })

  test.skip('it excludes unlocked ingredients from scaling', () => {
    recipe.ingredients[0].toggleLocked()
    recipe.scale(0.5)
    expect(recipe.ingredients[0].amount.base).toBe(2)
    expect(recipe.ingredients[1].amount.base).toBe(0.5)
    expect(recipe.ingredients[2].amount.base).toBe(0.25)
    expect(recipe.ingredients[3].amount.base).toBe(2)
  })
})

describe('Given the sample recipe from Sliced web app and a constant of 2', () => {
  const recipe = new Recipe()
  recipe.set(SLICED)

  test('it sets ingredients as an array of the correct length', () => {
    expect(recipe.ingredients.length).toBe(8)
  })

  describe('Before constant is set', () => {
    test('it parses the first ingredient correctly', () => {
      const firstIngredient = recipe.ingredients[0]

      expect(firstIngredient.amount.base).toBe(0.5)
      expect(firstIngredient.unit).toMatchObject(UNITS.CUP)
      expect(firstIngredient.name).toBe('butter')
    })

    test('it parses the second ingredient correctly', () => {
      const secondIngredient = recipe.ingredients[1]

      expect(secondIngredient.amount.base).toBe(0.75)
      expect(secondIngredient.unit).toMatchObject(UNITS.CUP)
      expect(secondIngredient.name).toBe('sugar')
    })

    test('it parses the third ingredient correctly', () => {
      const thirdIngredient = recipe.ingredients[2]

      expect(thirdIngredient.amount.base).toBe(3)
      expect(thirdIngredient.unit).toBeFalsy()
      expect(thirdIngredient.name).toBe('large eggs')
    })

    test('it parses the fourth ingredient correctly', () => {
      const fourthIngredient = recipe.ingredients[3]
      expect(fourthIngredient.amount.base).toBe(3)
      expect(fourthIngredient.unit).toMatchObject(UNITS.TABLESPOON)
      expect(fourthIngredient.name).toBe('lemon juice')
    })

    test('it parses the fifth ingredient correctly', () => {
      const fifthIngredient = recipe.ingredients[4]

      expect(fifthIngredient.amount.base).toBe(1)
      expect(fifthIngredient.unit).toMatchObject(UNITS.CUP)
      expect(fifthIngredient.name).toBe('plain flour')
    })

    test('it parses the sixth ingredient correctly', () => {
      const fifthIngredient = recipe.ingredients[5]

      expect(fifthIngredient.amount.base).toBe(2)
      expect(fifthIngredient.unit).toMatchObject(UNITS.TEASPOON)
      expect(fifthIngredient.name).toBe('baking powder')
    })

    test('it parses the seventh ingredient correctly', () => {
      const sixthIngredient = recipe.ingredients[6]

      expect(sixthIngredient.amount.base).toBe(1)
      expect(sixthIngredient.unit).toMatchObject(UNITS.CUP)
      expect(sixthIngredient.name).toBe('ricotta')
    })

    test('it parses the final ingredient correctly', () => {
      const sixthIngredient = recipe.ingredients[7]

      expect(sixthIngredient.amount.base).toBe(0.25)
      expect(sixthIngredient.unit).toMatchObject(UNITS.CUP)
      expect(sixthIngredient.name).toBe('milk')
    })
  })
})
