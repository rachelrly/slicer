import { makeIngredientArray, splitInput, MAX_WORD_LENGTH } from '../src/utils'
import { UNITS, ERRORS } from '../src/types'
import { longInput as LONG } from './utils/longInput'

const BASIC = `
1 package active dry yeast
2-1/4 cups warm water
1 tablespoon salt
6-1/4 cups bread flour
2 tablespoons canola oil
3 tablespoons sugar
`

const COMPLEX = `1 cup milk
1/2 cup sour cream
1/4 cup granulated sugar
2 large eggs
1 teaspoon vanilla extract
1 1/2 cups all purpose flour
2 teaspoons baking powder
1 teaspoon salt
Butter for greasing the pan`

// Sample recipe from Sliced web app
// const SLICED = `1/2 cup butter
// 0.75 c sugar
// 3 large eggs
// 3 tbsps lemon juice
// 1 c plain flour
// 2 tsp baking powder
// 1 cup ricotta 1/4 c milk`

const BAD = `
1/2 cup m<div>milk&&#$jkf</div>
1/4 cup @#*(&)@#*@fdjkfhgkdhvsuga@#(&@*#@)
2 large@#(&@*#@) eggs@#(&@*#@)
1 <div></div><div></div><div></div>teaspoon vanilla extract`

describe('Given an array with the most simple complete ingredient string', () => {
  const INPUT = '3 tablespoons sugar'
  const recipe = makeIngredientArray(splitInput(INPUT))
  test('it parses ingredient parts correctly', () => {
    expect(recipe[0].amount.base).toBe(3)
    expect(recipe[0].unit).toMatchObject(UNITS.TABLESPOON)
    expect(recipe[0].name).toBe('sugar')
  })

  test('it returns an array with one ingredient', () => {
    expect(recipe?.length).toBe(1)
  })
})

describe('Given a full recipe', () => {
  const recipe = makeIngredientArray(splitInput(BASIC))
  test('it returns an array of the correct length', () => {
    expect(recipe.length).toBe(6)
  })

  test('it parses the first ingredient correctly', () => {
    const firstIngredient = recipe[5]
    expect(firstIngredient.amount.base).toBe(3)
    expect(firstIngredient.unit).toMatchObject(UNITS.TABLESPOON)
    expect(firstIngredient.name).toBe('sugar')
  })

  test('it parses the second ingredient correctly', () => {
    const secondIngredient = recipe[1]
    expect(secondIngredient.amount.base).toBe(2.25)
    expect(secondIngredient.unit).toMatchObject(UNITS.CUP)
    expect(secondIngredient.name).toBe('warm water')
  })

  test('it parses the third ingredient correctly', () => {
    const thirdIngredient = recipe[2]
    expect(thirdIngredient.amount.base).toBe(1)
    expect(thirdIngredient.unit).toMatchObject(UNITS.TABLESPOON)
    expect(thirdIngredient.name).toBe('salt')
  })

  test('it parses the fourth ingredient correctly', () => {
    const fourthIngredient = recipe[3]
    expect(fourthIngredient.amount.base).toBe(6.25)
    expect(fourthIngredient.unit).toMatchObject(UNITS.CUP)
    expect(fourthIngredient.name).toBe('bread flour')
  })

  test('it parses the fifth ingredient correctly', () => {
    const fifthIngredient = recipe[4]
    expect(fifthIngredient.amount.base).toBe(2)
    expect(fifthIngredient.unit).toMatchObject(UNITS.TABLESPOON)
    expect(fifthIngredient.name).toBe('canola oil')
  })

  test('it parses the first ingredient correctly', () => {
    const firstIngredient = recipe[0]
    expect(firstIngredient.amount.base).toBe(1)
    expect(firstIngredient.unit).toBeUndefined()
    expect(firstIngredient.name).toBe('package active dry yeast')
  })
})

// what does this show that ingredient unit tests do not??
describe('Given recipes with fractional and composite ingredients', () => {
  const recipe = makeIngredientArray(splitInput(COMPLEX))
  test('it returns an array with expected length', () => {
    expect(recipe.length).toBe(8)
  })
})

// TEST WITH ACTUAL RECIPE
// describe('Given input that is too long', () => {
//   test('it throws', () => {
//     const words = splitInput(LONG)
//     expect(words.length).toBeGreaterThan(MAX_WORD_LENGTH)
//     expect(() => makeIngredientArray(words)).toThrow(ERRORS.BAD_INPUT_LENGTH)
//   })
// })

describe('Given bad recipe input (this will show errors to console)', () => {
  // Skipped because it logs verbose errors
  test.skip('it does not fail and returns an array of ingredeints (this will show errors to console)', () => {
    const recipe = makeIngredientArray(splitInput(BAD))
    expect(recipe).toBeTruthy()
  })
})
