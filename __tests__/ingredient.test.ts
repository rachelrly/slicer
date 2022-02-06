import { UNITS, Ingredient } from '../src/types'

describe('Given a valid amount', () => {
  test('it sorts an integer value (1)', () => {
    const TestIngredient = new Ingredient()
    TestIngredient.sort('1')
    expect(TestIngredient.amount.base).toBe(1)
  })

  test('it sorts fraction value (1/2)', () => {
    const TestIngredient = new Ingredient()
    TestIngredient.sort('1/2')
    expect(TestIngredient.amount.base).toBe(0.5)
  })

  test('it sorts float value (1.5)', () => {
    const TestIngredient = new Ingredient()
    TestIngredient.sort('1.5')
    expect(TestIngredient.amount.base).toBe(1.5)
  })

  test('it sums repeated input', () => {
    const TestIngredient = new Ingredient()
    TestIngredient.sort('1')
    TestIngredient.sort('1/2')
    TestIngredient.sort('1.5')
    expect(TestIngredient.amount.base).toBe(3)
  })

  test('it replaces input when replace arg is false', () => {
    const TestIngredient = new Ingredient()
    TestIngredient.sort('1')
    expect(TestIngredient.amount.base).toBe(1)
    TestIngredient.setAmount('5', false)
    expect(TestIngredient.amount.base).toBe(5)
  })

  test('it toggles locked state', () => {
    const TestIngredient = new Ingredient()
    expect(TestIngredient.locked).toBe(true)

    TestIngredient.toggleLocked()
    expect(TestIngredient.locked).toBe(false)

    TestIngredient.toggleLocked()
    expect(TestIngredient.locked).toBe(true)
  })
})

describe('Given a valid unit string as input', () => {
  const TestIngredient = new Ingredient()
  TestIngredient.sort('1')
  TestIngredient.sort('tsp')
  test("it sets the ingredient's unit to the correct unit", () => {
    expect(TestIngredient.unit).toMatchObject(UNITS.TEASPOON)
  })
})

describe('Given a string as ingredient name', () => {
  const TestIngredient = new Ingredient()
  TestIngredient.sort('1')
  TestIngredient.sort('salt')
  test('it set string input that is not an amount or unit as ingredient name', () => {
    expect(TestIngredient.name).toBe('salt')
  })

  test('it concatinates with spaces if ingredient name is already present', () => {
    TestIngredient.sort('and')
    TestIngredient.sort('pepper')
    expect(TestIngredient.name).toBe('salt and pepper')
  })

  test('it replaces input when replace arg is false', () => {
    const newIngredient = 'butter'
    TestIngredient.setName(newIngredient, false)
    expect(TestIngredient.name).toBe(newIngredient)
  })
})

describe('Given a valid amount, unit, and ingredient name', () => {
  const TestIngredient = new Ingredient()
  TestIngredient.sort('1')
  TestIngredient.sort('cup')
  TestIngredient.sort('water')

  test('it is a valid ingredient', () => {
    expect(TestIngredient.validate()).toBe(true)
  })

  test('it sorts and sets all parts correctly', () => {
    expect(TestIngredient.amount.base).toBe(1)
    expect(TestIngredient.unit).toMatchObject(UNITS.CUP)
    expect(TestIngredient.name).toBe('water')
  })
})
