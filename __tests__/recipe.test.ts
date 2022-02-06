import { Recipe, UNITS, getAmountInUnit } from '../src'

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

describe('Given an recipe with no units', () => {
  test('it parses the string and returns an array of ingredients', () => {
    recipe.set(NO_UNITS)
    expect(recipe.input).toBe(NO_UNITS)
    // Just checks for length of arr because validity of ingredients
    //     is tested in `parser.test.ts`
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

  // describe('After constant is set', () => {
  //   test('it scales a recipe by a constant', () => {
  //     const CONSTANT = 2
  //     recipe.scale(CONSTANT)
  //     expect(recipe.constant).toBe(CONSTANT)
  //     expect(recipe.ingredients).toBeTruthy()
  //   })
  // })
})
