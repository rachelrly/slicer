import { getUnitFromMl, ERRORS, UNITS } from '../src'

describe('Given an amount in ml', () => {
  test('it returns the a valid unit when it is not too high', () => {
    const unit10 = getUnitFromMl(10, true)
    const unit100 = getUnitFromMl(100, true)
    const unit1000 = getUnitFromMl(1000, true)
    const unit10000 = getUnitFromMl(10000, true)
    expect(unit10).toBeTruthy()
    expect(unit10.name).toBeTruthy() // Find a better way to typecheck this as Unit
    expect(unit100).toBeTruthy()
    expect(unit100.name).toBeTruthy()
    expect(unit1000).toBeTruthy()
    expect(unit1000.name).toBeTruthy()
    expect(unit10000).toBeTruthy()
    expect(unit10000.name).toBeTruthy()
  })

  test('it throws when input is too high', () => {
    expect(() => getUnitFromMl(9999999, true)).toThrow(
      ERRORS.UNIT.UNREALISTIC_INPUT
    )
  })

  test('it throws when input is negative', () => {
    expect(() => getUnitFromMl(-1, true)).toThrow(ERRORS.AMOUNT.NEGATIVE_INPUT)
  })
})

describe('Given an amount in ml with standard units only', () => {
  test('it returns TEASPOON for 10ml input', () => {
    expect(getUnitFromMl(10, true)).toMatchObject(UNITS.TABLESPOON)
  })

  test('it returns TABLESPOON for 20ml input', () => {
    expect(getUnitFromMl(20, true)).toMatchObject(UNITS.TABLESPOON)
  })

  test('it returns TABLESPOON for 50ml input', () => {
    expect(getUnitFromMl(50, true)).toMatchObject(UNITS.TABLESPOON)
  })

  test('it returns TABLESPOON for 100ml input', () => {
    expect(getUnitFromMl(100, true)).toMatchObject(UNITS.CUP)
  })

  test('it returns CUP for 500ml input', () => {
    expect(getUnitFromMl(500, true)).toMatchObject(UNITS.CUP)
  })

  test('it returns GALLON for 1000000ml (max) input', () => {
    expect(getUnitFromMl(100000, true)).toMatchObject(UNITS.GALLON)
  })
})

describe('Given an amount in ml with all units included', () => {
  test('it returns TABLESPOON for 10ml input', () => {
    expect(getUnitFromMl(10, false)).toMatchObject(UNITS.TABLESPOON)
  })

  test('it returns OUNCE for 20ml input', () => {
    expect(getUnitFromMl(20, false)).toMatchObject(UNITS.OUNCE)
  })

  test('it returns CUP for 100ml input', () => {
    expect(getUnitFromMl(100, false)).toMatchObject(UNITS.CUP)
  })

  test('it returns PINT for 500ml input', () => {
    expect(getUnitFromMl(500, false)).toMatchObject(UNITS.PINT)
  })

  test('it returns QUART for 1000ml input', () => {
    expect(getUnitFromMl(1000, false)).toMatchObject(UNITS.QUART)
  })
})
