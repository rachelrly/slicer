import { UNITS, Ingredient } from '../src/types'

describe('Ingredient class sorts, formats, and filters ingredient input', () => {
  describe('Given a valid amount', () => {
    test('it sorts an integer value (1)', () => {
      const TestIngredient = new Ingredient()
      TestIngredient.sort('1')
      expect(TestIngredient.amount.amount).toBe(1)
    })

    test('it sorts fraction value (1/2)', () => {
      const TestIngredient = new Ingredient()
      TestIngredient.sort('1/2')
      expect(TestIngredient.amount.amount).toBe(0.5)
    })

    test('it sorts float value (1.5)', () => {
      const TestIngredient = new Ingredient()
      TestIngredient.sort('1.5')
      expect(TestIngredient.amount.amount).toBe(1.5)
    })

    test('it sums repeated input', () => {
      const TestIngredient = new Ingredient()
      TestIngredient.sort('1')
      TestIngredient.sort('1/2')
      TestIngredient.sort('1.5')
      expect(TestIngredient.amount.amount).toBe(3)
    })

    test('it replaces input when replace arg is true', () => {
      const TestIngredient = new Ingredient()
      TestIngredient.sort('1')
      expect(TestIngredient.amount.amount).toBe(1)
      TestIngredient.setAmount('5', true)
      expect(TestIngredient.amount.amount).toBe(5)
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
    TestIngredient.sort('tsp')
    test("it sets the ingredient's unit to the correct unit", () => {
      expect(TestIngredient.unit).toMatchObject(UNITS.TEASPOON)
    })
  })

  describe('Given a string as ingredient name', () => {
    const TestIngredient = new Ingredient()
    TestIngredient.sort('salt')

    test('it set string input that is not an amount or unit as ingredient name', () => {
      expect(TestIngredient.ingredient.name).toBe('salt')
    })

    test('it concatinates with spaces if ingredient name is already present', () => {
      TestIngredient.setIngredientName('and')
      TestIngredient.setIngredientName('pepper')
      expect(TestIngredient.ingredient.name).toBe('salt and pepper')
    })

    test('it replaces input when replace arg is true', () => {
      const newIngredient = 'butter'
      TestIngredient.setIngredientName(newIngredient, true)
      expect(TestIngredient.ingredient.name).toBe(newIngredient)
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
      expect(TestIngredient.amount.amount).toBe(1)
      expect(TestIngredient.unit).toMatchObject(UNITS.CUP)
      expect(TestIngredient.ingredient.name).toBe('water')
    })
  })
})