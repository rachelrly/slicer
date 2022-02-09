import { Recipe, UNITS, ERRORS, getAmountInUnit } from '../src'
import { LONG_INPUT } from './utils'

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

describe('Given an recipe with no units', () => {
  const recipe = new Recipe()
  test('it parses the string and returns an array of ingredients', () => {
    recipe.set(NO_UNITS)
    expect(recipe.input).toBe(NO_UNITS)
    expect(recipe.ingredients).toBeDefined()
    expect(recipe.ingredients.length).toBe(4)
  })

  test('it scales a recipe by a constant', () => {
    const CONSTANT = 2
    recipe.scale(CONSTANT)
    expect(recipe.constant).toBe(CONSTANT)
    expect(recipe.ingredients).toBeTruthy()
    expect(recipe.ingredients[0].amount).toBe(2)
    expect(recipe.ingredients[1].amount).toBe(1)
    expect(recipe.ingredients[2].amount).toBe(0.5)
    expect(recipe.ingredients[3].amount).toBe(4)
  })

  test('it excludes unlocked ingredients from scaling', () => {
    recipe.ingredients[0].toggleLocked()
    recipe.scale(0.5)
    expect(recipe.ingredients[0].amount).toBe(2)
    expect(recipe.ingredients[1].amount).toBe(0.5)
    expect(recipe.ingredients[2].amount).toBe(0.25)
    expect(recipe.ingredients[3].amount).toBe(2)
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
      const ing = recipe.ingredients[0]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.5)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('butter')
    })

    test('it parses the second ingredient correctly', () => {
      const ing = recipe.ingredients[1]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.75)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('sugar')
    })

    test('it parses the third ingredient correctly', () => {
      const ing = recipe.ingredients[2]
      expect(ing.amount).toBe(3)
      expect(ing.unit).toBeUndefined()
      expect(ing.name).toBe('large eggs')
    })

    test('it parses the fourth ingredient correctly', () => {
      const ing = recipe.ingredients[3]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(3)
      expect(ing.unit).toMatchObject(UNITS.TABLESPOON)
      expect(ing.name).toBe('lemon juice')
    })

    test('it parses the fifth ingredient correctly', () => {
      const ing = recipe.ingredients[4]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(1)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('plain flour')
    })

    test('it parses the sixth ingredient correctly', () => {
      const ing = recipe.ingredients[5]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(2)
      expect(ing.unit).toMatchObject(UNITS.TEASPOON)
      expect(ing.name).toBe('baking powder')
    })

    test('it parses the seventh ingredient correctly', () => {
      const ing = recipe.ingredients[6]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(1)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('ricotta')
    })

    test('it parses the final ingredient correctly', () => {
      const ing = recipe.ingredients[7]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.25)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('milk')
    })
  })

  describe('After constant is set to 2', () => {
    const CONSTANT = 2
    test('it scales a recipe by a constant', () => {
      recipe.scale(CONSTANT)
      expect(recipe.constant).toBe(CONSTANT)
      expect(recipe.ingredients).toBeTruthy()
    })

    test('it scales the first ingredient correctly', () => {
      const ing = recipe.ingredients[0]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.5 * CONSTANT)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('butter')
    })

    test('it scales the second ingredient correctly', () => {
      const ing = recipe.ingredients[1]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.75 * CONSTANT)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('sugar')
    })

    test('it scales the third ingredient correctly', () => {
      const ing = recipe.ingredients[2]
      expect(ing.amount).toBe(3 * CONSTANT)
      expect(ing.unit).toBeUndefined()
      expect(ing.name).toBe('large eggs')
    })

    test('it scales the fourth ingredient correctly', () => {
      const ing = recipe.ingredients[3]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.38)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('lemon juice')
    })

    test('it scales the fifth ingredient correctly', () => {
      const ing = recipe.ingredients[4]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(1 * CONSTANT)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('plain flour')
    })

    test('it scales the sixth ingredient correctly', () => {
      const ing = recipe.ingredients[5]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(1.33)
      expect(ing.unit).toMatchObject(UNITS.TABLESPOON)
      expect(ing.name).toBe('baking powder')
    })

    test('it scales the seventh ingredient correctly', () => {
      const ing = recipe.ingredients[6]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(1 * CONSTANT)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('ricotta')
    })

    test('it scales the final ingredient correctly', () => {
      const ing = recipe.ingredients[7]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.25 * CONSTANT)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('milk')
    })
  })

  describe('After constant is set to 0.5', () => {
    const CONSTANT = 0.5
    test('it scales a recipe by a constant', () => {
      recipe.scale(CONSTANT)
      expect(recipe.constant).toBe(CONSTANT)
      expect(recipe.ingredients).toBeTruthy()
    })

    test('it scales the first ingredient correctly', () => {
      const ing = recipe.ingredients[0]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.5)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('butter')
    })

    test('it scales the second ingredient correctly', () => {
      const ing = recipe.ingredients[1]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.75)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('sugar')
    })

    test('it scales the third ingredient correctly', () => {
      const ing = recipe.ingredients[2]
      expect(ing.amount).toBe(3)
      expect(ing.unit).toBeUndefined()
      expect(ing.name).toBe('large eggs')
    })

    test('it scales the fourth ingredient correctly', () => {
      const ing = recipe.ingredients[3]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(3)
      expect(ing.unit).toMatchObject(UNITS.TABLESPOON)
      expect(ing.name).toBe('lemon juice')
    })

    test('it scales the fifth ingredient correctly', () => {
      const ing = recipe.ingredients[4]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(1)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('plain flour')
    })

    test('it scales the sixth ingredient correctly', () => {
      const ing = recipe.ingredients[5]
      // Is this what we want? The original units are TEASPOON
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.67)
      expect(ing.unit).toMatchObject(UNITS.TABLESPOON)
      expect(ing.name).toBe('baking powder')
    })

    test('it scales the seventh ingredient correctly', () => {
      const ing = recipe.ingredients[6]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(1)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('ricotta')
    })

    test('it scales the final ingredient correctly', () => {
      const ing = recipe.ingredients[7]
      expect(getAmountInUnit(ing.amount, ing.unit)).toBe(0.25)
      expect(ing.unit).toMatchObject(UNITS.CUP)
      expect(ing.name).toBe('milk')
    })
  })
})

describe('Given input that exceeds the maximum length', () => {
  test('it throws a BAD_INPUT_LENGTH error', () => {
    const recipe = new Recipe()
    expect(() => recipe.set(LONG_INPUT)).toThrow(ERRORS.BAD_INPUT_LENGTH)
  })
})
