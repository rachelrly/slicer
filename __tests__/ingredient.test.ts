import { UNITS, Ingredient, getAmountInUnit } from '../src'

describe('Given a valid amount', () => {
  test('it sorts an integer value (1)', () => {
    const ing = new Ingredient()
    ing.sort('1')
    expect(ing.amount).toBe(1)
  })

  test('it sorts fraction value (1/2)', () => {
    const ing = new Ingredient()
    ing.sort('1/2')
    expect(ing.amount).toBe(0.5)
  })

  test('it sorts float value (1.5)', () => {
    const ing = new Ingredient()
    ing.sort('1.5')
    expect(ing.amount).toBe(1.5)
  })

  test('it sums repeated input', () => {
    const ing = new Ingredient()
    ing.sort('1')
    ing.sort('1/2')
    ing.sort('1.5')
    expect(ing.amount).toBe(3)
  })

  test('it replaces input when replace arg is false', () => {
    const ing = new Ingredient()
    ing.sort('1')
    expect(ing.amount).toBe(1)
    ing.setAmount('5', false)
    expect(ing.amount).toBe(5)
  })

  test('it toggles locked state', () => {
    const ing = new Ingredient()
    expect(ing.locked).toBe(true)

    ing.toggleLocked()
    expect(ing.locked).toBe(false)

    ing.toggleLocked()
    expect(ing.locked).toBe(true)
  })
})

describe('Given a valid unit string as input', () => {
  const ing = new Ingredient()
  ing.sort('1')
  ing.sort('tsp')
  test("it sets the ingredient's unit to the correct unit", () => {
    expect(ing.unit).toMatchObject(UNITS.TEASPOON)
  })
})

describe('Given a string as ingredient name', () => {
  const ing = new Ingredient()
  ing.sort('1')
  ing.sort('salt')
  test('it set string input that is not an amount or unit as ingredient name', () => {
    expect(ing.name).toBe('salt')
  })

  test('it concatinates with spaces if ingredient name is already present', () => {
    ing.sort('and')
    ing.sort('pepper')
    expect(ing.name).toBe('salt and pepper')
  })

  test('it replaces input when replace arg is false', () => {
    const newIng = 'butter'
    ing.setName(newIng, false)
    expect(ing.name).toBe(newIng)
  })
})

describe('Given a valid amount, unit, and ingredient name', () => {
  const ing = new Ingredient()
  ing.sort('1')
  ing.sort('cup')
  ing.sort('water')

  test('it is a valid ingredient', () => {
    expect(ing.validate()).toBe(true)
  })

  test('it sorts and sets ingredient parts correctly', () => {
    expect(getAmountInUnit(ing.amount, ing.unit)).toBe(1)
    expect(ing.unit).toMatchObject(UNITS.CUP)
    expect(ing.name).toBe('water')
  })

  test('it returns the correct display object', () => {
    const amount = ing.displayAmount()
    expect(amount).toBe('1')
  })
})

describe('Given a string to replace a field in the recipe', () => {
  const ing = new Ingredient()
  ing.sort('1')
  ing.sort('cup')
  ing.sort('oldname')
  test('it changes ingredient name', () => {
    const NEW_NAME = 'newname'
    ing.setNewName(NEW_NAME)
    expect(ing.name).toBe(NEW_NAME)
  })
})
